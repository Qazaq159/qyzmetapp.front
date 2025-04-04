import React from "react";
import "../styles/InfoCard.css";

function InfoCard({ icon: Icon, title, children }) {
  return (
    <div className="card">
      <div className="card-header">
        <Icon className="card-icon" />
        <h3 className="card-title">{title}</h3>
      </div>
      <p className="card-content">{children}</p>
    </div>
  );
}

export default InfoCard;
