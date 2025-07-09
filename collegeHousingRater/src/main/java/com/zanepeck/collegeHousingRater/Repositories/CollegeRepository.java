package com.zanepeck.collegeHousingRater.Repositories;

import com.zanepeck.collegeHousingRater.Entities.Colleges;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CollegeRepository extends JpaRepository<Colleges, Long> {

}
