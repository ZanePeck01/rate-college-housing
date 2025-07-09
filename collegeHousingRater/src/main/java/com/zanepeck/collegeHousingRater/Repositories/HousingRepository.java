package com.zanepeck.collegeHousingRater.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.zanepeck.collegeHousingRater.Entities.Housing;

//Repository interface for Housing entity
public interface HousingRepository extends JpaRepository<Housing, Long> {

    //to find housing by college ID:
    // List<Housing> findByCollegeId(Long collegeId);

}
