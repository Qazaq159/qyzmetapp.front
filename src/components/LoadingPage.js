import React from "react";
import Layout from "./Layout";
import "../styles/LoadingPage.css";

export default function LoadingPage() {
  return (
    <Layout>
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    </Layout>
  );
}
