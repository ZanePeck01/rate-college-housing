package com.zanepeck.collegeHousingRater.Dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;

//Housing Data Transfer Object
@AllArgsConstructor
@Getter
public class HousingDto {

    private Long id;
    private Long collegeId;
    private String name;
    private String address;
    private Integer rating;

}
