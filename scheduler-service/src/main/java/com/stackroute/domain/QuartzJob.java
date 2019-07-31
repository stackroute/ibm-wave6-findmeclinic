package com.stackroute.domain;


import com.stackroute.service.SchedulerServiceImpl;
import org.apache.catalina.core.ApplicationContext;
import org.quartz.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.quartz.QuartzJobBean;
import org.springframework.stereotype.Component;


import java.util.List;
import java.util.Map;


@Component
@DisallowConcurrentExecution
public class QuartzJob  extends QuartzJobBean  {

    @Autowired
      private SchedulerServiceImpl schedulerService;


    @Override
    public void executeInternal(JobExecutionContext jobExecutionContext) throws JobExecutionException {

        try {
            ApplicationContext applicationContext = (ApplicationContext)
                    jobExecutionContext.getScheduler().getContext().get("applicationContext");

            List<Scheduler> schedulerList;
            schedulerList = schedulerService.getAll();

            Map<String, Integer> map1;
            for (Scheduler scheduler : schedulerList) {
                map1 = scheduler.getSlots();
                map1.put("todaym", map1.get("tomorrowm"));
                map1.put("todaya", map1.get("tomorrowa"));
                map1.put("todaye", map1.get("tomorrowe"));
                map1.put("tomorrowm", map1.get("overmorrowm"));
                map1.put("tomorrowa", map1.get("overmorrowa"));
                map1.put("tomorrowe", map1.get("overmorrowe"));
                map1.put("overmorrowm", 0);
                map1.put("overmorrowa", 0);
                map1.put("overmorrowe", 0);
                scheduler.setSlots(map1);
                schedulerService.save(scheduler);
                map1.clear();

            }
        }
        catch (Exception e)
        {
          //Do Nothing
        }
    }
    }

