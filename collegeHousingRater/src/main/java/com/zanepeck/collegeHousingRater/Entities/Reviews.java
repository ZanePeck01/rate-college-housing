package com.zanepeck.collegeHousingRater.Entities;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

//Reviews Entity representing the reviews table in the database
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Getter
@Setter
@Table(name = "review")
public class Reviews {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "housing_id", nullable = false)
    private Long housingId;

    @Column(nullable = false)
    private Float rating;

    @Column(name = "cleanliness_rating")
    private Float cleanlinessRating;

    @Column(name = "maintenance_rating")
    private Float maintenanceRating;

    @Column(name = "location_rating")
    private Float locationRating;

    @Column(name = "value_rating")
    private Float valueRating;

    @Column(name = "amenities_rating")
    private Float amenitiesRating;

    @Column(name = "staff_rating")
    private Float staffRating;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(columnDefinition = "TEXT[]")
    private String[] pros;

    @Column(columnDefinition = "TEXT[]")
    private String[] cons;

    @Column(name = "year_lived")
    private String yearLived;

    @Column(name = "would_recommend")
    private Boolean wouldRecommend;

    @Column(nullable = false)
    private Boolean verified = false;

    @Column(name = "helpful_count")
    private Integer helpfulCount = 0;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "housing_id", insertable = false, updatable = false)
    private Housing housing;
}
