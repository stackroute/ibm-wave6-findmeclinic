package com.stackroute.service;

import com.stackroute.domain.Address;
import com.stackroute.repository.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.stereotype.Service;

import java.util.Optional;

@CacheConfig(cacheNames = {"address"})
@Service
public class AddressServiceImpl implements AddressService {

    AddressRepository addressRepository;

    @Autowired
    public AddressServiceImpl(AddressRepository addressRepository) {

        this.addressRepository = addressRepository;
    }
    @CacheEvict(allEntries = true)
    @Override
    public Address save(Address address) {
        Optional optional=addressRepository.findById(address.getPinCode());
        if (optional.isPresent()){
            return (Address) optional.get();
        }
        return addressRepository.save(address);
    }
}
