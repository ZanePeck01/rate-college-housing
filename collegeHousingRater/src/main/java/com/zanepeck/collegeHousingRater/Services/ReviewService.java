package com.zanepeck.collegeHousingRater.Services;

import com.zanepeck.collegeHousingRater.Dtos.ReviewDto;
import com.zanepeck.collegeHousingRater.Entities.Reviews;
import com.zanepeck.collegeHousingRater.Mappers.ReviewMapper;
import com.zanepeck.collegeHousingRater.Repositories.ReviewRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

// Service class for Review business logic

@Service
@AllArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final ReviewMapper reviewMapper;
    private final HousingService housingService;

    // Get all reviews for a specific housing
    public List<ReviewDto> getReviewsByHousingId(Long housingId) {
        return reviewRepository.findByHousingIdOrderByCreatedAtDesc(housingId)
                .stream()
                .map(reviewMapper::toDto)
                .collect(Collectors.toList());
    }

    // create a new review
    public ReviewDto createReview(ReviewDto reviewDto) {
        Reviews review = reviewMapper.toEntity(reviewDto);

        // Set default values
        if (review.getVerified() == null) {
            review.setVerified(false);
        }
        if (review.getHelpfulCount() == null) {
            review.setHelpfulCount(0);
        }

        // Save the review
        Reviews savedReview = reviewRepository.save(review);
        // Update housing ratings
        housingService.updateHousingRatings(savedReview.getHousingId());

        return reviewMapper.toDto(savedReview);
    }

    // get total review count for a specific housing
    public Long getReviewCount(Long housingId) {
        return reviewRepository.countByHousingId(housingId);
    }
}