import './App.css';
import './Components/NavBar.css';
import './Components/SearchBar.css';
import NavBar from './Components/NavBar';
import SearchBar from './Components/SearchBar';
import UofL from './Colleges/UofL';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";

function App() { 
  const location = useLocation();
  const hideLayout = location.pathname.startsWith("/home/");
  
  return (
    <div className="App">
      <NavBar />
      {!hideLayout && (
        <>
          <SearchBar onSearch={(term) => console.log(term)} />
        </>
      )}

      <Routes>
        <Route path="/home" />
        <Route path="/" />
        {/* Single dynamic route for all colleges */}
        <Route path="/home/:collegeName" element={<UofL />} />
      </Routes>
    </div>
  );
}

export default App;