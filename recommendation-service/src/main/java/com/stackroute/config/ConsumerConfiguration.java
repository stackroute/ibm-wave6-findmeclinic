package com.stackroute.config;

import com.stackroute.domain.BookAppointment;
import com.stackroute.domain.Doctor;
import com.stackroute.domain.Patient;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
import org.springframework.kafka.support.serializer.JsonDeserializer;

import java.awt.print.Book;
import java.util.HashMap;
import java.util.Map;

@EnableKafka
@Configuration
public class ConsumerConfiguration {

    @Bean
    public ConsumerFactory<String, Patient> consumerFactory4()
    {
        Map<String, Object> config=new HashMap<>();
        config.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG,"127.0.0.1:9092");
        config.put(ConsumerConfig.GROUP_ID_CONFIG,"Group_Json4");
        config.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
        config.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, JsonDeserializer.class);

        return new DefaultKafkaConsumerFactory<>(config, new StringDeserializer(), new JsonDeserializer<>(Patient.class));

    }
    @Bean
    public ConcurrentKafkaListenerContainerFactory<String,Patient> kafkaListenerContainerFactory4()
    {
        ConcurrentKafkaListenerContainerFactory<String,Patient> factory=new ConcurrentKafkaListenerContainerFactory();
        factory.setConsumerFactory(consumerFactory4());
        return factory;
    }
    @Bean
    public ConsumerFactory<String, Doctor> consumerFactory5()
    {
        Map<String, Object> config=new HashMap<>();
        config.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG,"127.0.0.1:9092");
        config.put(ConsumerConfig.GROUP_ID_CONFIG,"Group_Json5");
        config.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
        config.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, JsonDeserializer.class);

        return new DefaultKafkaConsumerFactory<>(config, new StringDeserializer(), new JsonDeserializer<>(Doctor.class));

    }
    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, Doctor> kafkaListenerContainerFactory5()
    {
        ConcurrentKafkaListenerContainerFactory<String, Doctor> factory=new ConcurrentKafkaListenerContainerFactory();
        factory.setConsumerFactory(consumerFactory5());
        return factory;
    }
    @Bean
    public ConsumerFactory<String, Doctor> consumerFactory6()
    {
        Map<String, Object> config=new HashMap<>();
        config.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG,"127.0.0.1:9092");
        config.put(ConsumerConfig.GROUP_ID_CONFIG,"Group_Json6");
        config.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
        config.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, JsonDeserializer.class);

        return new DefaultKafkaConsumerFactory<>(config, new StringDeserializer(), new JsonDeserializer<>(Doctor.class));

    }
    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, Doctor> kafkaListenerContainerFactory6()
    {
        ConcurrentKafkaListenerContainerFactory<String, Doctor> factory=new ConcurrentKafkaListenerContainerFactory();
        factory.setConsumerFactory(consumerFactory6());
        return factory;
    } @Bean
    public ConsumerFactory<String, BookAppointment> consumerFactory7()
    {
        Map<String, Object> config=new HashMap<>();
        config.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG,"127.0.0.1:9092");
        config.put(ConsumerConfig.GROUP_ID_CONFIG,"Group_Json7");
        config.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
        config.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, JsonDeserializer.class);

        return new DefaultKafkaConsumerFactory<>(config, new StringDeserializer(), new JsonDeserializer<>(BookAppointment.class));

    }
    @Bean
    public ConcurrentKafkaListenerContainerFactory<String,BookAppointment> kafkaListenerContainerFactory7()
    {
        ConcurrentKafkaListenerContainerFactory<String, BookAppointment> factory=new ConcurrentKafkaListenerContainerFactory();
        factory.setConsumerFactory(consumerFactory7());
        return factory;
    }



}
