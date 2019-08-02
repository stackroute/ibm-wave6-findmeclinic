package com.stackroute.service;

import com.stackroute.domain.Clinic;
import com.stackroute.repository.ClinicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;


@CacheConfig(cacheNames = {"clinic"})
@Service
public class ClinicServiceImpl implements ClinicService {

    private ClinicRepository clinicRepository;

    @Autowired
    public ClinicServiceImpl(ClinicRepository clinicRepository) {
        this.clinicRepository = clinicRepository;
    }


    @CacheEvict(allEntries = true)
    @Override
    public Clinic save(Clinic clinic) {

        return clinicRepository.save(clinic);
    }


    @Cacheable(value="clinic")
    @Override
    public List<Clinic> getClinicsByArea(String area) {
        return clinicRepository.getClinicsByArea(area);
    }

    @Cacheable(value="clinic")
    @Override
    public List<Clinic> getClinicsByCity(String city) {
        return clinicRepository.getClinicsByCity(city);
    }

    @Cacheable(value="clinic")
    @Override
    public List<Clinic> getClinicsByLocationAndSpecialization(String area, String specialization) {
        return clinicRepository.getClinicsByLocationAndSpecialization(area, specialization);
    }

    @Cacheable(value="clinic")
    @Override
    public List<Clinic> getClinicsByLocationAndSpecializationForPatient(String emailId) {
        return clinicRepository.getClinicsByLocationAndSpecializationForPatient(emailId);
    }


}
