package com.zanepeck.collegeHousingRater.Controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zanepeck.collegeHousingRater.Dtos.CollegeDto;
import com.zanepeck.collegeHousingRater.Mappers.CollegeMapper;
import com.zanepeck.collegeHousingRater.Repositories.CollegeRepository;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.RequestParam;

//Handles HTTP requests related to colleges
@RestController
@AllArgsConstructor
@RequestMapping("/colleges")
public class CollegeController {

    private final CollegeRepository collegeRepository;
    private final CollegeMapper collegeMapper;

    //Getting all colleges 
    @GetMapping
    public List<CollegeDto> getAllColleges() {
        return collegeRepository.findAll()
                .stream()
                .map(collegeMapper::toDto)
                .collect(Collectors.toList());
    }

    //Getting specific 
    @GetMapping("/{name}")
    public List<CollegeDto> getCollegesByName(@RequestParam String name) {
        return collegeRepository.findAll()
                .stream()
                .filter(college -> college.getName().equalsIgnoreCase(name))
                .map(collegeMapper::toDto)
                .collect(Collectors.toList());
    }

}
