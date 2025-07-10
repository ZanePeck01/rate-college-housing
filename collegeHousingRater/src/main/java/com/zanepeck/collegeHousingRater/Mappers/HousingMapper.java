package com.zanepeck.collegeHousingRater.Mappers;

import com.zanepeck.collegeHousingRater.Dtos.HousingDto;
import com.zanepeck.collegeHousingRater.Entities.Address;
import com.zanepeck.collegeHousingRater.Entities.Colleges;
import com.zanepeck.collegeHousingRater.Entities.Housing;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;


//Mapper interface for converting between HousingDto and Housing entity
@Mapper(componentModel = "spring")
public interface HousingMapper {
    @Mapping(source = "college.id", target = "collegeId")
    @Mapping(source = "address.id", target = "addressId")
    HousingDto toDto(Housing housing);

    @Mapping(target = "college", expression = "java(mapCollegeId(dto.getCollegeId()))")
    @Mapping(target = "address", expression = "java(mapAddressId(dto.getAddressId()))")
    Housing toEntity(HousingDto dto);

    // Manual mapping helpers
    default Colleges mapCollegeId(Long id) {
        if (id == null) return null;
        Colleges college = new Colleges();
        college.setId(id);
        return college;
    }

    default Address mapAddressId(Long id) {
        if (id == null) return null;
        Address address = new Address();
        address.setId(id);
        return address;
    }
}

