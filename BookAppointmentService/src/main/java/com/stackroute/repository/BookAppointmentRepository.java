package com.stackroute.repository;

import com.stackroute.domain.BookAppointment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookAppointmentRepository extends MongoRepository<BookAppointment,String> {

}
