import React, { useState } from "react";
import InputGroup from "./InputGroup";
import { FaGoogle, FaTelegram } from "react-icons/fa";
import { authService } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { fetchUserProfile } from "../services/userService";

const AuthForm = ({ isLogin, setIsLogin }) => {
  const initialFormData = {name: "", phone: "", email: "", password: "", password_confirmation: "", role: "customer",};
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setErrors({});
    const result = await authService(formData, isLogin);
    setLoading(false);
    if (result.success) {
      if (isLogin) {
        try {
          const userData = await fetchUserProfile();
          sessionStorage.setItem("user", JSON.stringify(userData));
          navigate("/");
        } catch (error) {
          console.error("Ошибка загрузки профиля:", error.message);
        } 
      } else {
        setIsLogin(true);
        setFormData(initialFormData); 
      }
    } else {
      setErrors(result.errors || {});
      setMessage(result.message || "");
    }
  };
  const renderInputFields = () => {
    const fields = [
        ...(isLogin
          ? [
              { label: "Email", name: "email", type: "email" },
              { label: "Password", name: "password", type: "password" },
            ]
          : [
              { label: "Full Name", name: "name", type: "text" },
              { label: "Email", name: "email", type: "email" },
              { label: "Phone", name: "phone", type: "text" },
              { label: "Password", name: "password", type: "password" },
              { label: "Confirm Password", name: "password_confirmation", type: "password" },
            ]),
      ];    
    return fields.map((field) => (
      <InputGroup key={field.name} label={field.label} name={field.name} type={field.type || "text"} value={formData[field.name]} onChange={handleChange} error={errors[field.name]}/>
    ));
  };
  return (
    <form onSubmit={handleSubmit} className="form">
        {renderInputFields()}
        {!isLogin && (
          <div className="checkbox-group">
            <input type="checkbox" id="role" name="role" checked={formData.role === "executor"}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.checked ? "executor" : "customer" })} />
            <label htmlFor="role">I am a Developer</label>
          </div>
        )}
        <button type="submit" className="btn primary-btn" disabled={loading}>
          {loading ? "Loading..." : isLogin ? "Login" : "Sign Up"}
        </button>
        {message && <div className="message">{message}</div>}
        {isLogin && (
          <>
            <div className="divider"><span>OR CONTINUE WITH</span></div>
            <button className="btn social-btn">
              <FaTelegram className="icon" /> Log in with Telegram
            </button>
            <button className="btn social-btn google">
              <FaGoogle className="icon" /> Log in with Google
            </button>
          </>
        )}
    </form>
  );
};
export default AuthForm;