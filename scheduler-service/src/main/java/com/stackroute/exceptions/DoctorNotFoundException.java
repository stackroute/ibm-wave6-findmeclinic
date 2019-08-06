package com.stackroute.exceptions;

public class DoctorNotFoundException extends Exception{
    String message;

    public DoctorNotFoundException(String message) {
        super(message);
        this.message = message;
    }
}
