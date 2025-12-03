import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./UofL.css"; 
import InfoCard from "../Components/InfoCard";

function UofL() {
  const { collegeName } = useParams();
  const navigate = useNavigate();
  const [college, setCollege] = useState(null);
  const [dorms, setDorms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    // Fetch college details
    fetch(`http://localhost:8080/home/${decodeURIComponent(collegeName)}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("College data received:", data); // Debug line
        setCollege(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching college:", err);
        setLoading(false);
      });

    // Fetch dorms for this college
    fetch(`http://localhost:8080/api/colleges/${decodeURIComponent(collegeName)}/dorms`)
      .then((res) => res.json())
      .then((data) => setDorms(data))
      .catch((err) => console.error("Error fetching dorms:", err));
  }, [collegeName]);

  const handleDormClick = (dormId) => {
    navigate(`/dorm/${dormId}`);
  };

  const filteredDorms = selectedFilter === 'all' 
    ? dorms 
    : dorms.filter(d => d.overallRating >= parseFloat(selectedFilter));

  if (loading) {
    return (
      <div className="loading-container">
        <h2>Loading college details...</h2>
      </div>
    );
  }

  if (!college) {
    return (
      <div className="error-container">
        <h2>College not found</h2>
      </div>
    );
  }

  return (
    <div className="university-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>{college.name}</h1>
          <p className="hero-description">
            Explore student-reviewed housing options at the {college.name}
          </p>
          
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-value">{dorms.length}</span> Housing Options
            </div>
            <div className="stat-item">
              <span className="stat-value">
                {college.averageRating?.toFixed(1) || 'N/A'}
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
            {['all', '3.0', '4.0', '4.5'].map((filter) => (
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

      {/* Dorms Grid */}
      <div className="dorms-section">
        <div className="dorms-grid">
          {filteredDorms.map((dorm) => (
            <InfoCard key={dorm.id} dorm={dorm} onClick={handleDormClick} />
          ))}
        </div>

        {filteredDorms.length === 0 && (
          <div className="no-results">
            <p>No dorms match your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UofL;