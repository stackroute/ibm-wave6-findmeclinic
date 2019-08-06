package com.stackroute.controller;

import com.stackroute.domain.Scheduler;
import com.stackroute.service.SchedulerService;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/v1")
@CrossOrigin(value="*")
public class SchedulerController{

    private SchedulerService schedulerService;

    @Autowired
    public SchedulerController(SchedulerService schedulerService) {
        this.schedulerService = schedulerService;
    }

    @GetMapping("slots")
    public ResponseEntity<List<Scheduler>> getAll(){
        return new ResponseEntity<>(schedulerService.getAll(), HttpStatus.OK);
    }

    @GetMapping("slots/{emailId}")
    public ResponseEntity<Scheduler> getSlots(@PathVariable String emailId){
        return new ResponseEntity<>(schedulerService.getSlots(emailId), HttpStatus.OK);
    }

    @PostMapping("slot")
    public ResponseEntity<Scheduler> postSlots(@RequestBody Scheduler scheduler){
        return new ResponseEntity<>(schedulerService.save(scheduler),HttpStatus.CREATED);
    }
    @PutMapping("slots/{emailId}/{key}/{value}")
    public ResponseEntity<?> putSlots(@PathVariable String emailId,@PathVariable String key,@PathVariable Integer value){
        try {
            return new ResponseEntity<Scheduler>(schedulerService.putSlots(emailId, key, value), HttpStatus.OK);
        }
        catch (Exception e)
        {
            return new ResponseEntity<String>("Doctor Not Found", HttpStatus.NOT_FOUND);
        }
    }


    }

