package com.stackroute.service;

import com.stackroute.domain.BookAppointment;
import com.stackroute.domain.DoctorDTO;
import com.stackroute.domain.Patient;
import com.stackroute.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PatientServiceImpl implements PatientService {

    private PatientRepository patientRepository;

    @Autowired
    public PatientServiceImpl(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    @Override
    public Patient save(Patient patient) {
        return patientRepository.save(patient);
    }

    @Override
    public Patient update(Patient patient) {
        return patientRepository.save(patient);
    }

    @Override
    public String delete(String emailId) {
        return patientRepository.delete(emailId);
    }

    @Override
    public Patient createRelationForPatientAndDoctor(String patientMailId, String docEmailId) {
        return patientRepository.createRelationForPatientAndDoctor(patientMailId, docEmailId);
    }

    @Override
    public Patient deleteRelationForPatientAndDoctor(String patientMailId, String docEmailId) {
        return patientRepository.deleteRelationForPatientAndDoctor(patientMailId, docEmailId);
    }

    @KafkaListener(topics = "patientcredentials",groupId = "Group_Json4",containerFactory = "kafkaListenerContainerFactory")
    public void consumeJson(@Payload Patient patient)
    {
        save(patient);
    }

    @KafkaListener(topics = "appointmentDetails", groupId = "Group_Json8",containerFactory = "kafkaListenerContainerFactory8")
    public void consumeJson(@Payload BookAppointment bookAppointment) {
       createRelationForPatientAndDoctor(bookAppointment.getPatient().getEmailId(),bookAppointment.getDoctor().getEmailId());
    }
}
