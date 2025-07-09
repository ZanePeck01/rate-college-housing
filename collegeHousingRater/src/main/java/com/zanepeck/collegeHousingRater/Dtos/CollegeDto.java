package com.zanepeck.collegeHousingRater.Dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class CollegeDto {

    private Long id;
    private String name;
    private String location;
    private String website;

}
