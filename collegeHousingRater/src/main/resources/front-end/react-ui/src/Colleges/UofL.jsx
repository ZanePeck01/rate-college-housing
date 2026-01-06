import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./UofL.css"; 
import DormCard from "../Components/InfoCard";

function UofL() {
  const { collegeName } = useParams();
  const navigate = useNavigate();
  const [college, setCollege] = useState(null);
  const [dorms, setDorms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Format college name from URL
  const formatCollegeName = (name) => {
    if (!name) return "University";
    return decodeURIComponent(name)
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  useEffect(() => {

  //AWS RDS endpoint
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';


    console.log("collegeName from URL:", collegeName);
    
    if (!collegeName) {
      setError("No college name provided in URL");
      setLoading(false);
      return;
    }

    // Fetch college details
    fetch(`${API_URL}/home/${encodeURIComponent(collegeName)}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("College data received:", data);
        setCollege(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching college:", err);
        setError(err.message);
        setLoading(false);
      });

    // Fetch housing for this college
    fetch(`${API_URL}/home/${encodeURIComponent(collegeName)}/housing`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Housing data received:", data);
        setDorms(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Error fetching housing:", err);
        setDorms([]);
      });
  }, [collegeName]);

  const handleDormClick = (dormId) => {
    navigate(`/housing/${dormId}`);
  };

  const filteredDorms = selectedFilter === 'all' 
    ? dorms 
    : dorms.filter(d => d.rating >= parseFloat(selectedFilter));

  // Get display name with fallback
  const displayName = college?.name || formatCollegeName(collegeName);

  if (loading) {
    return (
      <div className="loading-container">
        <h2>Loading college details...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error loading college</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/')}>Go Back Home</button>
      </div>
    );
  }

  return (
    <div className="university-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>{displayName}</h1>
          <p className="hero-description">
            Explore student-reviewed housing options at {displayName}
          </p>
          
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-value">{dorms.length}</span> Housing Options
            </div>
            <div className="stat-item">
              <span className="stat-value">
                {college?.averageRating?.toFixed(1) || 'N/A'}
              </span> Average Rating
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="filters-section">
        <div className="filters-container">
          <span className="filter-label">Filter by rating:</span>
          <div className="filter-buttons">
            {['all', '3.5', '4.0', '4.5'].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`filter-btn ${selectedFilter === filter ? 'active' : ''}`}
              >
                {filter === 'all' ? 'All' : `${filter}+ Stars`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Housing Grid */}
      <div className="dorms-section">
        {dorms.length > 0 ? (
          <div className="dorms-grid">
            {filteredDorms.map((dorm) => (
              <DormCard key={dorm.id} dorm={dorm} onClick={handleDormClick} />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <p>No housing options available yet</p>
          </div>
        )}

        {filteredDorms.length === 0 && dorms.length > 0 && (
          <div className="no-results">
            <p>No housing matches your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UofL;