package com.stackroute.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.aggregation.ArrayOperators;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookAppointment {

    private String id;
    private Doctor doctor;
    private Patient patient;
    private Date appointmentDate;
    private Integer appointmentId;
    private String slot;
    private String key;
    private String appointmentTime;

}
