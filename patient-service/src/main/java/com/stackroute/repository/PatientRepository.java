package com.stackroute.repository;

import com.stackroute.domain.Patient;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PatientRepository extends  MongoRepository<Patient,String>
{

}
