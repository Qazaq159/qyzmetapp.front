import React from "react";
import "../styles/PricingPlans.css";

const PlanCard = ({ name, description, duration, price, features, selected = false, onSelect }) => {
  return (
    <div className={`plan-card ${selected ? "selected" : ""}`}>
      <h3 className="plan-title">{name}</h3>
      <p className="plan-description">{description}</p>
      <h4 className="plan-price">{price} KZT</h4>
      <span className="perMonth">Duration: {duration} days</span>
      <ul className="plan-features">
        {features.map((feature, index) => (
          <li key={index} className="plan-feature">{feature}</li>
        ))}
      </ul>
      <button className="plan-button" onClick={onSelect}>Buy Plan</button>
    </div>
  );
};
export default PlanCard;
