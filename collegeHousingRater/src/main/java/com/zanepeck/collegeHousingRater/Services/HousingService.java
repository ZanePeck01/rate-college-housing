package com.zanepeck.collegeHousingRater.Services;

import com.zanepeck.collegeHousingRater.Entities.Housing;
import com.zanepeck.collegeHousingRater.Entities.Reviews;
import com.zanepeck.collegeHousingRater.Repositories.HousingRepository;
import com.zanepeck.collegeHousingRater.Repositories.ReviewRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service for housing business logic
 * Handles rating calculations
 */
@Service
@AllArgsConstructor
public class HousingService {

    private final HousingRepository housingRepository;
    private final ReviewRepository reviewRepository;

    // update housing ratings based on reviews
    @Transactional
    public void updateHousingRatings(Long housingId) {
        // Get all reviews for this housing
        List<Reviews> reviews = reviewRepository.findByHousingIdOrderByCreatedAtDesc(housingId);

        if (reviews.isEmpty()) {
            return;
        }

        // Calculate average ratings
        float totalRating = 0;
        float totalCleanliness = 0;
        float totalMaintenance = 0;
        float totalLocation = 0;
        float totalValue = 0;
        float totalAmenities = 0;
        float totalStaff = 0;

        int cleanlinessCount = 0;
        int maintenanceCount = 0;
        int locationCount = 0;
        int valueCount = 0;
        int amenitiesCount = 0;
        int staffCount = 0;

        for (Reviews review : reviews) {
            // Overall rating (always present)
            totalRating += review.getRating();

            // Category ratings (may be null/0)
            if (review.getCleanlinessRating() != null && review.getCleanlinessRating() > 0) {
                totalCleanliness += review.getCleanlinessRating();
                cleanlinessCount++;
            }
            if (review.getMaintenanceRating() != null && review.getMaintenanceRating() > 0) {
                totalMaintenance += review.getMaintenanceRating();
                maintenanceCount++;
            }
            if (review.getLocationRating() != null && review.getLocationRating() > 0) {
                totalLocation += review.getLocationRating();
                locationCount++;
            }
            if (review.getValueRating() != null && review.getValueRating() > 0) {
                totalValue += review.getValueRating();
                valueCount++;
            }
            if (review.getAmenitiesRating() != null && review.getAmenitiesRating() > 0) {
                totalAmenities += review.getAmenitiesRating();
                amenitiesCount++;
            }
            if (review.getStaffRating() != null && review.getStaffRating() > 0) {
                totalStaff += review.getStaffRating();
                staffCount++;
            }
        }

        // Get the housing entity
        Housing housing = housingRepository.findById(housingId)
                .orElseThrow(() -> new RuntimeException("Housing not found"));

        // Update ratings
        housing.setRating(totalRating / reviews.size());
        housing.setCleanlinessRating(cleanlinessCount > 0 ? totalCleanliness / cleanlinessCount : null);
        housing.setMaintenanceRating(maintenanceCount > 0 ? totalMaintenance / maintenanceCount : null);
        housing.setLocationRating(locationCount > 0 ? totalLocation / locationCount : null);
        housing.setValueRating(valueCount > 0 ? totalValue / valueCount : null);
        housing.setAmenitiesRating(amenitiesCount > 0 ? totalAmenities / amenitiesCount : null);
        housing.setStaffRating(staffCount > 0 ? totalStaff / staffCount : null);
        housing.setReviewCount(reviews.size());

        // Save updated housing
        housingRepository.save(housing);

        System.out.println("Updated ratings for housing " + housingId + ":");
        System.out.println("  Overall: " + housing.getRating());
        System.out.println("  Cleanliness: " + housing.getCleanlinessRating());
        System.out.println("  Maintenance: " + housing.getMaintenanceRating());
        System.out.println("  Location: " + housing.getLocationRating());
        System.out.println("  Value: " + housing.getValueRating());
        System.out.println("  Amenities: " + housing.getAmenitiesRating());
        System.out.println("  Staff: " + housing.getStaffRating());
        System.out.println("  Review Count: " + housing.getReviewCount());
    }
}