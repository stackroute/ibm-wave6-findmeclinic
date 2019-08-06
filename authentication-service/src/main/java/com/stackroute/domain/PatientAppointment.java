package com.stackroute.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PatientAppointment {

    private Doctor doctor;
    private Date appointmentDate;
    private String slot;
}
