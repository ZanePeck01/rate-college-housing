package com.zanepeck.collegeHousingRater.Mappers;

import org.mapstruct.Mapper;
import com.zanepeck.collegeHousingRater.Dtos.UserDto;
import com.zanepeck.collegeHousingRater.Entities.User;

//Mapper interface for converting between User entity and UserDto
@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDto toDto(User user);
    User toEntity(UserDto userDto);
}
