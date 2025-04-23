import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserProfile } from "../services/userService";
import "../styles/Profile.css";
import Layout from "../components/Layout";
import LoadingPage from "../components/LoadingPage";

function Profile() {
  const [user, setUser] = useState(() => {
    const cachedUser = sessionStorage.getItem("user");
    return cachedUser ? JSON.parse(cachedUser) : null;
  });
  const [loading, setLoading] = useState(!user);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) return; 
    async function loadUser() {
      try {
        const userData = await fetchUserProfile();
        setUser(userData);
        sessionStorage.setItem("user", JSON.stringify(userData));
      } catch (error) {
        console.error(error.message);
        navigate("/auth");
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, [navigate, user]);
  useEffect(() => {
    if (!user) return;
    let elapsedTime = 0;
    let intervalTime = 600000;
    let interval;
    const checkBalanceUpdate = async () => {
      elapsedTime += intervalTime;
      try {
        const updatedUser = await fetchUserProfile();
        if (updatedUser.balance !== user.balance) {
          setUser(updatedUser);
          sessionStorage.setItem("user", JSON.stringify(updatedUser));
          clearInterval(interval);
        } else if (elapsedTime >= 2400000) {
          intervalTime = 300000; 
          restartPolling();
        } else if (elapsedTime >= 3600000) {
          clearInterval(interval);
        }
      } catch (error) {
        console.error("Error updating user balance:", error);
      }
    };
    const startPolling = () => {
      interval = setInterval(checkBalanceUpdate, intervalTime);
    };
    const restartPolling = () => {
      clearInterval(interval);
      startPolling();
    };
    startPolling();
    return () => clearInterval(interval);
  }, [user]);
  if (loading) return <LoadingPage />;
  if (!user) return null;
  return (
    <Layout>
        <div className="profile-container">
        <h1 className="profile-title">Profile</h1>
        <div className="profile-card">
          <h2 className="profile-card-title">User Information</h2>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
        <div className="profile-card">
          <h2 className="profile-card-title">Balance</h2>
          <p className="balance">{user.balance} KZT</p>
          <button className="btn" onClick={() => navigate("/top-up")}>
            Top Up Balance
          </button>
        </div>
        {user.role === "DEVELOPER" && (
  <div className="profile-card">
    <h2 className="profile-card-title">Subscription Status</h2>
    {user.subscription ? (
      <>
        <p className="subscription-status">
          {user.subscription.isActive
            ? `Active until: ${user.subscription.expiresAt}`
            : "Subscription expired"}
        </p>
        {!user.subscription.isActive && (
          <button className="btn success-btn" onClick={() => navigate("/pricing")}>
            Renew Subscription
          </button>
        )}
        </>
        ) : (
        <>
          <p className="subscription-status">You don't have a subscription yet.</p>
          <button className="btn success-btn" onClick={() => navigate("/pricing")}>
            Get Subscription
          </button>
        </>
        )}
        </div>
        )}
      </div>
    </Layout>
  );
}

export default Profile;