import { useNavigate } from "react-router-dom";
import Layout from "./Layout";
import { ArrowRight } from "lucide-react";

export default function SubscriptionErrorPage() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="subscription-error-container">
        <div className="subscription-card">
          <div className="subscription-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01" />
            </svg>
          </div>
          <h1 className="subscription-title">Subscription Required</h1>
          <p className="subscription-message">You need an active subscription to access new orders.</p>

          <div className="subscription-info">
            <div className="subscription-info-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM3 20c0-2 3-5 9-5s9 3 9 5v1H3v-1z" />
              </svg>
            </div>
            <div className="subscription-info-text">
              <p className="subscription-info-title">Gain access to orders</p>
              <p>Buy a subscription plan to receive access to high-value orders, faster payouts, and exclusive client projects.</p>
            </div>
          </div>

          <button className="subscription-button primary" onClick={() => navigate("/pricing")}>
            View Subscription Plans <ArrowRight className="arrow-icon-order" />
          </button>
          <button className="subscription-button secondary" onClick={() => navigate("/")}>
            Return to Homepage
          </button>
        </div>
      </div>
    </Layout>
  );
}
