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

import java.util.HashMap;
import java.util.Map;

@EnableKafka
@Configuration
public class ConsumerConfiguration {

    private static final String CONFIG_ADDRESS ="127.0.0.1:9092";
    @Bean
    public ConsumerFactory<String, Patient> consumerFactory()
    {
        Map<String, Object> config=new HashMap<>();
        config.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, CONFIG_ADDRESS);
        config.put(ConsumerConfig.GROUP_ID_CONFIG,"Group_Json4");
        config.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
        config.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, JsonDeserializer.class);

        return new DefaultKafkaConsumerFactory<>(config, new StringDeserializer(), new JsonDeserializer<>(Patient.class));

    }
    @Bean
    public ConcurrentKafkaListenerContainerFactory<String,Patient> kafkaListenerContainerFactory()
    {
        ConcurrentKafkaListenerContainerFactory<String,Patient> factory=new ConcurrentKafkaListenerContainerFactory();
        factory.setConsumerFactory(consumerFactory());
        return factory;
    }
    @Bean
    public ConsumerFactory<String, Doctor> consumerFactory5()
    {
        Map<String, Object> config=new HashMap<>();
        config.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, CONFIG_ADDRESS);
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
        config.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, CONFIG_ADDRESS);
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
        config.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, CONFIG_ADDRESS);
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
    public ConsumerFactory<String, BookAppointment> consumerFactory8()
    {
        Map<String, Object> config=new HashMap<>();
        config.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, CONFIG_ADDRESS);
        config.put(ConsumerConfig.GROUP_ID_CONFIG,"Group_Json8");
        config.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
        config.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, JsonDeserializer.class);

        return new DefaultKafkaConsumerFactory<>(config, new StringDeserializer(), new JsonDeserializer<>(BookAppointment.class));

    }
    @Bean
    public ConcurrentKafkaListenerContainerFactory<String,BookAppointment> kafkaListenerContainerFactory8()
    {
        ConcurrentKafkaListenerContainerFactory<String, BookAppointment> factory=new ConcurrentKafkaListenerContainerFactory();
        factory.setConsumerFactory(consumerFactory7());
        return factory;
    }




}
