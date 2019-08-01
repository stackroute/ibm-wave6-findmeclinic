package com.stackroute.service;

import com.stackroute.domain.*;
import com.stackroute.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DoctorServiceImpl implements DoctorService {


    private DoctorRepository doctorRepository;
    private AddressServiceImpl addressService;
    private ClinicServiceImpl clinicService;
    private SpecializationServiceImpl specializationService;

    @Autowired
    public DoctorServiceImpl(DoctorRepository doctorRepository, AddressServiceImpl addressService,
                             ClinicServiceImpl clinicService, SpecializationServiceImpl specializationService) {
        this.doctorRepository = doctorRepository;
        this.addressService = addressService;
        this.clinicService = clinicService;
        this.specializationService = specializationService;
    }

    @Override
    public DoctorDTO save(Doctor doctor) {

        DoctorDTO doctorDTO = new DoctorDTO();
        doctorDTO.setEmailId(doctor.getEmailId());
        doctorDTO.setName(doctor.getName());
        doctorDTO.setGender(doctor.getGender());
        doctorDTO.setPhone(doctor.getPhone());
        doctorDTO.setProfileImage(doctor.getProfileImage());
        doctorDTO.setQualification(doctor.getQualification());
        doctorDTO.setPracticeStartedDate(doctor.getPracticeStartedDate());
        doctorDTO.setNoOfAppointments(doctor.getDoctorAppointmentList().size());
        doctorDTO = doctorRepository.save(doctorDTO);

        Clinic savedClinic = clinicService.save(new Clinic(doctor.getClinicName(), doctor.getClinicImage()));
        Address address = addressService.save(doctor.getAddress());

        Specialization specialization = specializationService.save(doctor.getSpecialization());
        doctorDTO = createRelationBetweenDoctorDTOAndAddress(doctorDTO.getEmailId(), address.getPinCode());
        doctorDTO = createRelationBetweenDoctorDTOAndClinic(doctorDTO.getEmailId(), savedClinic.getClinicName());
        doctorDTO = createRelationBetweenDoctorDTOAndSpecialization(doctorDTO.getEmailId(), specialization.getSpecialization());
        return doctorDTO;
    }

    @Override
    public String delete(String emailId) {
        doctorRepository.deleteNode(emailId);
        return "Deleted Successfully";
    }

    @Override
    public DoctorDTO update(Doctor doctor) {

        Address address = addressService.save(doctor.getAddress());
        Clinic clinic = clinicService.save(new Clinic(doctor.getClinicName(), doctor.getClinicImage()));
        Optional optional=doctorRepository.findById(doctor.getEmailId());
        if (optional.isPresent()){
            DoctorDTO doctorDTO = (DoctorDTO) optional.get();
            doctorDTO = doctorRepository.deleteRelationShipBetweenDoctorDTOAndClinic(doctorDTO.getEmailId());
            doctorDTO = doctorRepository.deleteRelationShipBetweenDoctorDTOAndAddress(doctorDTO.getEmailId());

            doctorDTO.setEmailId(doctor.getEmailId());
            doctorDTO.setName(doctor.getName());
            doctorDTO.setGender(doctor.getGender());
            doctorDTO.setPhone(doctor.getPhone());
            doctorDTO.setProfileImage(doctor.getProfileImage());
            doctorDTO.setQualification(doctor.getQualification());
            doctorDTO.setPracticeStartedDate(doctor.getPracticeStartedDate());
            doctorDTO.setNoOfAppointments(doctor.getDoctorAppointmentList().size());

            doctorDTO = doctorRepository.save(doctorDTO);

            doctorDTO = doctorRepository.createRelationBetweenDoctorDTOAndClinic(doctorDTO.getEmailId(), clinic.getClinicName());
            doctorDTO = doctorRepository.createRelationBetweenDoctorDTOAndAddress(doctorDTO.getEmailId(), address.getPinCode());

            return doctorDTO;
        }else{
            return null;
        }


    }

    @Override
    public List<DoctorDTO> getAll() {
        return doctorRepository.getAll();
    }

    @Override
    public DoctorDTO getDoctorByEmailId(String emailId) {
        Optional optional=doctorRepository.findById(emailId);
        if (optional.isPresent()){
            return (DoctorDTO) optional.get();
        }
        return null;
    }

    @Override
    public DoctorDTO createRelationBetweenDoctorDTOAndAddress(String emailId, String pinCode) {
        return doctorRepository.createRelationBetweenDoctorDTOAndAddress(emailId, pinCode);
    }

    @Override
    public DoctorDTO createRelationBetweenDoctorDTOAndClinic(String emailId, String clinicName) {
        return doctorRepository.createRelationBetweenDoctorDTOAndClinic(emailId, clinicName);
    }

    @Override
    public DoctorDTO createRelationBetweenDoctorDTOAndSpecialization(String emailId, String specialization) {
        return doctorRepository.createRelationBetweenDoctorDTOAndSpecialization(emailId, specialization);
    }

    @Override
    public DoctorDTO deleteRelationShipBetweenDoctorDTOAndClinic(String emailId) {
        return doctorRepository.deleteRelationShipBetweenDoctorDTOAndClinic(emailId);
    }

    @Override
    public DoctorDTO deleteRelationShipBetweenDoctorDTOAndAddress(String emailId) {
        return doctorRepository.deleteRelationShipBetweenDoctorDTOAndAddress(emailId);
    }

    @Override
    public List<DoctorDTO> getDoctorsByLocation(String area) {
        return doctorRepository.getDoctorsByLocation(area);
    }

    @Override
    public List<DoctorDTO> getDoctorsByLocationAndSpecialization(String area, String specialization) {
        return doctorRepository.getDoctorsByLocationAndSpecialization(area, specialization);
    }

    @Override
    public List<DoctorDTO> getDoctorsByLocationAndSpecializationForPatient(String emailId) {
        return doctorRepository.getDoctorsByLocationAndSpecializationForPatient(emailId);
    }

    @KafkaListener(topics = "doctorcredentials", groupId = "Group_Json5", containerFactory = "kafkaListenerContainerFactory5")
    public void consumeJson1(@Payload Doctor doctor) {
        save(doctor);
    }

    @KafkaListener(topics = "doctorupdateddetails", groupId = "Group_Json6", containerFactory = "kafkaListenerContainerFactory6")
    public void consumeJson2(@Payload Doctor doctor) {
        update(doctor);
    }

    @KafkaListener(topics = "appointmentDetails", groupId = "Group_Json7",containerFactory = "kafkaListenerContainerFactory7")
    public void consumeJson(@Payload BookAppointment bookAppointment) {
        Optional optional=doctorRepository.findById(bookAppointment.getDoctor().getEmailId());
        if (optional.isPresent()) {
            updateAppointments((DoctorDTO) optional.get());
        }
    }

    public DoctorDTO updateAppointments(DoctorDTO doctorDTO) {
        Optional optional=doctorRepository.findById(doctorDTO.getEmailId());
        if (optional.isPresent()){
            doctorDTO.setNoOfAppointments(doctorDTO.getNoOfAppointments() + 1);
            doctorRepository.save(doctorDTO);
        }

        return doctorRepository.save(doctorDTO);
    }

    @Override
    public List<DoctorDTO> getDoctorsByCity(String city) {
        return doctorRepository.getDoctorsByCity(city);
    }
}






