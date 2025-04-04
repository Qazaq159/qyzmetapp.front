import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchMyOrders } from "../services/orderService";
import MyOrderCard from "../components/MyOrderCard";
import Notification from "../components/Notification";
import "../styles/MyOrders.css";
import Layout from "../components/Layout";
import LoadingPage from "../components/LoadingPage";

export default function MyOrders() {
  const [notification, setNotification] = useState(null);
  const [orders, setOrders] = useState(() => {
    const cachedOrders = sessionStorage.getItem("myOrders");
    return cachedOrders ? JSON.parse(cachedOrders) : [];
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    async function loadOrders() {
      try {
        const data = await fetchMyOrders();
        setOrders(data);
        sessionStorage.setItem("myOrders", JSON.stringify(data));
      } catch (error) {
        setNotification({ type: "error-not", message: "Failed to load orders. Please try again later." });
      } finally {
        setLoading(false);
      }
    }
    loadOrders();
    if (location.state?.message) {
        setNotification({ type: "success", message: location.state.message });
        setTimeout(() => {
            setNotification(null);
            navigate(".", { replace: true, state: {} });
        }, 3000);
    }
  }, [location.state, navigate]);

  const handleOrderDeleted = (orderId) => {
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
  };
  if (loading) return <LoadingPage />;
  return (
    <Layout>
        <div className="my-orders-container">
            {notification && <Notification {...notification} onClose={() => setNotification(null)} />}
            <div className="my-orders-header">
                <h1>My Orders</h1>
                <button className="my-orders-btn" onClick={() => navigate("/create-order")}>
                    + Create New Order
                </button>
            </div>
            {orders.length === 0 ? (
                <p className="no-orders-text">No orders available.</p>
            ) : (
                orders.map((order) => <MyOrderCard key={order.id} order={order} onOrderDeleted={handleOrderDeleted} />)
            )}
        </div>
    </Layout>
  );
}
