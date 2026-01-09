package com.zanepeck.collegeHousingRater.Controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.zanepeck.collegeHousingRater.Dtos.ReviewDto;
import com.zanepeck.collegeHousingRater.Entities.Reviews;
import com.zanepeck.collegeHousingRater.Mappers.ReviewMapper;
import com.zanepeck.collegeHousingRater.Repositories.ReviewRepository;
import com.zanepeck.collegeHousingRater.Services.ReviewService;

import lombok.AllArgsConstructor;

@CrossOrigin(origins = { "http://localhost:3000", "http://18.219.88.255:3000", "http://18.219.88.255" })
@RestController
@AllArgsConstructor
@RequestMapping("/api/housing")
public class ReviewController {

    private final ReviewMapper reviewMapper;
    private final ReviewRepository reviewRepository;
    private final ReviewService reviewService;

    // getting all reviews
    @GetMapping("/{housingId}/reviews")
    public ResponseEntity<List<ReviewDto>> getReviews(@PathVariable Long housingId) {
        List<ReviewDto> reviews = reviewService.getReviewsByHousingId(housingId);
        return ResponseEntity.ok(reviews);
    }

    // getting the reviews a specific user has made
    @GetMapping("/user/{userId}")
    public List<ReviewDto> getReviewsByUserId(@RequestParam Long userId) {
        return reviewRepository.findByUserId(userId)
                .stream()
                .map(reviewMapper::toDto)
                .collect(Collectors.toList());
    }

    // creating a new review for a specific housing
    @PostMapping("/{housingId}/reviews")
    public ResponseEntity<ReviewDto> createReview(
            @PathVariable Long housingId,
            @RequestBody ReviewDto reviewDto) {

        // Set the housing ID from path variable
        reviewDto.setHousingId(housingId);

        // TODO: Get user ID from authentication session
        // For now, we will set a dummy user ID
        if (reviewDto.getUserId() == null) {
            reviewDto.setUserId(1L); // Replace with actual authenticated user ID
        }

        ReviewDto createdReview = reviewService.createReview(reviewDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdReview);
    }

    // updating an existing review
    @PutMapping
    public ReviewDto updateReview(ReviewDto reviewDto) {
        // Convert DTO to entity
        Reviews review = reviewMapper.toEntity(reviewDto);
        // Update the review entity
        Reviews updatedReview = reviewRepository.save(review);
        // Convert back to DTO and return
        return reviewMapper.toDto(updatedReview);
    }

    @DeleteMapping("/{reviewId}")
    public void deleteReview(@RequestParam Long reviewId) {
        // Delete the review by its ID
        reviewRepository.deleteById(reviewId);
    }

}
