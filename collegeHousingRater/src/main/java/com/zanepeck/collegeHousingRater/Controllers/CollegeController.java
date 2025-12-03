package com.zanepeck.collegeHousingRater.Controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zanepeck.collegeHousingRater.Dtos.CollegeDto;
import com.zanepeck.collegeHousingRater.Mappers.CollegeMapper;
import com.zanepeck.collegeHousingRater.Repositories.CollegeRepository;

import lombok.AllArgsConstructor;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@AllArgsConstructor
@RequestMapping("/home")
public class CollegeController {

    private final CollegeRepository collegeRepository;
    private final CollegeMapper collegeMapper;

    // Getting all colleges
    @GetMapping
    public List<CollegeDto> getAllColleges() {
        return collegeRepository.findAll()
                .stream()
                .map(collegeMapper::toDto)
                .collect(Collectors.toList());
    }

    // Getting specific college by URL-friendly name
    @GetMapping("/{collegeName}")
    public ResponseEntity<CollegeDto> getCollegeByName(@PathVariable String collegeName) {
        // Convert URL format to readable format
        // "university-of-louisville" -> "university of louisville"
        String formattedName = collegeName.replace("-", " ");

        // Find the college (case-insensitive)
        CollegeDto college = collegeRepository.findAll()
                .stream()
                .filter(c -> c.getName().equalsIgnoreCase(formattedName))
                .map(collegeMapper::toDto)
                .findFirst()
                .orElse(null);

        if (college == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(college);
    }
}