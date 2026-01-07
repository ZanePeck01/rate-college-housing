package com.zanepeck.collegeHousingRater.Dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

//College Data Transfer Object
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CollegeDto {

    private Long id;
    private String name;
    private String location;
    private String website;
    private String imageUrl;

}
