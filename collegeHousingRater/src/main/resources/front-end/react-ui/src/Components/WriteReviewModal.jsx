/*
 * WriteReviewModal.jsx
 * Modal component for writing housing reviews.
 */

import React, { useState } from 'react';
import './WriteReviewModal.css';

// SVG ICONS

//star icon
const Star = ({ filled, size = 24, onClick, onMouseEnter }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill={filled ? "currentColor" : "none"} 
    stroke="currentColor" 
    strokeWidth="2"
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    className={onClick ? 'star-interactive' : ''}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

// x icon
const X = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// alert circle icon
const AlertCircle = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

// main component

// WriteReviewModal Component
function WriteReviewModal({ isOpen, onClose, housingName, housingId }) {
  
//State Hooks
  
  // Form data state
  const [formData, setFormData] = useState({
    overallRating: 0,
    cleanlinessRating: 0,
    maintenanceRating: 0,
    locationRating: 0,
    valueRating: 0,
    amenitiesRating: 0,
    staffRating: 0,
    title: '',
    content: '',
    pros: '',
    cons: '',
    yearLived: '',
    wouldRecommend: null
  });

  // Track which stars are being hovered
  const [hoveredRatings, setHoveredRatings] = useState({});
  
  // Form validation errors
  const [errors, setErrors] = useState({});
  
  // Submission loading state
  const [isSubmitting, setIsSubmitting] = useState(false);

// rating categories
  
  // Defining categories
  const categories = [
    { key: 'cleanlinessRating', label: 'Cleanliness', description: 'How clean were the common areas and facilities?' },
    { key: 'maintenanceRating', label: 'Maintenance', description: 'How responsive was maintenance to issues?' },
    { key: 'locationRating', label: 'Location', description: 'How convenient was the location?' },
    { key: 'valueRating', label: 'Value', description: 'Was it worth the price?' },
    { key: 'amenitiesRating', label: 'Amenities', description: 'Quality of amenities provided' },
    { key: 'staffRating', label: 'Staff', description: 'How helpful and friendly was the staff?' }
  ];

//event Handlerss
  
// Handle star rating click
  const handleRatingClick = (category, rating) => {
    setFormData(prev => ({ ...prev, [category]: rating }));
    setErrors(prev => ({ ...prev, [category]: null }));
  };

// Handle input field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: null }));
  };

// handle recommendation change
  const handleRecommendChange = (value) => {
    setFormData(prev => ({ ...prev, wouldRecommend: value }));
    setErrors(prev => ({ ...prev, wouldRecommend: null }));
  };

//handle form validation
  const validateForm = () => {
    const newErrors = {};

    // Validate overall rating
    if (formData.overallRating === 0) {
      newErrors.overallRating = 'Please provide an overall rating';
    }

    // Validate title
    if (!formData.title.trim()) {
      newErrors.title = 'Please provide a review title';
    }

    // Validate review content
    if (!formData.content.trim()) {
      newErrors.content = 'Please write your review';
    } else if (formData.content.trim().length < 1) {
      newErrors.content = 'Review must be at least 1 characters';
    }

    // Validate year lived
    if (!formData.yearLived) {
      newErrors.yearLived = 'Please select the year you lived here';
    }

    // Validate recommendation
    if (formData.wouldRecommend === null) {
      newErrors.wouldRecommend = 'Please indicate if you would recommend this housing';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

// handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const reviewData = {
        housingId: parseInt(housingId),
        rating: parseFloat(formData.overallRating),
        cleanlinessRating: parseFloat(formData.cleanlinessRating || 0),
        maintenanceRating: parseFloat(formData.maintenanceRating || 0),
        locationRating: parseFloat(formData.locationRating || 0),
        valueRating: parseFloat(formData.valueRating || 0),
        amenitiesRating: parseFloat(formData.amenitiesRating || 0),
        staffRating: parseFloat(formData.staffRating || 0),
        title: formData.title,
        content: formData.content,
        pros: formData.pros.split('\n').filter(p => p.trim()),
        cons: formData.cons.split('\n').filter(c => c.trim()),
        yearLived: formData.yearLived,
        wouldRecommend: formData.wouldRecommend
      };

      console.log('Submitting review:', reviewData);
      
      const response = await fetch(`http://localhost:8080/api/housing/${housingId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit review');
      }

      alert('Review submitted successfully!');
      
      // Reset form and close modal
      setFormData({
        overallRating: 0,
        cleanlinessRating: 0,
        maintenanceRating: 0,
        locationRating: 0,
        valueRating: 0,
        amenitiesRating: 0,
        staffRating: 0,
        title: '',
        content: '',
        pros: '',
        cons: '',
        yearLived: '',
        wouldRecommend: null
      });
      
      onClose();
      window.location.reload(); // Refresh to show new review
      
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

//rendering star ratings
  const renderStarRating = (category, currentRating) => {
    const hoverRating = hoveredRatings[category] || 0;
    const displayRating = hoverRating || currentRating;

    return (
      <div 
        className="star-rating"
        onMouseLeave={() => setHoveredRatings(prev => ({ ...prev, [category]: 0 }))}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            filled={star <= displayRating}
            size={category === 'overallRating' ? 32 : 24}
            onClick={() => handleRatingClick(category, star)}
            onMouseEnter={() => setHoveredRatings(prev => ({ ...prev, [category]: star }))}
          />
        ))}
      </div>
    );
  };


  //Rendering
  
  // Don't render if modal is not open
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        
        {/* Modal Header */}
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Write a Review</h2>
            <p className="modal-subtitle">{housingName}</p>
          </div>
          <button className="close-button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="modal-content">
          <div className="modal-scroll">
            
            {/* Overall Rating Section */}
            <div className="form-section">
              <label className="form-label">
                Overall Rating <span className="required">*</span>
              </label>
              <div className="rating-display">
                {renderStarRating('overallRating', formData.overallRating)}
                {formData.overallRating > 0 && (
                  <span className="rating-text">{formData.overallRating} out of 5</span>
                )}
              </div>
              {errors.overallRating && (
                <div className="error-message">
                  <AlertCircle size={16} />
                  <span>{errors.overallRating}</span>
                </div>
              )}
            </div>

            {/* Year Lived Section */}
            <div className="form-section">
              <label className="form-label">
                When did you live here? <span className="required">*</span>
              </label>
              <select
                name="yearLived"
                value={formData.yearLived}
                onChange={handleInputChange}
                className="form-select"
              >
                <option value="">Select year...</option>
                <option value="2024-2025">2024-2025</option>
                <option value="2023-2024">2023-2024</option>
                <option value="2022-2023">2022-2023</option>
                <option value="2021-2022">2021-2022</option>
                <option value="2020-2021">2020-2021</option>
                <option value="2019-2020">2019-2020</option>
              </select>
              {errors.yearLived && (
                <div className="error-message">
                  <AlertCircle size={16} />
                  <span>{errors.yearLived}</span>
                </div>
              )}
            </div>

            {/* Review Title Section */}
            <div className="form-section">
              <label className="form-label">
                Review Title <span className="required">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Summarize your experience..."
                className="form-input"
                maxLength={100}
              />
              {errors.title && (
                <div className="error-message">
                  <AlertCircle size={16} />
                  <span>{errors.title}</span>
                </div>
              )}
            </div>

            {/* Review Content Section */}
            <div className="form-section">
              <label className="form-label">
                Your Review <span className="required">*</span>
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Share your experience living here... (minimum 50 characters)"
                className="form-textarea"
                rows={6}
              />
              <div className="char-count">
                {formData.content.length} characters
              </div>
              {errors.content && (
                <div className="error-message">
                  <AlertCircle size={16} />
                  <span>{errors.content}</span>
                </div>
              )}
            </div>

            {/* Category Ratings Section */}
            <div className="form-section">
              <h3 className="section-title">Rate by Category</h3>
              <div className="categories-grid">
                {categories.map(category => (
                  <div key={category.key} className="category-card">
                    <div className="category-header">
                      <div className="category-label">{category.label}</div>
                      <div className="category-description">{category.description}</div>
                    </div>
                    {renderStarRating(category.key, formData[category.key])}
                  </div>
                ))}
              </div>
            </div>

            {/* Pros Section */}
            <div className="form-section">
              <label className="form-label">Pros (one per line)</label>
              <textarea
                name="pros"
                value={formData.pros}
                onChange={handleInputChange}
                placeholder="Modern facilities&#10;Great location&#10;Responsive staff"
                className="form-textarea"
                rows={4}
              />
            </div>

            {/* Cons Section */}
            <div className="form-section">
              <label className="form-label">Cons (one per line)</label>
              <textarea
                name="cons"
                value={formData.cons}
                onChange={handleInputChange}
                placeholder="Thin walls&#10;Limited parking&#10;Noisy on weekends"
                className="form-textarea"
                rows={4}
              />
            </div>

            {/* Recommendation Section */}
            <div className="form-section">
              <label className="form-label">
                Would you recommend this housing? <span className="required">*</span>
              </label>
              <div className="recommend-buttons">
                <button
                  type="button"
                  onClick={() => handleRecommendChange(true)}
                  className={`recommend-button ${formData.wouldRecommend === true ? 'active' : ''}`}
                >
                  👍 Yes
                </button>
                <button
                  type="button"
                  onClick={() => handleRecommendChange(false)}
                  className={`recommend-button ${formData.wouldRecommend === false ? 'active' : ''}`}
                >
                  👎 No
                </button>
              </div>
              {errors.wouldRecommend && (
                <div className="error-message">
                  <AlertCircle size={16} />
                  <span>{errors.wouldRecommend}</span>
                </div>
              )}
            </div>
          </div>

          {/* Modal Footer */}
          <div className="modal-footer">
            <button type="button" onClick={onClose} className="cancel-button">
              Cancel
            </button>
            <button 
              type="button"
              onClick={handleSubmit}
              className={`submit-button ${isSubmitting ? 'disabled' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WriteReviewModal;