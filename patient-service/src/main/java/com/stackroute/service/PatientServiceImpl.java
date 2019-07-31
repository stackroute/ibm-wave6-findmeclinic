package com.stackroute.service;

import com.stackroute.domain.BookAppointment;
import com.stackroute.domain.Patient;
import com.stackroute.domain.PatientAppointment;
import com.stackroute.exceptions.PatientAlreadyExistsException;
import com.stackroute.exceptions.PatientNotFoundException;
import com.stackroute.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PatientServiceImpl implements PatientService{

    private PatientRepository patientRepository;

    @Autowired
    public PatientServiceImpl(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }
    @Autowired
    KafkaTemplate<String,Patient > kafkaTemplate;

    private static String topic= "patientcredentials";

    @Override
    public Patient savePatient(Patient patient) throws PatientAlreadyExistsException {

        if (patientRepository.existsById(patient.getEmailId())) {
            throw new PatientAlreadyExistsException("Doctor Already exists");
        }
        List<PatientAppointment> patientAppointmentList=new ArrayList<>();
        patient.setPatientAppointmentList(patientAppointmentList);
        Patient savedPatient=patientRepository.save(patient);
        sendJson(patient);
        return savedPatient;

    }

    @Override
    public List<Patient> getPatients() {

        return patientRepository.findAll();
    }

    @Override
    public Patient getPatientByEmailId(String emailId) throws PatientNotFoundException{
       Patient patient;
       Optional optional=patientRepository.findById(emailId);
       if(optional.isPresent())
       {
           patient= (Patient) optional.get();
           return patient;
       }
       else {
           throw new PatientNotFoundException("Patient Not Found");
       }

    }

    @Override
    public Patient deletePatientById(String emailId) throws PatientNotFoundException {

        Patient patient;
        Optional optional=patientRepository.findById(emailId);
        if (optional.isPresent()){
            patient= (Patient) optional.get();
            patientRepository.deleteById(emailId);
            return patient;
        }
        else
        {
            throw  new PatientNotFoundException("Patient Not Found");
        }


    }

    @Override
    public Patient updatePatient(Patient patient) {

        Optional optional=patientRepository.findById(patient.getEmailId());
        if (optional.isPresent())
        {
          sendJson(patient);
          patientRepository.save(patient);

        }

        return patient;
    }
    @Override
    public void updatePatientAppointment(PatientAppointment patientAppointment,String emailId) {

        Optional optional=patientRepository.findById(emailId);
        if (optional.isPresent())
        {

            Patient patient= (Patient) optional.get();
            List<PatientAppointment> patientAppointments=patient.getPatientAppointmentList();
            patientAppointments.add(patientAppointment);
            patient.setPatientAppointmentList(patientAppointments);
            patientRepository.save(patient);

        }

    }

    @Override
    public List<PatientAppointment> getAllAppointments(String emailId)
    {
        Optional optional=patientRepository.findById(emailId);
        if(optional.isPresent()) {
            Patient patient = (Patient) optional.get();
            List<PatientAppointment> patientAppointmentList = patient.getPatientAppointmentList();
            return patientAppointmentList;
        }
        return null;

    }


    @Override
    public String sendJson(Patient patient) {

        kafkaTemplate.send(topic,patient);

        return "returned json successfully";
    }


    @KafkaListener(topics = "appointmentDetails",groupId = "Group_Json2")
    public void consumeJson(@Payload BookAppointment bookAppointment)
    {

        PatientAppointment patientAppointment=new PatientAppointment(bookAppointment.getAppointmentId(),bookAppointment.getDoctor(),bookAppointment.getAppointmentDate(),bookAppointment.getSlot(),bookAppointment.getKey(),bookAppointment.getAppointmentTime());
        String emailId=bookAppointment.getPatient().getEmailId();
        updatePatientAppointment(patientAppointment,emailId);

    }
}
