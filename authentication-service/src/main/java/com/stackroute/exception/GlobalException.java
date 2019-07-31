package com.stackroute.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalException {

    //This exception handles user not exists
    @ExceptionHandler(value= UserNotFoundException.class)
    public ResponseEntity<?> handleUserNameNotFoundException(UserNotFoundException e){
        return new ResponseEntity<String>("User Name Not Found ", HttpStatus.NOT_FOUND);
    }

    //This exception handles password missmatch
    @ExceptionHandler(value=PasswordNotMatchException.class)
    public ResponseEntity<?> handlePasswordNotMatchException(PasswordNotMatchException e){
        return new ResponseEntity<String>("Password miss match", HttpStatus.NOT_FOUND);
    }

    //This exception handles both empty username and password
    @ExceptionHandler(value=UserNameOrPasswordEmptyException.class)
    public ResponseEntity<?> handleUserNameOrPasswordEmptyException(UserNameOrPasswordEmptyException e){
        return new ResponseEntity<String>("User Name or Password is Empty", HttpStatus.NOT_FOUND);
    }

}