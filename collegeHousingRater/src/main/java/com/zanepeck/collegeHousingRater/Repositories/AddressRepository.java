package com.zanepeck.collegeHousingRater.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.zanepeck.collegeHousingRater.Entities.Address;

//Repository interface for Address entity
public interface AddressRepository extends JpaRepository<Address, Long> {

    List<Address> findByHousingId(Long id);

    //To find addresses by housingId:
    // List<Address> findByHousingId(String housingId)

}
