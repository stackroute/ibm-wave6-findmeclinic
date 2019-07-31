package com.stackroute.service;

import com.stackroute.domain.Scheduler;
import com.stackroute.repository.ScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class SchedulerServiceImpl implements SchedulerService {

    private ScheduleRepository scheduleRepository;

    @Autowired
    public SchedulerServiceImpl(ScheduleRepository scheduleRepository) {
        this.scheduleRepository = scheduleRepository;
    }

    public SchedulerServiceImpl()
    {

    }

    @Override
    public Scheduler getSlots(String emailId) {

        Optional optional=scheduleRepository.findById(emailId);
        if (optional.isPresent())
        {

            return (Scheduler)optional.get();
        }else{
            Scheduler scheduler=new Scheduler();
            scheduler.setEmailId(emailId);
            Map<String,Integer> map=new HashMap<>();
            map.put("todaym",0);
            map.put("todaya",0);
            map.put("todaye",0);
            map.put("tomorrowm",0);
            map.put("tomorrowa",0);
            map.put("tomorrowe",0);
            map.put("overmorrowm",0);
            map.put("overmorrowa",0);
            map.put("overmorrowe",0);
            scheduler.setSlots(map);
            scheduleRepository.save(scheduler);
            return scheduler;
        }

    }

    @Override
    public Scheduler save(Scheduler scheduler) {
        return scheduleRepository.save(scheduler);

    }
    @Override
    public Scheduler putSlots(String emailId,String key,Integer value){
        Optional optional=scheduleRepository.findById(emailId);
        Scheduler scheduler=new Scheduler();
        if (optional.isPresent())
        {
             scheduler=(Scheduler)optional.get();
            Map<String,Integer> map=scheduler.getSlots();
            map.put(key,value);
            scheduler.setSlots(map);
            scheduleRepository.save(scheduler);
        }
        return scheduler;
    }

    @Override
    public List<Scheduler> getAll() {
        List<Scheduler> schedulerList= (List<Scheduler>) scheduleRepository.findAll();
        return schedulerList;
    }

}
