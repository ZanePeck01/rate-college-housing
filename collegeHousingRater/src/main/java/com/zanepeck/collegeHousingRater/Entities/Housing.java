package com.zanepeck.collegeHousingRater.Entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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

//Housing Entity representing the housing table in the database
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Getter
@Setter
@Table(name = "housing")
public class Housing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "college_id", insertable = false, updatable = false)
    private Long collegeId;

    private String location;

    @Column(name = "rating")
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

    private Integer capacity;

    @Column(name = "price_range")
    private String priceRange;

    @Column(name = "review_count")
    private Integer reviewCount;

    // @OneToMany(mappedBy = "housing", cascade = CascadeType.ALL)
    // private List<Reviews> reviews;

    @ManyToOne
    @JoinColumn(name = "address_id", insertable = false, updatable = false)
    private Address address;

    @ManyToOne
    @JoinColumn(name = "college_id", nullable = false)
    private College college;

    // Helper methods to get IDs
    public Long getCollegeId() {
        return college != null ? college.getId() : null;
    }

    public void setCollegeId(Long collegeId) {
        if (collegeId != null) {
            College c = new College();
            c.setId(collegeId);
            this.college = c;
        }
    }

    public Long getAddressId() {
        return address != null ? address.getId() : null;
    }

    public void setAddressId(Long addressId) {
        if (addressId != null) {
            Address a = new Address();
            a.setId(addressId);
            this.address = a;
        }
    }

}
