package com.zanepeck.collegeHousingRater.Dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class ReviewDto {

    private Long id;
    private Long userId;
    private Long housingId;
    private Integer rating;
    private String review;
    private String createdAt;

}
