import React from "react";
import { useNavigate } from "react-router-dom";
import "./InfoCard.css"; 

function InfoCard({ title, description, link }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(link); // navigate to housing page
  };

  return (
    <div className="info-card" onClick={handleClick}
    >
      <h2 className="text-xl font-bold mb-2">TEXT</h2>
      <p className="text-gray-600">TEXT</p>
    </div>
  );
}

export default InfoCard;