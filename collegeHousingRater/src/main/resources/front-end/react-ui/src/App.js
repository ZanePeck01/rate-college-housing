import './App.css';
import './Components/NavBar.css'; // Import NavBar styles
import './Components/SearchBar.css'; // Import SearchBar styles
import NavBar from './Components/NavBar';
import SearchBar from './Components/SearchBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';


function App() {
  return (
    <div className="App">
      <NavBar />  {/* Include the NavBar component */}
      <SearchBar onSearch={(term) => console.log(term)} /> {/* Include the SearchBar component */}
    </div>
  );
}

export default App;
