package com.zanepeck.collegeHousingRater.Controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.zanepeck.collegeHousingRater.Dtos.ReviewDto;
import com.zanepeck.collegeHousingRater.Entities.Reviews;
import com.zanepeck.collegeHousingRater.Mappers.ReviewMapper;
import com.zanepeck.collegeHousingRater.Repositories.ReviewRepository;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/reviews")
public class ReviewController {

    private final ReviewMapper reviewMapper;
    private final ReviewRepository reviewRepository;

    //getting all reviews
    @GetMapping
    public List<ReviewDto> getAllReviews() {
        return reviewRepository.findAll()
                .stream()
                .map(reviewMapper::toDto)
                .collect(Collectors.toList());
    }

    //getting reviews for specific housing
    @GetMapping("/housing/{housingId}")
    public List<ReviewDto> getReviewsByHousingId(@RequestParam Long housingId) {
        return reviewRepository.findByHousingId(housingId)
                .stream()
                .map(reviewMapper::toDto)
                .collect(Collectors.toList());
    }

    //getting the reviews a specific user has made
    @GetMapping("/user/{userId}")
    public List<ReviewDto> getReviewsByUserId(@RequestParam Long userId) {
        return reviewRepository.findByUserId(userId)
                .stream()
                .map(reviewMapper::toDto)
                .collect(Collectors.toList());
    }

    //creating a new review for a specific housing
    @PostMapping("/housing/{housingId}/createreview")
    public ReviewDto createReview(ReviewDto reviewDto) {
        // Convert DTO to entity
        Reviews review = reviewMapper.toEntity(reviewDto);
        // Save the review entity
        Reviews savedReview = reviewRepository.save(review);
        // Convert back to DTO and return
        return reviewMapper.toDto(savedReview);
    }

    //updating an existing review
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
