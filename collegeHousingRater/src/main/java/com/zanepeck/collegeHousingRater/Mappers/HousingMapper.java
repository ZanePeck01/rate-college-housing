package com.zanepeck.collegeHousingRater.Mappers;

import com.zanepeck.collegeHousingRater.Dtos.HousingDto;
import com.zanepeck.collegeHousingRater.Entities.Housing;
import org.mapstruct.Mapper;


//Mapper interface for converting between HousingDto and Housing entity
@Mapper(componentModel = "spring")
public interface HousingMapper {
    HousingDto toDto(Housing housing);
    Housing toEntity(HousingDto housingDto);
}

