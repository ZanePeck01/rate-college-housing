package com.zanepeck.collegeHousingRater.Mappers;

import com.zanepeck.collegeHousingRater.Dtos.AddressDto;
import com.zanepeck.collegeHousingRater.Dtos.HousingDto;
import com.zanepeck.collegeHousingRater.Entities.Address;
import com.zanepeck.collegeHousingRater.Entities.College;
import com.zanepeck.collegeHousingRater.Entities.Housing;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * Mapper interface for converting between HousingDto and Housing entity.
 * Uses MapStruct for automatic mapping with custom logic for nested objects.
 */
@Mapper(componentModel = "spring")
public interface HousingMapper {

    /**
     * Convert Housing entity to HousingDto
     * Maps college ID, address ID, and full nested address object
     */
    @Mapping(source = "college.id", target = "collegeId")
    @Mapping(source = "college.name", target = "collegeName")
    @Mapping(source = "address.id", target = "addressId")
    @Mapping(source = "address", target = "address")
    HousingDto toDto(Housing housing);

    /**
     * Convert HousingDto to Housing entity
     * Creates minimal College and Address objects with just IDs
     */
    @Mapping(target = "college", expression = "java(mapCollegeId(dto.getCollegeId()))")
    @Mapping(target = "address", expression = "java(mapAddressId(dto.getAddressId()))")
    Housing toEntity(HousingDto dto);

    /**
     * Map Address entity to AddressDto
     */
    AddressDto addressToAddressDto(Address address);

    /**
     * Map AddressDto to Address entity
     */
    Address addressDtoToAddress(AddressDto addressDto);

    /**
     * Helper method to create College entity with only ID set
     * Used when converting DTO back to entity
     */
    default College mapCollegeId(Long id) {
        if (id == null)
            return null;
        College college = new College();
        college.setId(id);
        return college;
    }

    /**
     * Helper method to create Address entity with only ID set
     * Used when converting DTO back to entity
     */
    default Address mapAddressId(Long id) {
        if (id == null)
            return null;
        Address address = new Address();
        address.setId(id);
        return address;
    }
}