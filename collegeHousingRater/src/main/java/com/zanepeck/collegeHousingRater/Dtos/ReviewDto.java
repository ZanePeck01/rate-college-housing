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

    private Float rating;

    private Float cleanlinessRating;
    private Float maintenanceRating;
    private Float locationRating;
    private Float valueRating;
    private Float amenitiesRating;
    private Float staffRating;

    private String title;
    private String content;

    private String[] pros;
    private String[] cons;

    private String yearLived;
    private Boolean wouldRecommend;
    private Boolean verified;
    private Integer helpfulCount;

    private String author;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
