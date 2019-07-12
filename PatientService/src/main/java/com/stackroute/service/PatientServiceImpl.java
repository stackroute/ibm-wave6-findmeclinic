package com.stackroute.service;

import com.stackroute.domain.Patient;
import com.stackroute.exceptions.PatientAlreadyExistsException;
import com.stackroute.exceptions.PatientNotFoundException;
import com.stackroute.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
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

               Patient savedPatient=patientRepository.save(patient);
               sendJson(patient);
               return savedPatient;



    }

    @Override
    public List<Patient> getPatients() {

        return patientRepository.findAll();
    }

    @Override
    public Patient deletePatientById(String emailId) throws PatientNotFoundException {

        Patient patient;
        Optional optional=patientRepository.findById(emailId);
        if (optional.isPresent()){
            patient=patientRepository.findById(emailId).get();
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
          patientRepository.save(patient);

        }

        return patient;
    }


    @Override
    public String sendJson(Patient patient) {

        kafkaTemplate.send(topic,patient);

        return "returned json successfully";
    }
}
