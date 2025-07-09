package com.zanepeck.collegeHousingRater.Dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;

//Data Transfer Object for Address
@AllArgsConstructor
@Getter
public class AddressDto {

    private Long id;
    private String street;
    private String city;
    private String state;
    private String zipCode;
    
}
