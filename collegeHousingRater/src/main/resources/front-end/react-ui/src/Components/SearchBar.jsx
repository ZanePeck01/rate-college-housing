import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for in-app navigation
import './SearchBar.css'; // Import SearchBar styles

// SearchBar component
function SearchBar({ onSearch }) {
  // State variables to hold the search term, list of colleges, filtered colleges, and dropdown visibility
  const [searchTerm, setSearchTerm] = useState('');
  const [colleges, setColleges] = useState([]);
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate(); // Hook to navigate programmatically without reloading

  // Fetch colleges from Spring Boot backend
  useEffect(() => {
    fetch('http://localhost:8080/home')
      .then((response) => response.json())
      .then((data) => {
        setColleges(data);
        setFilteredColleges(data); // Start with full list
      })
      .catch((error) => console.error('Error fetching colleges:', error));
  }, []);

  // handleChange function to update the search term and filter the college list
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value); // Pass the search term to a parent component or handler

    const filtered = colleges.filter((college) =>
      college.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredColleges(filtered);
  };

  // Show dropdown when input is focused
  const handleFocus = () => {
    setShowDropdown(true);
    setFilteredColleges(colleges); // Show full list when focused
  };

  // Hide dropdown when clicking outside
  const handleBlur = () => {
    // Delay hiding to allow click on list item
    setTimeout(() => setShowDropdown(false), 100);
  };

  // handleSearch function to navigate to a specific college page
  const handleSearch = () => {
      if (searchTerm.trim() !== '') {
        // Map college names to their dedicated routes
        const routeMap = {
          "University of Louisville": "/home/UofL",
          "University of Kentucky": "/home/UK",
        };

      const route = routeMap[searchTerm];
      if (route) {
        navigate(route); // navigate to the mapped route
      } else {
        console.log("No page for this college");
      }
    }
  };

  // Trigger handleSearch when pressing the Enter key
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  // Render the search bar with an input field and a search icon
  // The input field calls handleChange on change
  // Pressing Enter or clicking the search icon navigates to the selected college
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
        onKeyDown={handleKeyDown} // Handles Enter key press
      />
      <i
        className="fas fa-search search-icon"
        onClick={handleSearch} // Handles search icon click
        style={{ cursor: 'pointer' }}
      ></i>

      {/* College list dropdown */}
      {showDropdown && filteredColleges.length > 0 && (
        <ul className="college-list">
          {filteredColleges.map((college) => (
            <li
              key={college.id}
              onClick={() => {
                setSearchTerm(college.name);

                // Map college names to their dedicated routes
                const routeMap = {
                  "University of Louisville": "/home/UofL",
                  "University of Kentucky": "/home/UK",
                };

                const route = routeMap[college.name];
                if (route) {
                  navigate(route);
                } else {
                  console.log("No page for this college");
                }
              }}
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
