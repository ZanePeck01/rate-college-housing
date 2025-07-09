package com.zanepeck.collegeHousingRater.Dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

//College Data Transfer Object
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class CollegeDto {

    private Long id;
    private String name;
    private String location;
    private String website;

}
