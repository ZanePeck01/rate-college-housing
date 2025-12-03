import React from "react";
import { Star, MapPin, Users, DollarSign } from "lucide-react";
import "./InfoCard.css";

function InfoCard({ dorm, onClick }) {
  const renderStars = (rating) => {
    return (
      <div className="stars-container">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={star <= rating ? "star-filled" : "star-empty"}
          />
        ))}
        <span className="rating-number">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="dorm-card" onClick={() => onClick(dorm.id)}>
      {/* Image Section */}
      <div className="dorm-image-container">
        <img
          src={dorm.imageUrl || "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800"}
          alt={dorm.name}
          className="dorm-image"
        />
        <div className="review-badge">
          <span>{dorm.reviewCount} reviews</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="dorm-content">
        <h3 className="dorm-name">{dorm.name}</h3>
        
        <div className="dorm-rating">
          {renderStars(dorm.overallRating)}
        </div>

        {/* Additional Info */}
        <div className="dorm-info">
          <div className="info-item">
            <MapPin size={16} />
            <span>{dorm.location}</span>
          </div>
          
          <div className="info-item">
            <Users size={16} />
            <span>{dorm.capacity} students</span>
          </div>
          
          <div className="info-item">
            <DollarSign size={16} />
            <span>{dorm.priceRange}</span>
          </div>
        </div>

        {/* Amenities Tags */}
        {dorm.amenities && (
          <div className="amenities-container">
            {dorm.amenities.slice(0, 3).map((amenity, index) => (
              <span key={index} className="amenity-tag">
                {amenity}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default InfoCard;