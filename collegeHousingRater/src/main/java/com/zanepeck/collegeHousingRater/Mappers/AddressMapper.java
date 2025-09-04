package com.zanepeck.collegeHousingRater.Mappers;

import org.mapstruct.Mapper;

import com.zanepeck.collegeHousingRater.Dtos.AddressDto;
import com.zanepeck.collegeHousingRater.Entities.Address;

//Mapper interface for converting between AddressDto and Address entity
@Mapper(componentModel = "spring")
public interface AddressMapper {
    AddressDto toDto(Address address);
    Address toEntity(AddressDto addressDto);
}
