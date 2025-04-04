import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Header.css";
import { Home, MessageCircle, User, PlusCircle } from "lucide-react";

export default function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [userRole, setUserRole] = useState(null);
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUserRole(userData.role);
    }
  }, []);
  const handleLoginClick = () => {
    navigate("/auth");
  };
  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("user");
    navigate("/auth");
  };
  return (
    <header className="header">
      <Link to="/" className="logo">QyzmetTap</Link>
      <div className="desktop-nav">
        {token && userRole && (
          <nav className="desktop-nav">
            {userRole === "customer" ? (
              <>
                <Link to="/my-orders">
                  <Home size={24} /> My Orders
                </Link>
                <Link to="/create-order">
                  <PlusCircle size={24} /> Create an Order
                </Link>
              </>
            ) : (
              <Link to="/current-order">
                <Home size={24} />  Receive an Order
              </Link>
            )}
            <Link to="/chats">
              <MessageCircle size={24} /> Chats
            </Link>
            <Link to="/my-profile">
              <User size={24} /> My Profile
            </Link>
          </nav>
        )}
        {token ? (
          <button className="login-btn" onClick={handleLogoutClick}>Logout</button>
        ) : (
          <button className="login-btn" onClick={handleLoginClick}>Login</button>
        )}
      </div>
    </header>
  );
}