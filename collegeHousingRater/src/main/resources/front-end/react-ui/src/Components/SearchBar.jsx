import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [colleges, setColleges] = useState([]);
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();

  // Fetch colleges from Spring Boot backend
  useEffect(() => {
      //AWS RDS endpoint
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

    fetch(`${API_URL}/home`)
      .then((response) => response.json())
      .then((data) => {
        setColleges(data);
        setFilteredColleges(data);
      })
      .catch((error) => console.error('Error fetching colleges:', error));
  }, []);

  // Helper function to convert college name to URL-friendly format
  const collegeNameToUrl = (name) => {
    return name
      .toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with hyphens
      .replace(/[^a-z0-9-]/g, '');    // Remove special characters
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);

    const filtered = colleges.filter((college) =>
      college.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredColleges(filtered);
  };

  const handleFocus = () => {
    setShowDropdown(true);
    setFilteredColleges(colleges);
  };

  const handleBlur = () => {
    setTimeout(() => setShowDropdown(false), 100);
  };

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      // Find matching college
      const matchedCollege = colleges.find(
        (college) => college.name.toLowerCase() === searchTerm.toLowerCase()
      );

      if (matchedCollege) {
        const urlName = collegeNameToUrl(matchedCollege.name);
        navigate(`/home/${urlName}`);
      } else {
        console.log("No page for this college");
        alert("College not found. Please select from the dropdown.");
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleCollegeClick = (college) => {
    setSearchTerm(college.name);
    const urlName = collegeNameToUrl(college.name);
    navigate(`/home/${urlName}`);
    setShowDropdown(false);
  };

  return (
    <div className="search-bar-wrapper">
      <input
        type="text"
        className="search-bar"
        placeholder="Search Colleges..."
        value={searchTerm}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />
      <i
        className="fas fa-search search-icon"
        onClick={handleSearch}
        style={{ cursor: 'pointer' }}
      ></i>

      {/* College list dropdown */}
      {showDropdown && filteredColleges.length > 0 && (
        <ul className="college-list">
          {filteredColleges.map((college) => (
            <li
              key={college.id}
              onClick={() => handleCollegeClick(college)}
            >
              {college.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;