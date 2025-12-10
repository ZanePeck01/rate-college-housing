package com.zanepeck.collegeHousingRater.Dtos;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

//Data Transfer Object for Address
@Data
@NoArgsConstructor
@Getter
public class AddressDto {

    private Long id;
    private String street;
    private String city;
    private String state;
    private String zipCode;

}
