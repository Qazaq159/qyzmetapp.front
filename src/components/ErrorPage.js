import React from "react";
import "../styles/ErrorPage.css";
import Layout from "./Layout";
import { AlertTriangle } from "lucide-react";

const ErrorPage = ({ message }) => {
  return (
    <Layout>
    <div className="error-page">
      <div className="error-card">
        <AlertTriangle className="error-icon" size={50} strokeWidth={1.5} />
        <h2 className="error-title">Oops! Something went wrong</h2>
        <p className="error-message">{message}</p>
        <button className="error-button" onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    </div>
    </Layout>
  );
};
export default ErrorPage;