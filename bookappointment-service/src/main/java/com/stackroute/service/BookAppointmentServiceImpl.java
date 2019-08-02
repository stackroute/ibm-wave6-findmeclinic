package com.stackroute.service;


import com.stackroute.domain.BookAppointment;
import com.stackroute.domain.Doctor;
import com.stackroute.domain.Patient;
import com.stackroute.repository.BookAppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Service;

import java.awt.print.Book;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

@Service
@CacheConfig(cacheNames = {"appointment"})
public class BookAppointmentServiceImpl  implements BookAppointmentService{



    private BookAppointmentRepository bookAppointmentRepository;

    @Autowired
    public BookAppointmentServiceImpl(BookAppointmentRepository bookAppointmentRepository) {
        this.bookAppointmentRepository = bookAppointmentRepository;
    }

    @Autowired
    KafkaTemplate<String,BookAppointment > kafkaTemplate;

    private static String topic= "appointmentDetails";

    @CacheEvict(allEntries = true)
    @Override
    public BookAppointment saveAppointment(BookAppointment bookAppointment) {

        String key=bookAppointment.getKey();
        Calendar calendar = Calendar.getInstance();



        if(key.equals("todaya")||key.equals("todaym")||key.equals("todaye"))
        {

            Date today = calendar.getTime();
            bookAppointment.setAppointmentDate(today);
        }
        else if(key.equals("tomorrowa")||key.equals("tomorrowe")||key.equals("tomorrowm")) {

            calendar.add(Calendar.DATE, 1);
            Date tomorrow = calendar.getTime();
            bookAppointment.setAppointmentDate(tomorrow);
        }
        else
        {

            calendar.add(Calendar.DATE, 2);
            Date overmorrow = calendar.getTime();
            bookAppointment.setAppointmentDate(overmorrow);
        }


        BookAppointment bookAppointment1=bookAppointmentRepository.save(bookAppointment);

        sendJson(bookAppointment);

        return bookAppointment1;
    }

    @Override
    public String sendJson(BookAppointment bookAppointment) {

        kafkaTemplate.send(topic,bookAppointment);

        return "returned json successfully";
    }

}
