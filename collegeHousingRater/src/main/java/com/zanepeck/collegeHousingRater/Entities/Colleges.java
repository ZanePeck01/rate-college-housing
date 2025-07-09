package com.zanepeck.collegeHousingRater.Entities;


import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

//College Entity representing the college table in the database
@AllArgsConstructor
@Entity
@Getter
@Setter
@Table(name = "college")
public class Colleges {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "location", nullable = false)
    private String location;

    @Column(name = "website", nullable = false)
    private String website;

    @OneToMany(mappedBy = "college", cascade = CascadeType.ALL)
    private List<Housing> housings;

}
