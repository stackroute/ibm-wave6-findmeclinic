package com.stackroute.service;

import com.stackroute.domain.*;
import com.stackroute.exception.DoctorAlreadyExistsException;
import com.stackroute.exception.DoctorNotFoundException;
import com.stackroute.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@CacheConfig(cacheNames = {"doctor"})
@Service
public class DoctorServiceImpl implements DoctorService {

    DoctorRepository doctorRepository;
    private static final String DOCTOR_ALREADY_EXISTS ="Doctor Already Exists";
    private static final String DOCTOR_DOESN_T_EXISTS ="Doctor doesn't exists";

    @Autowired
    public DoctorServiceImpl(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    @Autowired
    KafkaTemplate<String,Doctor > kafkaTemplate1;

    private static String topic1= "doctorcredentials";



    @CacheEvict(allEntries = true)
    @Override
    public Doctor save(Doctor doctor) {

        Optional optional=doctorRepository.findById(doctor.getEmailId());

        try {
            if (optional.isPresent()){
                throw new DoctorAlreadyExistsException(DOCTOR_ALREADY_EXISTS);
            }
            String[] slots={"morning","afternoon","evening"};
            Slot slot=new Slot(slots);
            doctor.setSlot(slot);
            List<DoctorAppointment> doctorAppointmentList=new ArrayList<>();
            doctor.setDoctorAppointmentList(doctorAppointmentList);
            sendJson1(doctor);
           Doctor doctor1= doctorRepository.save(doctor);
            return doctor1;
        } catch (DoctorAlreadyExistsException e) {
            return null;
        }
    }
    @CacheEvict(allEntries = true)
    @Override
    public String delete(String emailId) {
        Optional optional=doctorRepository.findById(emailId);

        try {
            if (optional.isPresent()){
                doctorRepository.deleteById(emailId);
                return "Deleted Successfully";
            }
            throw new DoctorNotFoundException(DOCTOR_DOESN_T_EXISTS);
        } catch (DoctorNotFoundException e) {
            return DOCTOR_DOESN_T_EXISTS;
        }
    }
    @CacheEvict(allEntries = true)
    @Override
    public String update(Doctor doctor) {
        Optional optional=doctorRepository.findById(doctor.getEmailId());

        try {
            if (optional.isPresent()){
                sendJson1(doctor);
                doctorRepository.save(doctor);

                return "Updated Successfully";
            }
            throw new DoctorNotFoundException(DOCTOR_DOESN_T_EXISTS);
        } catch (DoctorNotFoundException e) {
            return DOCTOR_DOESN_T_EXISTS;
        }    }


    @Cacheable(value="doctor")
    @Override
    public Doctor getDoctorByEmailId(String emailId) {
        Optional optional=doctorRepository.findById(emailId);
        if (optional.isPresent()){
            return (Doctor) optional.get();
        }
        return null;
    }


    @Cacheable(value="doctor")
    @Override
    public List<Doctor> getAll() {
        return doctorRepository.findAll();
    }

    @CacheEvict(allEntries = true)
    @Override
    public Doctor updateSlot(Slot slot,String emailId) {
        Optional optional=doctorRepository.findById(emailId);
        Doctor doctor=null;
        if (optional.isPresent()){
            doctor= (Doctor) optional.get();
            doctor.setSlot(slot);
            doctorRepository.save(doctor);
            return doctor;
        }
        return null;
    }
    @Cacheable(value="doctor")
    @Override
    public List<Doctor> findDoctorBySpecialization(String specialization) {
        List<Doctor> doctors=doctorRepository.findAll();
        List<Doctor> doctorList=new ArrayList<>();
       doctors.forEach(doctor -> {
           if (doctor.getSpecialization().equalsIgnoreCase(specialization)){
               doctorList.add(doctor);
           }
       });
        return doctorList;
    }
    @Cacheable(value="doctor")
    @Override
    public List<Doctor> findDoctorByLocationAndSpecialization(String area, String specialization) {
        List<Doctor> doctors=doctorRepository.findAll();
        List<Doctor> doctorList=new ArrayList<>();
        doctors.forEach(doctor -> {
            if (doctor.getAddress().getArea().equalsIgnoreCase(area) && doctor.getSpecialization().equalsIgnoreCase(specialization)){
                doctorList.add(doctor);
            }
        });
        return doctorList;
    }
    @Cacheable(value="doctor")
    @Override
    public List<Doctor> findDoctorByLocation(String area) {
        List<Doctor> doctors=doctorRepository.findAll();
        List<Doctor> doctorList=new ArrayList<>();
        doctors.forEach(doctor -> {
            if (doctor.getAddress().getArea().equalsIgnoreCase(area)){
                doctorList.add(doctor);
            }
        });
        return doctorList;    }
    @CacheEvict(allEntries = true)
    @Override
    public void updateDoctorAppointments(DoctorAppointment doctorAppointment,String emailId) {
        Optional optional=doctorRepository.findById(emailId);
        if (optional.isPresent())
        {
            Doctor doctor= (Doctor) optional.get();
            List<DoctorAppointment> doctorAppointments=doctor.getDoctorAppointmentList();
            doctorAppointments.add(doctorAppointment);
            doctor.setDoctorAppointmentList(doctorAppointments);
            doctorRepository.save(doctor);

        }
          }


    @Cacheable(value="doctor")
    @Override
    public List<DoctorAppointment> getAllAppointments(String emailId)
    {
        Optional optional=doctorRepository.findById(emailId);
        if (optional.isPresent()){
            Doctor doctor= (Doctor) optional.get();
            return doctor.getDoctorAppointmentList();
        }
        return  new ArrayList<>();
    }


    @Override
    public String sendJson1(Doctor doctor) {

        kafkaTemplate1.send(topic1,doctor);

        return "returned json successfully";
    }

    @KafkaListener(topics = "appointmentDetails",groupId = "Group_Json2",containerFactory = "kafkaListenerContainerFactory")
    public void consumeJson(@Payload BookAppointment bookAppointment)
    {
        DoctorAppointment doctorAppointment=new DoctorAppointment(bookAppointment.getAppointmentId(),bookAppointment.getPatient(),bookAppointment.getAppointmentDate(),bookAppointment.getSlot(),bookAppointment.getKey(),bookAppointment.getAppointmentTime());
        String emailId=bookAppointment.getDoctor().getEmailId();
        updateDoctorAppointments(doctorAppointment,emailId);

    }
}
