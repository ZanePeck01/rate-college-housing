import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./UofL.css"; 

function UofL() {
  const { collegeName } = useParams(); //get the name from the URL
  const [college, setCollege] = useState(null);

  useEffect(() => {
    //Fetch college details from backend
    fetch(`http://localhost:8080/home/${decodeURIComponent(collegeName)}`)
      .then((res) => res.json())
      .then((data) => setCollege(data))
      .catch((err) => console.error("Error fetching college:", err));
  }, [collegeName]);

  if (!college) {
    return <h2>Loading college details...</h2>;
  }

  return (
    <div className="louisville-page">
      <h1>University of Louisville</h1>
    </div>
  );
}

export default UofL;
