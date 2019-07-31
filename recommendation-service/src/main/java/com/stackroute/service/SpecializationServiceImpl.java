package com.stackroute.service;

import com.stackroute.domain.Specialization;
import com.stackroute.repository.SpecializationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SpecializationServiceImpl implements SpecializationService {

    SpecializationRepository specializationRepository;

    @Autowired
    public SpecializationServiceImpl(SpecializationRepository specializationRepository) {
        this.specializationRepository = specializationRepository;
    }

    @Override
    public Specialization save(String specialization) {
        Optional optional=specializationRepository.findById(specialization);
        if (optional.isPresent()){
            return (Specialization) optional.get();
        }
        return specializationRepository.save(new Specialization(specialization));

    }
}
