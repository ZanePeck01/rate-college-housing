package com.zanepeck.collegeHousingRater.Controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import lombok.AllArgsConstructor;
import com.zanepeck.collegeHousingRater.Repositories.HousingRepository;
import com.zanepeck.collegeHousingRater.Dtos.HousingDto;
import com.zanepeck.collegeHousingRater.Mappers.HousingMapper;


//Handles requests related to housing
@RestController
@AllArgsConstructor
@RequestMapping("/housing")
public class HousingController {

    private final HousingRepository housingRepository;
    private final HousingMapper housingMapper;

    //for getting all housing
    @GetMapping
    public List<HousingDto> getAllHousing() {
        return housingRepository.findAll()
                .stream()
                .map(housingMapper::toDto)
                .collect(Collectors.toList());
    }

    //for finding all housing for a specfic college
    @GetMapping("/{collegeId}")
    public List<HousingDto> getHousingByCollegeId(@RequestParam Long collegeId) {
        return housingRepository.findByCollegeId(collegeId)
                .stream()
                .map(housingMapper::toDto)
                .collect(Collectors.toList());
    }

    //for getting a specific housing by name 
    @GetMapping("/{name}")
    public List<HousingDto> getHousingByName(@RequestParam String name) {
        return housingRepository.findAll()
                .stream()
                .filter(housing -> housing.getName().equalsIgnoreCase(name))
                .map(housingMapper::toDto)
                .collect(Collectors.toList());
    }

}
