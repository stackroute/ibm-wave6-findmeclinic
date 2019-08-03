package com.stackroute.controller;

import com.stackroute.domain.*;
import com.stackroute.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/rest/neo4j")
public class RecommendationController {

    private DoctorService doctorService;
    private AddressService addressService;
    private ClinicService clinicService;

    private PatientService patientService;
    private SpecializationService specializationService;

    @Autowired
    public RecommendationController(DoctorService doctorService, AddressService addressService,
                                    ClinicService clinicService, PatientService patientService,
                                    SpecializationService specializationService) {

        this.doctorService = doctorService;
        this.addressService = addressService;
        this.clinicService = clinicService;
        this.patientService = patientService;
        this.specializationService = specializationService;
    }

    @PutMapping("patient-update")
    public ResponseEntity<?> update(@RequestBody Patient patient) {
        return new ResponseEntity<>(patientService.update(patient), HttpStatus.OK);
    }

    @DeleteMapping("patient/{emailId}")
    public ResponseEntity<?> deletePatient(@PathVariable String emailId) {
        return new ResponseEntity<>(patientService.delete(emailId), HttpStatus.OK);
    }

    @PostMapping("create/{patientMailId}/{docMailId}")
    public ResponseEntity<?> createRelationForPatientAndDoctor(@PathVariable String patientMailId, @PathVariable String docMailId) {
        return new ResponseEntity<>(patientService.createRelationForPatientAndDoctor(patientMailId, docMailId), HttpStatus.OK);
    }

    @DeleteMapping("delete/{patientMailId}/{docMailId}")
    public ResponseEntity<?> deleteRelationForPatientAndDoctor(@PathVariable String patientMailId, @PathVariable String docMailId) {
        return new ResponseEntity<>(patientService.deleteRelationForPatientAndDoctor(patientMailId, docMailId), HttpStatus.OK);
    }



    @GetMapping("doctors")
    public ResponseEntity<?> getAll() {

        return new ResponseEntity<>(doctorService.getAll(), HttpStatus.OK);
    }


    @PostMapping("doctor-save")
    public ResponseEntity<?> saveDoctor(@RequestBody Doctor doctor) {

        return new ResponseEntity<>(doctorService.save(doctor), HttpStatus.CREATED);
    }

    @PostMapping("address")
    public ResponseEntity<?> save(Address address) {
        return new ResponseEntity<>(addressService.save(address), HttpStatus.CREATED);
    }

    @PostMapping("clinic")
    public ResponseEntity<?> save(@RequestBody Clinic clinic) {
        return new ResponseEntity<>(clinicService.save(clinic), HttpStatus.CREATED);
    }

    @PostMapping("patient")
    public ResponseEntity<?> save(@RequestBody Patient patient) {
        return new ResponseEntity<>(patientService.save(patient), HttpStatus.CREATED);
    }

    @PostMapping("specialization")
    public ResponseEntity<?> save(@RequestBody Specialization specialization) {
        return new ResponseEntity<>(specializationService.save(specialization.getSpecialization()), HttpStatus.CREATED);
    }

    @PutMapping("doctor-update/{emailId}")
    public ResponseEntity<?> updateDoctor(@RequestBody Doctor doctor) {
        return new ResponseEntity<>(doctorService.update(doctor), HttpStatus.CREATED);
    }

    @GetMapping("doctor/{emailId}")
    public ResponseEntity<?> getDoctor(@PathVariable String emailId) {
        return new ResponseEntity<>(doctorService.getDoctorByEmailId(emailId), HttpStatus.OK);
    }


    @DeleteMapping("doctor-delete/{emailId}")
    public ResponseEntity<?> delete(@PathVariable String emailId) {
        return new ResponseEntity<>(doctorService.delete(emailId), HttpStatus.OK);
    }

    @PostMapping("graph/{emailId}/{pinCode}")
    public ResponseEntity<?> createRelationBetweenDoctorDTOAndAddress(@PathVariable String emailId, @PathVariable String pinCode) {

        return new ResponseEntity<>(doctorService.createRelationBetweenDoctorDTOAndAddress(emailId, pinCode), HttpStatus.CREATED);
    }


    @GetMapping("doctors-by-city/{city}")
    ResponseEntity<?> getDoctorsByCity(@PathVariable String city) {
        return new ResponseEntity<>(doctorService.getDoctorsByCity(city), HttpStatus.OK);
    }

    @GetMapping("doctors-by-area/{area}")
    ResponseEntity<?> getDoctorsByArea(@PathVariable String area) {
        return new ResponseEntity<>(doctorService.getDoctorsByArea(area), HttpStatus.OK);
    }

    @GetMapping("doctors-by-area-and-spe/{area}/{specialization}")
    ResponseEntity<?> getDoctorsByLocationAndSpecialization(@PathVariable String area, @PathVariable String specialization) {
        return new ResponseEntity<>(doctorService.getDoctorsByLocationAndSpecialization(area, specialization), HttpStatus.OK);
    }

    @GetMapping("doctors-for-patient/{emailId}")
    ResponseEntity<?> getDoctorsByLocationAndSpecializationForPatient(@PathVariable String emailId) {
        return new ResponseEntity<>(doctorService.getDoctorsByLocationAndSpecializationForPatient(emailId), HttpStatus.OK);
    }

    @GetMapping("clinicsbyarea/{area}")
    ResponseEntity<?> getClinicsByArea(@PathVariable String area) {
        return new ResponseEntity<>(clinicService.getClinicsByArea(area), HttpStatus.OK);
    }

    @GetMapping("clinics-by-city/{city}")
    ResponseEntity<?> getClinicsByCity(@PathVariable String city) {
        return new ResponseEntity<>(clinicService.getClinicsByCity(city), HttpStatus.OK);
    }

    @GetMapping("clinics-by-area-and-specialization/{area}/{specialization}")
    ResponseEntity<?> getClinicsByLocationAndSpecialization(@PathVariable String area, @PathVariable String specialization) {
        return new ResponseEntity<>(clinicService.getClinicsByLocationAndSpecialization(area, specialization), HttpStatus.OK);
    }

    @GetMapping("clinics-for-patient/{emailId}")
    ResponseEntity<?> getClinicsByLocationAndSpecializationForPatient(@PathVariable String emailId) {
        return new ResponseEntity<>(clinicService.getClinicsByLocationAndSpecializationForPatient(emailId), HttpStatus.OK);
    }

}
