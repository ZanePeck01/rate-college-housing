package com.zanepeck.collegeHousingRater.Dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//Housing Data Transfer Object
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HousingDto {

    private Long id;
    private String name;
    private Long addressId;
    private Long collegeId;
    private String collegeName;
    private Float rating;
    private Integer capacity;
    private String priceRange;
    private String location;
    private Integer reviewCount;

    // Address object for housing
    private AddressDto address;

}
