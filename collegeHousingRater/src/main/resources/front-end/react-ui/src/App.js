import './App.css';
import './Components/NavBar.css'; // Import NavBar styles
import './Components/SearchBar.css'; // Import SearchBar styles
import NavBar from './Components/NavBar';
import SearchBar from './Components/SearchBar';
import UofL from './Colleges/UofL';
import UK from './Colleges/UK';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";


function App() { 
  const location = useLocation();
  const hideLayout = location.pathname.startsWith("/home/"); //hide on college page
  return (
      <div className="App">
        <NavBar />  {/* Include the NavBar component */}
        {!hideLayout && (
        <>
        <SearchBar onSearch={(term) => console.log(term)} /> {/* Include the SearchBar component */}
        </>
        )}

          <Routes>
            <Route path="/home"/>
            <Route path="/"/>
            {/* routes for colleges */}
            <Route path="/home/UofL" element={<UofL />} />
            <Route path="/home/UK" element={<UK />} />
          </Routes>
      </div>
  );
}

export default App;
