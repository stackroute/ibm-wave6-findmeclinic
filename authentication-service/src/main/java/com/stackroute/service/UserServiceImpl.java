package com.stackroute.service;

import com.stackroute.domain.Doctor;
import com.stackroute.domain.Patient;
import com.stackroute.domain.User;
import com.stackroute.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Service;

import java.util.Optional;

@CacheConfig(cacheNames = {"user"})
@Service
public class UserServiceImpl implements UserService {

    UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Cacheable(value="user")
    @Override
    public User findByEmailId(String emailId) {

        //this statement used to find the id from repository and saved into variable
        Optional optional= userRepository.findById(emailId);
        User user=null;

        if(optional.isPresent())
        {
            user= (User) optional.get();
        }
        return  user;
    }
    @CacheEvict(allEntries = true)
    @Override
    public User saveUser(User user)  {
        //savedUser stores user object
         return userRepository.save(user);
    }

    @KafkaListener(topics = "patientcredentials",groupId = "Group_Json")
    public void consumeJson(@Payload Patient patient)
    {

        User user=new User(patient.getEmailId(),patient.getPassword(),patient.getRole());
        saveUser(user);
    }

    @KafkaListener(topics = "doctorcredentials",groupId = "Group_Json1",containerFactory = "kafkaListenerContainerFactory1")
    public void consumeJson1(@Payload Doctor doctor)
    {

        User user=new User(doctor.getEmailId(),doctor.getPassword(),doctor.getRole());
        saveUser(user);
    }

}