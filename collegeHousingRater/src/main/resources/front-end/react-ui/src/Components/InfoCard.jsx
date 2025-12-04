import React from "react";
import "./InfoCard.css";
import { housingImages, defaultHousingImage } from "../Images/housingImages.js";

// Custom SVG Icon Components
const Star = ({ filled, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const MapPin = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const Users = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const DollarSign = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

function InfoCard({ dorm, onClick }) {
  // Get image from mapping or use default
  const getHousingImage = () => {
    if (dorm.imageUrl) {
      return dorm.imageUrl; // Use database image if available
    }
    return housingImages[dorm.name] || defaultHousingImage;
  };

  const renderStars = (rating) => {
    if (rating == null || rating === 0) {
      return (
        <div className="stars-container no-rating">
          <span className="rating-text">No Ratings</span>
        </div>
      );
    }
    
    return (
      <div className="stars-container">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            filled={star <= Math.floor(rating)}
            size={16}
          />
        ))}
        <span className="rating-number">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="info-card" onClick={() => onClick(dorm.id)}>
      {/* Image Section */}
      <div className="dorm-image-container">
        <img
          src={getHousingImage()}
          alt={dorm.name}
          className="dorm-image"
        />
        <div className="review-badge">
          <span>{dorm.reviewCount || 0} reviews</span>
        </div>
      </div>

      {/* Rest of the component stays the same */}
      <div className="dorm-content">
        <h3 className="dorm-name">{dorm.name}</h3>
        
        <div className="dorm-rating">
          {renderStars(dorm.rating)}
        </div>

        <div className="dorm-info">
          {dorm.location && (
            <div className="info-item">
              <MapPin size={16} />
              <span>{dorm.location}</span>
            </div>
          )}
          
          {dorm.capacity && (
            <div className="info-item">
              <Users size={16} />
              <span>{dorm.capacity} students</span>
            </div>
          )}
          
          {dorm.priceRange && (
            <div className="info-item">
              <DollarSign size={16} />
              <span>{dorm.priceRange}</span>
            </div>
          )}
        </div>

        {dorm.amenities && dorm.amenities.length > 0 && (
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