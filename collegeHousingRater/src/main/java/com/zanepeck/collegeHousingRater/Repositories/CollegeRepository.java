package com.zanepeck.collegeHousingRater.Repositories;

import com.zanepeck.collegeHousingRater.Entities.College;
import org.springframework.data.jpa.repository.JpaRepository;

//Repository interface for College entity
public interface CollegeRepository extends JpaRepository<College, Long> {

}
