package com.stackroute;


import org.quartz.*;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class SchedulerServiceApplication {

	public static void main(String[] args) throws SchedulerException {

		SpringApplication.run(SchedulerServiceApplication.class, args);

	}

}
