package com.zanepeck.collegeHousingRater.Dtos;

import java.time.LocalDateTime;

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
    private float rating;
    private String review;
    private LocalDateTime createdAt;

}
