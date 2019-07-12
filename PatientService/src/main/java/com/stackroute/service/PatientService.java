package com.stackroute.service;

import com.stackroute.domain.Patient;
import com.stackroute.exceptions.PatientAlreadyExistsException;
import com.stackroute.exceptions.PatientNotFoundException;
import com.sun.source.doctree.DocTree;

import java.util.List;

public interface PatientService {
   Patient savePatient(Patient patient) throws PatientAlreadyExistsException;
   List<Patient> getPatients();
   Patient deletePatientById(String emailId) throws PatientNotFoundException;
   Patient updatePatient(Patient patient);
   String sendJson(Patient patient);
}
