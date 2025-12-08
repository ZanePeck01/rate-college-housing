// Root component for College Housing Rater application.
// Handles routing, layout management, and displays navbar/searchbar conditionally.

import './App.css';
import './Components/NavBar.css';
import './Components/SearchBar.css';
import NavBar from './Components/NavBar';
import SearchBar from './Components/SearchBar';
import HomePage from './Components/HomePage';
import UofL from './Colleges/UofL';
import HousingDetail from './Components/HousingDetail';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";

/*
 * Main App Component
 * Manages application routing and conditional layout rendering.
 * Hides SearchBar on homepage and college detail pages.
 */
function App() { 
  // Get current route location
  const location = useLocation();
  
  // Determine if we should hide the search bar layout
  // Hide on college detail pages (paths starting with /home/)
  const hideLayout = location.pathname.startsWith("/home/");

  // Determine if we are on a housing detail page
  const isHousingDetail = location.pathname.startsWith("/housing/")
  
  // Check if current page is the homepage
  const isHomePage = location.pathname === "/" || location.pathname === "/home";
  
  return (
    <div className="App">
      {/* Navbar is always visible on all pages */}
      <NavBar />
      
      {/* Conditionally render SearchBar
          - Don't show on college detail pages (hideLayout)
          - Don't show on homepage (isHomePage)
      */}
      {!hideLayout && !isHomePage && !isHousingDetail && (
        <>
          <SearchBar onSearch={(term) => console.log(term)} />
        </>
      )}

      {/* Application Routes */}
      <Routes>
        {/* Homepage route (main landing page) */}
        <Route path="/" element={<HomePage />} />
        
        {/* Alternative homepage route */}
        <Route path="/home" element={<HomePage />} />
        
        {/* Dynamic college route (shows college details based on collegeName param) */}
        <Route path="/home/:collegeName" element={<UofL />} />

        {/* Housing detail route */}
        <Route path="/housing/:housingId" element={<HousingDetail />} />
      </Routes>
    </div>
  );
}

export default App;