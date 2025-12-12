/**
 * Detail page for individual housing/dorm.
 * Displays comprehensive information
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './HousingDetail.css';
import WriteReviewModal from './WriteReviewModal';


// SSVG Icon Components

// Star Icon
const Star = ({ filled, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

// MapPin Icon
const MapPin = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

// Users Icon
const Users = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

// DollarSign Icon
const DollarSign = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

// ThumbsUp Icon
const ThumbsUp = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
  </svg>
);

// CheckCircle Icon 
const CheckCircle = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

// XCircle Icon 
const XCircle = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

// ArrowLeft Icon
const ArrowLeft = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

// Housing Details Component

function HousingDetail() {
  // Get housing ID from URL parameters
  const { housingId } = useParams();
  const navigate = useNavigate();
  
// State Management
  
  // Housing data from backend
  const [housing, setHousing] = useState(null);
  
  // Reviews data from backend
  const [reviews, setReviews] = useState([]);
  
  // Loading state
  const [loading, setLoading] = useState(true);
  
  // Error state
  const [error, setError] = useState(null);
  
  // Selected star filter for reviews
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Review Modal state
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

// Data Fetching, fetching housing and associated reviews
  
  useEffect(() => {
    // Fetch housing details
    fetch(`http://localhost:8080/housing/${housingId}`)
      .then(res => {
        if (!res.ok) throw new Error('Housing not found');
        return res.json();
      })
      .then(data => {
        console.log('Housing data:', data);
        setHousing(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching housing:', err);
        setError(err.message);
        setLoading(false);
      });

    // Fetch reviews for this housing
    fetch(`http://localhost:8080/api/housing/${housingId}/reviews`)
      .then(res => res.json())
      .then(data => {
        console.log('Reviews data:', data);
        setReviews(data);
      })
      .catch(err => console.error('Error fetching reviews:', err));
  }, [housingId]);

// Helper functions
    
//Render Stars
  const renderStars = (rating) => {
    return (
      <div className="stars-display">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star} filled={star <= Math.round(rating)} size={16} />
        ))}
      </div>
    );
  };


  // Render rating bar with percentage fill
  const renderRatingBar = (label, rating) => {
    const percentage = (rating / 5) * 100;
    return (
      <div className="rating-bar-container">
        <div className="rating-bar-header">
          <span className="rating-bar-label">{label}</span>
          <span className="rating-bar-value">{rating?.toFixed(1) || 'N/A'}</span>
        </div>
        <div className="rating-bar-track">
          <div 
            className="rating-bar-fill" 
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  };

// Event Handlers

// Handle back button click
  const handleBackClick = () => {
    navigate(-1); // Go back to previous page
  };
  
  // Filter reviews based on selected star rating
  const filteredReviews = selectedFilter === 'all' 
    ? reviews 
    : reviews.filter(r => r.rating === parseInt(selectedFilter));

  // If loading, show loading state, if error or no housing data, show error state
  if (loading) {
    return (
      <div className="loading-container">
        <h2>Loading housing details...</h2>
      </div>
    );
  }

  if (error || !housing) {
    return (
      <div className="error-container">
        <h2>Housing not found</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/home')}>Go Back Home</button>
      </div>
    );
  }


// Render Everything  
  return (
    <div className="housing-detail-page">
      
      {/* Hero Section, image with hosuing name */}
      <div className="hero-section">
        <img 
          src={housing.imageUrl || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200"}
          alt={housing.name}
          className="hero-image"
        />
        <div className="hero-overlay">
          <div className="hero-content">
            {/* Back button */}
            <button className="back-button" onClick={handleBackClick}>
              <ArrowLeft size={20} />
              Back
            </button>
            <h1 className="hero-title">{housing.name}</h1>
            <p className="hero-subtitle">{housing.collegeName}</p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        <div className="content-grid">
          
          {/* left column (Overview and Reviews) */}
          <div className="left-column">
            
            {/* Overview Card */}
            <div className="overview-card">
              <h2 className="section-title">Overview</h2>
              
              {/* Info Grid */}
              <div className="info-grid">
                {/* Location */}
                <div className="info-item">
                  <MapPin size={24} />
                  <div>
                    <div className="info-label">Location</div>
                    <div className="info-value">{housing.location || 'N/A'}</div>
                  </div>
                </div>
                
                {/* Capacity */}
                <div className="info-item">
                  <Users size={24} />
                  <div>
                    <div className="info-label">Capacity</div>
                    <div className="info-value">{housing.capacity || 'N/A'} students</div>
                  </div>
                </div>
                
                {/* Price Range */}
                <div className="info-item">
                  <DollarSign size={24} />
                  <div>
                    <div className="info-label">Price Range</div>
                    <div className="info-value">{housing.priceRange || 'N/A'}</div>
                  </div>
                </div>
                
                {/* Full Address */}
                <div className="info-item">
                  <MapPin size={24} />
                  <div>
                    <div className="info-label">Address</div>
                    <div className="info-value info-address">
                      {housing.address ? 
                        `${housing.address.street}, ${housing.address.city}, ${housing.address.state} ${housing.address.zipCode}` :
                        'Address not available'
                      }
                    </div>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              {housing.amenities && housing.amenities.length > 0 && (
                <div className="amenities-section">
                  <h3 className="amenities-title">Amenities</h3>
                  <div className="amenities-grid">
                    {housing.amenities.map((amenity, index) => (
                      <span key={index} className="amenity-tag">
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Reviews Section */}
            <div className="reviews-card">
              {/* Header with Write Review button */}
              <div className="reviews-header">
                <h2 className="section-title">Student Reviews</h2>
                <button className="write-review-btn"
                  onClick={() => setIsReviewModalOpen(true)}>
                  Write a Review
                </button>
              </div>

              {/* Filter Buttons */}
              <div className="filter-buttons">
                {['all', '5', '4', '3', '2', '1'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    className={`filter-btn ${selectedFilter === filter ? 'active' : ''}`}
                  >
                    {filter === 'all' ? 'All Reviews' : `${filter} Stars`}
                  </button>
                ))}
              </div>

              {/* Reviews List */}
              <div className="reviews-list">
                {filteredReviews.length > 0 ? (
                  filteredReviews.map((review) => (
                    <div key={review.id} className="review-card">
                      {/* Review Header */}
                      <div className="review-header">
                        <div className="review-author-info">
                          <div className="review-author-name-row">
                            <span className="review-author">{review.author}</span>
                            {review.verified && (
                              <span className="verified-badge">
                                <CheckCircle size={14} /> Verified
                              </span>
                            )}
                          </div>
                          <div className="review-meta">
                            Lived here: {review.yearLived}
                          </div>
                        </div>
                        <div className="review-rating-info">
                          {renderStars(review.rating)}
                          <div className="review-date">{review.date}</div>
                        </div>
                      </div>

                      {/* Review Title */}
                      <h3 className="review-title">{review.title}</h3>

                      {/* Review Content */}
                      <p className="review-content">{review.content}</p>

                      {/* Pros List */}
                      {review.pros && review.pros.length > 0 && (
                        <div className="review-pros">
                          <div className="pros-title">Pros:</div>
                          <ul className="pros-list">
                            {review.pros.map((pro, idx) => (
                              <li key={idx} className="pro-item">
                                <CheckCircle size={16} className="pro-icon" />
                                {pro}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Cons List */}
                      {review.cons && review.cons.length > 0 && (
                        <div className="review-cons">
                          <div className="cons-title">Cons:</div>
                          <ul className="cons-list">
                            {review.cons.map((con, idx) => (
                              <li key={idx} className="con-item">
                                <XCircle size={16} className="con-icon" />
                                {con}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {/* Recommendation */}
                      {review.wouldRecommend !== null && (
                        <div className="review-recommendation">
                          {review.wouldRecommend ? (
                            <div className="recommendation-card recommend-yes">
                              <span className="recommendation-icon">👍</span>
                              <span className="recommendation-text">
                                <strong>Would recommend</strong> this housing
                              </span>
                            </div>
                          ) : (
                            <div className="recommendation-card recommend-no">
                              <span className="recommendation-icon">👎</span>
                              <span className="recommendation-text">
                                <strong>Would not recommend</strong> this housing
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="no-reviews">
                    <p>No reviews match your filter</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (Ratings Summary) */}
          <div className="right-column">
            <div className="ratings-card">
              <h2 className="section-title">Overall Rating</h2>
              
              {/* Overall Rating Display */}
              <div className="overall-rating">
                <div className="overall-rating-number">
                  {housing.rating?.toFixed(1) || 'N/A'}
                </div>
                <div className="overall-rating-stars">
                  {renderStars(Math.round(housing.rating || 0))}
                </div>
                <div className="overall-rating-count">
                  Based on {housing.reviewCount || 0} reviews
                </div>
              </div>

              {/* Rating Breakdown */}
              <div className="rating-breakdown">
                <h3 className="breakdown-title">Rating Breakdown</h3>
                {renderRatingBar('Cleanliness', housing.cleanlinessRating)}
                {renderRatingBar('Maintenance', housing.maintenanceRating)}
                {renderRatingBar('Location', housing.locationRating)}
                {renderRatingBar('Value', housing.valueRating)}
                {renderRatingBar('Amenities', housing.amenitiesRating)}
                {renderRatingBar('Staff', housing.staffRating)}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Write Review Modal */}
      <WriteReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        housingName={housing?.name || 'Housing'}
        housingId={housingId}
      />
    </div>
  );
}

export default HousingDetail;