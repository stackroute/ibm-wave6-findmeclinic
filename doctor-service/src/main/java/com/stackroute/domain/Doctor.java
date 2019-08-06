package com.stackroute.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Document
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Doctor
{

    @Id
    private String emailId;
    private String role;
    private String name;
    private String gender;
    private String phone;
    private String medicalLicense;
    private String profileImage;
    private String qualification;
    private String specialization;
    private Date practiceStartedDate;
    private String clinicName;
    private String clinicImage;
    private Address address;
    @Transient
    private String password;
    private Slot slot;
    private List<DoctorAppointment> doctorAppointmentList;

}
