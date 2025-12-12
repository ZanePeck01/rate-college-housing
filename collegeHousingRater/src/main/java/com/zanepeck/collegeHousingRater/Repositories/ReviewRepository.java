package com.zanepeck.collegeHousingRater.Repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.zanepeck.collegeHousingRater.Entities.Reviews;

//Repository interface for Reviews entity
public interface ReviewRepository extends JpaRepository<Reviews, Long> {

    // Custom query to find reviews by housing ID
    List<Reviews> findByHousingIdOrderByCreatedAtDesc(Long housingId);

    // Custom query to find reviews by user ID
    List<Reviews> findByUserId(Long userId);

    // Custom query to count reviews for a specific housing
    Long countByHousingId(Long housingId);

}
