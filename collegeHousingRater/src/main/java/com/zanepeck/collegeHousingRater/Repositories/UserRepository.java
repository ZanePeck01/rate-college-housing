package com.zanepeck.collegeHousingRater.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.zanepeck.collegeHousingRater.Entities.User;

//Repository interface for User entity
public interface UserRepository extends JpaRepository<User, Long> {

    List<User> findByUsername(String username);

}
