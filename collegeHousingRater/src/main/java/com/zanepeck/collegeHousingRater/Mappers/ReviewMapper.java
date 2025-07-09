package com.zanepeck.collegeHousingRater.Mappers;

import org.mapstruct.Mapper;

import com.zanepeck.collegeHousingRater.Dtos.ReviewDto;
import com.zanepeck.collegeHousingRater.Entities.Reviews;

// Mapper interface for converting between ReviewDto and Review entity
@Mapper(componentModel = "spring")
public interface ReviewMapper {
    ReviewDto toDto(Reviews review);
    Reviews toEntity(ReviewDto reviewDto);
}
