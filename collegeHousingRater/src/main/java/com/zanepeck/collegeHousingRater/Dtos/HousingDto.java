package com.zanepeck.collegeHousingRater.Dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;

//Housing Data Transfer Object
@AllArgsConstructor
@Getter
public class HousingDto {

    private Long id;
    private String name;
    private Long addressId;
    private Long collegeId;
    private Float rating;

}
