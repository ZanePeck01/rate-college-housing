package com.zanepeck.collegeHousingRater.Mappers;

import com.zanepeck.collegeHousingRater.Dtos.AddressDto;
import com.zanepeck.collegeHousingRater.Dtos.HousingDto;
import com.zanepeck.collegeHousingRater.Entities.Address;
import com.zanepeck.collegeHousingRater.Entities.College;
import com.zanepeck.collegeHousingRater.Entities.Housing;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

// Mapper interface for converting between Housing entities and HousingDto
@Mapper(componentModel = "spring")
public interface HousingMapper {

    // Convert Housing entity to HousingDto
    @Mapping(source = "college.id", target = "collegeId")
    @Mapping(source = "college.name", target = "collegeName")
    @Mapping(source = "address.id", target = "addressId")
    @Mapping(source = "address", target = "address")
    @Mapping(source = "imageUrl", target = "imageUrl")
    @Mapping(source = "images", target = "images")
    HousingDto toDto(Housing housing);

    // Convert HousingDto to Housing entity
    @Mapping(target = "college", expression = "java(mapCollegeId(dto.getCollegeId()))")
    @Mapping(target = "address", expression = "java(mapAddressId(dto.getAddressId()))")
    Housing toEntity(HousingDto dto);

    // Convert Address entity to AddressDto
    AddressDto addressToAddressDto(Address address);

    // Convert AddressDto to Address entity
    Address addressDtoToAddress(AddressDto addressDto);

    // Helper method to create College entity with only ID set
    default College mapCollegeId(Long id) {
        if (id == null)
            return null;
        College college = new College();
        college.setId(id);
        return college;
    }

    // Helper method to create Address entity with only ID set
    default Address mapAddressId(Long id) {
        if (id == null)
            return null;
        Address address = new Address();
        address.setId(id);
        return address;
    }
}