 // Main landing page component for app

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

/*
  * SVG Icon Components
  * Reusable icon components for UI elements
*/

// Search Icon Component
const Search = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

// Star Icon Component
const Star = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

// Shield Icon Component
const Shield = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

// Users Icon Component
const Users = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

// TrendingUp Icon Component
const TrendingUp = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

// ArrowRight Icon Component
const ArrowRight = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

/*
 * HomePage Component
 * Main landing page that displays all sections and handles user interactions
 * Fetches college data from backend and provides search/navigation functionality
 */
function HomePage() {
  // Navigation hook for routing
  const navigate = useNavigate();
  
  // Search bar input value
  const [searchTerm, setSearchTerm] = useState('');
  
  // Track if search input is focused
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  // List of colleges fetched from backend
  const [colleges, setColleges] = useState([]);

  // Data fetching
  useEffect(() => {
    // Fetch colleges from Spring Boot backend
    fetch('http://localhost:8080/home')
      .then((response) => response.json())
      .then((data) => setColleges(data.slice(0, 3))) // Getting first 3 colleges for featured section
      .catch((error) => console.error('Error fetching colleges:', error));
  }, []);

  // Static data for features and stats sections
  const features = [
    {
      icon: <Star size={32} />,
      title: "Honest Reviews",
      description: "Read authentic reviews from current and former residents about their housing experiences."
    },
    {
      icon: <Shield size={32} />,
      title: "Hold Schools Accountable",
      description: "Help keep universities accountable for maintaining quality living conditions for students."
    },
    {
      icon: <Users size={32} />,
      title: "Student Community",
      description: "Connect with fellow students and share your housing experiences to help others."
    },
    {
      icon: <TrendingUp size={32} />,
      title: "Data-Driven Decisions",
      description: "Make informed choices with comprehensive ratings across multiple categories."
    }
  ];

  //Metrics (change depending on data available)
  const stats = [
    { number: "50+ (Place Holder)", label: "Universities" },
    { number: "500+ (Place Holder", label: "Housing Options" },
    { number: "1,000+ (Place Holder)", label: "Student Reviews" },
    { number: "4.0 (Place Holder)", label: "Average Rating" }
  ];

  // Event Handlers
  /**
   * Navigate to specific college page
   * Converts college name to URL-friendly format
   */
  const handleCollegeClick = (collegeName) => {
    // Convert "University of Louisville" to "university-of-louisville"
    const urlName = collegeName.toLowerCase().replace(/\s+/g, '-');
    navigate(`/home/${urlName}`);
  };

  /**
   * Handle search submission
   * Navigates to college page based on search term
   */
  const handleSearch = () => {
    if (searchTerm.trim()) {
      // Convert search term to URL format
      const urlName = searchTerm.toLowerCase().replace(/\s+/g, '-');
      navigate(`/home/${urlName}`);
    }
  };

  // Render HomePage component
  return (
    <div className="homepage">
      
      {/*
           Hero Section
           Main banner with title, subtitle, and search*/}
      <section className="hero">
        <div className="hero-content">
          {/* Main heading with accent text */}
          <h1 className="hero-title">
            Find Your Perfect
            <span className="hero-title-accent"> College Housing</span>
          </h1>
          
          {/* Subtitle/description */}
          <p className="hero-subtitle">
            Discover honest reviews and ratings from students who've lived there. 
            Make informed decisions about your college housing with real experiences from real students.
          </p>

          {/* Search Bar */}
          <div className={`hero-search ${isSearchFocused ? 'focused' : ''}`}>
            <Search size={24} />
            <input
              type="text"
              placeholder="Search for your university..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update search term as user types
              onFocus={() => setIsSearchFocused(true)} // Add focused class for styling
              onBlur={() => setIsSearchFocused(false)} // Remove focused class
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()} // Allow Enter key to submit
              className="hero-search-input"
            />
          </div>

          {/* Quick-access tags for popular colleges */}
          <div className="hero-tags">
            {colleges.map((college) => (
              <span 
                key={college.id}
                className="tag" 
                onClick={() => handleCollegeClick(college.name)}
              >
                {college.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Display the stats*/}
      <section className="stats-section">
        <div className="stats-grid">
          {/* Map through stats array to create stat cards */}
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features section */}
      <section className="features-section">
        {/* Section header */}
        <div className="section-header">
          <h2 className="section-title">Why Choose Our Platform?</h2>
          <p className="section-subtitle">
            We're dedicated to helping students find safe, comfortable housing through transparent reviews
          </p>
        </div>

        {/* Features grid */}
        <div className="features-grid">
          {/* Map through features array to create feature cards */}
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              {/* Icon container with gradient background */}
              <div className="feature-icon">
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;