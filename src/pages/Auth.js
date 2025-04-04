import React, { useState } from 'react';
import Layout from "../components/Layout";
import AuthForm from "../components/AuthForm";
import "../styles/Auth.css";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Layout>
      <div className='authpage'>
      <div className="auth-container">
        <div className="tabs">
          <button className={`tab ${isLogin ? "active" : ""}`} onClick={() => setIsLogin(true)}>Login</button>
          <button className={`tab ${!isLogin ? "active" : ""}`} onClick={() => setIsLogin(false)}>Register</button>
        </div>
        <div className="auth-content">
          <AuthForm isLogin={isLogin} setIsLogin={setIsLogin} />
        </div>
      </div>
      </div>
    </Layout>
  );
}
