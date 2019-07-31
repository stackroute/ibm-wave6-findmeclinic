package com.stackroute.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DoctorAppointment {

    private String appointmentId;
    private Patient patient;
    private Date appointmentDate;
    private String slot;
    private String key;
    private String appointmentTime;

}
