package com.zanepeck.collegeHousingRater.Mappers;

import com.zanepeck.collegeHousingRater.Dtos.CollegeDto;
import com.zanepeck.collegeHousingRater.Entities.Colleges;
import org.mapstruct.Mapper;

//Mapper interface for converting between CollegeDto and Colleges entity
@Mapper(componentModel = "spring")
public interface CollegeMapper {
    CollegeDto toDto(Colleges college);
    Colleges toEntity(CollegeDto collegeDto);
}
