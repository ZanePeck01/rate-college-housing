package com.zanepeck.collegeHousingRater.Mappers;

import com.zanepeck.collegeHousingRater.Dtos.CollegeDto;
import com.zanepeck.collegeHousingRater.Entities.College;
import org.mapstruct.Mapper;

//Mapper interface for converting between CollegeDto and Colleges entity
@Mapper(componentModel = "spring")
public interface CollegeMapper {

    CollegeDto toDto(College college);

    College toEntity(CollegeDto collegeDto);
}