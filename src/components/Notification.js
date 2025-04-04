import React from "react";
import { useNavigate } from "react-router-dom";

const Notification = ({ type, message, link, linkText, onClose }) => {
    const navigate = useNavigate();
    return (
        <div className={`notification ${type}`}>
            <span>{message} </span>
            {link && <span className="notification-link" onClick={() => navigate(link)}>{linkText}</span>}
            <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
    );
};
export default Notification;
