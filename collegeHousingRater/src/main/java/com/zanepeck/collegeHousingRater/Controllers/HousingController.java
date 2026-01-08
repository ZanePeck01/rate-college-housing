package com.zanepeck.collegeHousingRater.Controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

import com.zanepeck.collegeHousingRater.Repositories.HousingRepository;
import com.zanepeck.collegeHousingRater.Repositories.CollegeRepository;
import com.zanepeck.collegeHousingRater.Dtos.HousingDto;
import com.zanepeck.collegeHousingRater.Mappers.HousingMapper;
import com.zanepeck.collegeHousingRater.Services.S3Service;

@CrossOrigin(origins = { "http://localhost:3000", "http://18.191.116.224:3000", "http://18.191.116.224" })
@RestController
@AllArgsConstructor
@RequestMapping("/housing")
public class HousingController {

    private final HousingRepository housingRepository;
    private final CollegeRepository collegeRepository;
    private final HousingMapper housingMapper;
    private final S3Service s3Service;

    // Get all housing
    @GetMapping
    public List<HousingDto> getAllHousing() {
        return housingRepository.findAll()
                .stream()
                .map(housing -> {
                    HousingDto dto = housingMapper.toDto(housing);
                    // Convert relative path to full S3 URL
                    if (dto.getImageUrl() != null && !dto.getImageUrl().isEmpty()) {
                        dto.setImageUrl(s3Service.getFullUrl(dto.getImageUrl()));
                    }
                    return dto;
                })
                .collect(Collectors.toList());
    }

    // Get specific housing by ID
    @GetMapping("/{id}")
    public ResponseEntity<HousingDto> getHousingById(@PathVariable Long id) {
        return housingRepository.findById(id)
                .map(housing -> {
                    HousingDto dto = housingMapper.toDto(housing);
                    // Convert relative path to full S3 URL
                    if (dto.getImageUrl() != null && !dto.getImageUrl().isEmpty()) {
                        dto.setImageUrl(s3Service.getFullUrl(dto.getImageUrl()));
                    }
                    return dto;
                })
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Search housing by name (using query parameter)
    @GetMapping("/search")
    public List<HousingDto> searchHousingByName(@RequestParam String name) {
        return housingRepository.findAll()
                .stream()
                .filter(housing -> housing.getName().toLowerCase().contains(name.toLowerCase()))
                .map(housing -> {
                    HousingDto dto = housingMapper.toDto(housing);
                    // Convert relative path to full S3 URL
                    if (dto.getImageUrl() != null && !dto.getImageUrl().isEmpty()) {
                        dto.setImageUrl(s3Service.getFullUrl(dto.getImageUrl()));
                    }
                    return dto;
                })
                .collect(Collectors.toList());
    }

    // Get all housing for a specific college by college ID
    @GetMapping("/college/{collegeId}")
    public ResponseEntity<List<HousingDto>> getHousingByCollegeId(@PathVariable Long collegeId) {
        List<HousingDto> housing = housingRepository.findByCollegeId(collegeId)
                .stream()
                .map(h -> {
                    HousingDto dto = housingMapper.toDto(h);
                    // Convert relative path to full S3 URL
                    if (dto.getImageUrl() != null && !dto.getImageUrl().isEmpty()) {
                        dto.setImageUrl(s3Service.getFullUrl(dto.getImageUrl()));
                    }
                    return dto;
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(housing);
    }
}