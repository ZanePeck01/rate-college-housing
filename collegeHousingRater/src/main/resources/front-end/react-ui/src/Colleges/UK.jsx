import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./UK.css";

function UK() {
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
    <div className="kentucky-page">
      <h1>University of Kentucky</h1>
    </div>
  );
}

export default UK;
