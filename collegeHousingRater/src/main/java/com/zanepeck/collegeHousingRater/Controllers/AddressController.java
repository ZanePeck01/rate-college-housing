package com.zanepeck.collegeHousingRater.Controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zanepeck.collegeHousingRater.Dtos.AddressDto;
import com.zanepeck.collegeHousingRater.Mappers.AddressMapper;
import com.zanepeck.collegeHousingRater.Repositories.AddressRepository;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/housing/{id}/address")
public class AddressController {

    private final AddressRepository addressRepository;
    private final AddressMapper addressMapper;

    @GetMapping
    public List<AddressDto> getAddressByHousingId(@PathVariable Long id) {
        return addressRepository.findByHousingId(id)
                .stream()
                .map(addressMapper::toDto)
                .collect(Collectors.toList());
    }

}
