import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCurrentOrder, respondToOrder, rejectOrder } from "../services/orderService";
import OrderCard from "../components/OrderCard";
import "../styles/OrderCard.css";
import Layout from "../components/Layout";
import LoadingPage from "../components/LoadingPage";
import SubscriptionErrorPage from "../components/SubscriptionErrorPage";
import NoOrdersPage from "../components/NoOrdersPage";
import MessageClientModal from "../components/MessageClientModal";

export default function CurrentOrder() {
  const [order, setOrder] = useState(() => {
    const cachedOrder = sessionStorage.getItem("currentOrder");
    if (!cachedOrder) return null;
    const parsedOrder = JSON.parse(cachedOrder);
    const expiresAt = new Date(parsedOrder.expires_at).getTime();
    const now = Date.now();
    if (now > expiresAt) {
      sessionStorage.removeItem("currentOrder");
      return null;
    }
    return parsedOrder;
  });

  const [nextAvailableAt, setNextAvailableAt] = useState(() => {
    const cachedCooldown = sessionStorage.getItem("nextAvailableAt");
    if (!cachedCooldown) return null;
    const [time, date] = cachedCooldown.split(" "); 
    const [day, month, year] = date.split("."); 
    const cooldownTime = new Date(`${year}-${month}-${day}T${time}:00`);
    const now = Date.now();
    if (now > cooldownTime) {
      sessionStorage.removeItem("nextAvailableAt");
      return null;
    }
    return cachedCooldown;
  });

  const [loading, setLoading] = useState(!order && !nextAvailableAt);
  const [errorType, setErrorType] = useState(null);
  const [isRejecting, setIsRejecting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (order || nextAvailableAt) return;
    async function loadOrder() {
      try {
        const response = await fetchCurrentOrder();
        const orderData = response.data;
        setOrder(orderData);
        sessionStorage.setItem("currentOrder", JSON.stringify(orderData));
      } catch (error) {
        if (error.response && error.response.status === 403) {
          const errorData = await error.response.json().catch(() => ({}));
          const { message, next_available_at } = errorData;
          if (message === "cooldown_active") {
            setNextAvailableAt(next_available_at);
            sessionStorage.setItem("nextAvailableAt", next_available_at );
          } else if (message === "subscription_required") {
            setErrorType("subscription");
          }  
        } else if (error.response && error.response.status === 404) {
          setErrorType("no-orders");
        } else {
          setErrorType("unknown");
        }
      } finally {
        setLoading(false);
      }
    }
    loadOrder();
  }, [order, nextAvailableAt]);

  const handleReject = async () => {
    setIsRejecting(true);
      try {
          const data = await rejectOrder(order.id);
          sessionStorage.removeItem("currentOrder");
          const cooldownTime = data.next_available_at;
          sessionStorage.setItem("nextAvailableAt", cooldownTime );
          setNextAvailableAt(cooldownTime);
      } catch (error) {
          console.error("Order rejection error:", error);
      } finally {
        setIsRejecting(false);
      }
  };

  if (loading) return <LoadingPage />;
  if (nextAvailableAt) return <NoOrdersPage nextAvailableAt={nextAvailableAt} />;
  if (errorType === "subscription") return <SubscriptionErrorPage />;
  if (errorType === "no-orders") return <NoOrdersPage />;
  if (errorType === "unknown") return <NoOrdersPage message="An unexpected error occurred." />;

  return (
    <Layout>
      <div className="container">
        <h1>New Order Available</h1>
        <OrderCard order={order} onMessageClient={() => setIsModalOpen(true)} onReject={handleReject} isRejecting={isRejecting}/>
      </div>
      {isModalOpen && <MessageClientModal orderId={order.id} onClose={() => setIsModalOpen(false)} />}
    </Layout>
  );
} 