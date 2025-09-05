import React, { useState, useEffect } from 'react';
import './SearchBar.css'; //Import SearchBar styles

//SearchBar component
function SearchBar({ onSearch }) {
  //state varaibles to hold the search term, list of colleges, and filtered colleges
  const [searchTerm, setSearchTerm] = useState('');
  const [colleges, setColleges] = useState([]);
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  //Fetch colleges from Spring Boot backend
  useEffect(() => {
    fetch('http://localhost:8080/home')
      .then((response) => response.json())
      .then((data) => {
        setColleges(data);
        setFilteredColleges(data); //start with full list
      })
      .catch((error) => console.error('Error fetching colleges:', error));
  }, []);

  //handleChange function to update the search term
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value); //Pass the search term to a parent component or handler

    const filtered = colleges.filter((college) =>
      college.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredColleges(filtered);
  };

  //show dropdown when input is focused
  const handleFocus = () => {
    setShowDropdown(true);
    setFilteredColleges(colleges);
  };

  //Hide dropdown when clicking outside
  const handleBlur = () => {
    //Delay hiding to allow click on list item
    setTimeout(() => setShowDropdown(false), 100);
  };

  //handleSearch function to redirect to a specific link based on the search term
  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      // Redirect to a page for the selected college
      window.location.href = `/home/${encodeURIComponent(searchTerm)}`;
    }
  };

  //trigger handleSearch when pressing the Enter key
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  //render the search bar with an input field and a search icon
  //the input field will call handleChange on change
  //pressing Enter or clicking the search icon will redirect
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
        onKeyDown={handleKeyDown} //handles Enter press
      />
      <i
        className="fas fa-search search-icon"
        onClick={handleSearch} //handles search icon click
        style={{ cursor: 'pointer' }}
      ></i>

      {/* College list */}
      {showDropdown && filteredColleges.length > 0 && (
        <ul className="college-list">
          {filteredColleges.map((college) => (
            <li
              key={college.id}
              //clicking a college name sets the term AND redirects
              onClick={() => {
                setSearchTerm(college.name);
                window.location.href = `/home/${encodeURIComponent(college.name)}`;
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
