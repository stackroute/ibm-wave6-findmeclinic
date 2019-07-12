package com.stackroute.service;

import com.stackroute.domain.Doctor;
import com.stackroute.domain.Slot;
import com.stackroute.exception.DoctorAlreadyExistsException;
import com.stackroute.exception.DoctorNotFoundException;
import com.stackroute.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class DoctorServiceImpl implements DoctorService {

    DoctorRepository doctorRepository;

    @Autowired
    public DoctorServiceImpl(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    @Override
    public String save(Doctor doctor) {

        Optional optional=doctorRepository.findById(doctor.getEmailId());

        try {
            if (optional.isPresent()){
                throw new DoctorAlreadyExistsException("Doctor Already Exists");
            }
            String[] slots={"morning","afternoon","evening"};
            Slot slot=new Slot(slots);
            doctor.setSlot(slot);
            doctorRepository.save(doctor);
            return "Doctor Saved Successfully";
        } catch (DoctorAlreadyExistsException e) {
            return "Doctor Already Exists";
        }
    }

    @Override
    public String delete(String emailId) {
        Optional optional=doctorRepository.findById(emailId);

        try {
            if (optional.isPresent()){
                doctorRepository.deleteById(emailId);
                return "Deleted Successfully";
            }
            throw new DoctorNotFoundException("Doctor doesn't exists");
        } catch (DoctorNotFoundException e) {
            return "Doctor doesn't exists";
        }
    }

    @Override
    public String update(Doctor doctor) {
        Optional optional=doctorRepository.findById(doctor.getEmailId());

        try {
            if (optional.isPresent()){
                doctorRepository.save(doctor);

                return "Updated Successfully";
            }
            throw new DoctorNotFoundException("Doctor doesn't exists");
        } catch (DoctorNotFoundException e) {
            return "Doctor doesn't exists";
        }    }

    @Override
    public List<Doctor> getAll() {
        return doctorRepository.findAll();
    }

    @Override
    public Doctor updateSlot(Slot slot,String emailId) {
        Optional optional=doctorRepository.findById(emailId);
        Doctor doctor=null;
        if (optional.isPresent()){
            doctor=doctorRepository.findById(emailId).get();
            doctor.setSlot(slot);
            doctorRepository.save(doctor);
            return doctor;
        }
        return null;
    }

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
}
