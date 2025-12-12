package com.zanepeck.collegeHousingRater.Mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.zanepeck.collegeHousingRater.Dtos.ReviewDto;
import com.zanepeck.collegeHousingRater.Entities.Housing;
import com.zanepeck.collegeHousingRater.Entities.Reviews;
import com.zanepeck.collegeHousingRater.Entities.User;

// Mapper interface for converting between ReviewDto and Review entity
@Mapper(componentModel = "spring")
public interface ReviewMapper {
    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "housing.id", target = "housingId")
    @Mapping(source = "wouldRecommend", target = "wouldRecommend")
    ReviewDto toDto(Reviews review);

    @Mapping(target = "user", expression = "java(mapUserId(dto.getUserId()))")
    @Mapping(target = "housing", expression = "java(mapHousingId(dto.getHousingId()))")
    Reviews toEntity(ReviewDto dto);

    default User mapUserId(Long id) {
        if (id == null)
            return null;
        User user = new User();
        user.setId(id);
        return user;
    }

    default Housing mapHousingId(Long id) {
        if (id == null)
            return null;
        Housing housing = new Housing();
        housing.setId(id);
        return housing;
    }
}
