    import React, { useState } from 'react';
    import './SearchBar.css'; // Import SearchBar styles

    //SearchBar component

    //state varaible to hold the search term
    function SearchBar({ onSearch }) {
      const [searchTerm, setSearchTerm] = useState('');

    //handleChange function to update the search term
      const handleChange = (event) => {
        setSearchTerm(event.target.value);
        onSearch(event.target.value); // Pass the search term to a parent component or handler
      };

    //render the search bar with an input field and a search icon
    //the input field will call handleChange on change
      return (
        <div className="search-bar-wrapper">
        <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleChange}
        />
        <i className="fas fa-search search-icon"></i>
        </div>
      );
    }

    export default SearchBar;