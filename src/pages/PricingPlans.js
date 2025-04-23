import React, { useEffect, useState } from "react";
import "../styles/PricingPlans.css";
import PlanCard from "../components/PlanCard";
import Layout from "../components/Layout";
import { getSubscriptionTypes, purchaseSubscription } from "../services/subscriptionService";
import LoadingPage from "../components/LoadingPage";
import ErrorPage from "../components/ErrorPage";
import Notification from "../components/Notification";
import Modal from "../components/Modal";

const PricingPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [notification, setNotification] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  useEffect(() => {
    const loadPlans = async () => {
      try {
        const cachedData = sessionStorage.getItem("pricingPlans");
        if (cachedData && cachedData !== "undefined") {
          setPlans(JSON.parse(cachedData));
          setLoading(false);
          return;
        }
        const data = await getSubscriptionTypes();
        setPlans(data);
        sessionStorage.setItem("pricingPlans", JSON.stringify(data));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadPlans();
  }, []);

  const handlePurchase = async () => {
    if (!selectedPlan) return;
    setIsProcessing(true);
    try {
      await purchaseSubscription(selectedPlan.id);
      sessionStorage.removeItem("user"); 
      setNotification({
        type: "success",
        message: `Successfully purchased ${selectedPlan.name} plan!`,
        link: "/my-profile",
        linkText: "Go to Profile",
      });
    } catch (error) {
      const errorData = await error.response.json();
      let errorMessage = errorData.message || JSON.stringify(errorData);
      if (errorMessage === "INSUFFICIENT_FUNDS") {
        setNotification({
            type: "error-not",
            message: `Insufficient funds! Your balance: ${errorData.current_balance} KZT`,
            link: "/top-up",
            linkText: "Top up balance",
        });
      } else {
          setNotification({ type: "error-not", message: "Error creating order. Please try again." });
      }
    } finally {
      setIsProcessing(false);
      setSelectedPlan(null);
    }
  };

  if (loading) return <LoadingPage />;
  if (error) return <ErrorPage message={error} />;

  return (
    <Layout>
      <div className="plan-container">
        {notification && <Notification {...notification} onClose={() => setNotification(null)} />}
        <h2 className="plan-title">Pricing Plans</h2>
        <p className="plan-subtitle">
          Choose the perfect plan for your freelancing journey. Upgrade or downgrade at any time.
        </p>
        <div className="plan-grid">
          {plans.map((plan) => (
            <PlanCard key={plan.id} {...plan} onSelect={() => setSelectedPlan(plan)} />
          ))}
        </div>
      </div>
      {selectedPlan && (
        <Modal
          title="Confirm Purchase"
          message={`Are you sure you want to buy the ${selectedPlan.name} plan for ${selectedPlan.price} KZT?`}
          onConfirm={handlePurchase}
          onCancel={() => setSelectedPlan(null)}
          confirmText={isProcessing ? "Processing..." : "Buy Plan"}
          cancelText="Cancel"
          isDisabled={isProcessing} 
        />
      )}
    </Layout>
  );
};
export default PricingPlans;