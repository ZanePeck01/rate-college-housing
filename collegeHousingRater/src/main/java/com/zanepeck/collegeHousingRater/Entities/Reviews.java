package com.zanepeck.collegeHousingRater.Entities;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;



@AllArgsConstructor
@Entity
@Getter
@Setter
@Table(name = "review")
public class Reviews {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private String user_id;

    @Column(name = "housing_id", nullable = false)
    private String housing_id;

    @Column(name = "rating", nullable = false)
    private String rating;

    @Column(name = "review")
    private String review;

    @Column(name = "created_at", nullable = false)
    private String created_at;
}
