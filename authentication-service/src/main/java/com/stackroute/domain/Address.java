package com.stackroute.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class Address
{

        private String state;
        private String city;
        private String flatNo;
        private String area;
        private Long pinCode;
 }
