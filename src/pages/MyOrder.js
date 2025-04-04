import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchOrderDetails, updateOrderStatus, deleteOrder } from "../services/orderService";
import "../styles/MyOrder.css";
import Layout from "../components/Layout";
import { Download, CheckCircle, XCircle, Trash } from "lucide-react";
import LoadingPage from "../components/LoadingPage";
import ChatPreview from "../components/ChatPreview";

const MyOrder = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [updatingStatus, setStatusUpdating] = useState(null);

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const data = await fetchOrderDetails(orderId);
        setOrder(data);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };
    loadOrder();
  }, [orderId]);

  const handleStatusChange = async (newStatus) => {
    setStatusUpdating(newStatus);
    try {
      const updatedOrder = await updateOrderStatus(orderId, newStatus);
      setOrder(updatedOrder.data);
      sessionStorage.removeItem("myOrders");
    } catch (error) {
      console.error("Error updating order status:", error);
    } finally {
      setStatusUpdating(null);
    }
  };
  const handleDeleteOrder = async () => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      setStatusUpdating("delete");
      await deleteOrder(orderId);
      sessionStorage.removeItem("myOrders");
      navigate("/orders");
    } catch (error) {
      alert("Error deleting the order. Please try again.");
    } finally {
      setStatusUpdating(null);
    }
  };
  if (!order) return <LoadingPage />;
  return (
    <Layout>
      <div className="my-order-page">
      <div className="order-container">
        <div className="order-details-section">
          <div className="order-details-header">
            <h1 className="order-title">{order.title}</h1>
            <span className={`order-status-badge ${order.status.toLowerCase()}`}>
              {order.status}
            </span>
          </div>
          <div className="order-details">
          <h4 className="order-description-title">Description</h4>
            <p className="order-description">{order.description}</p>
            <div className="order-info-grid">
            <div className="order-info-item">
                <p className="order-info-label">Budget</p>
                <p className="order-info-value">{order.budget} KZT</p>
            </div>
            <div className="order-info-item">
                <p className="order-info-label">Posted</p>
                <p className="order-info-value">{order.created_at}</p>
            </div>
            <div className="order-info-item">
                <p className="order-info-label">Deadline</p>
                <p className="order-info-value">{order.deadline} days</p>
            </div>
            <div className="order-info-item">
                <p className="order-info-label">Status</p>
                <p className="order-info-value">{order.status}</p>
            </div>
            </div>
            {order.attached_files?.length > 0 && (
            <div className="order-files">
                <h4>Attached Files</h4>
                <ul>
                {order.attached_files.map((fileUrl, index) => {
                    const fileName = fileUrl.split('/').pop();
                    return (
                    <li key={index}>
                        <a href={fileUrl} target="_blank" download className="order-file-link">
                        <Download size={18} /> {fileName}
                        </a>
                    </li>
                    );
                })}
                </ul>
            </div>
            )}
          </div>
        </div>
        <div className="order-status-section">
          <h2>Order Status</h2>
          <div className="status-change">Change Status:</div>
          <div className="status-buttons">
          <button 
            className="order-action-button" 
            onClick={() => handleStatusChange("in_progress")} 
            disabled={updatingStatus !== null}
          >
            {updatingStatus === "in_progress" ? "Updating..." : <><CheckCircle size={20} /> Mark as In Progress</>}
          </button>
          <button 
            className="order-action-button" 
            onClick={() => handleStatusChange("completed")} 
            disabled={updatingStatus !== null}
          >
            {updatingStatus === "completed" ? "Updating..." : <><CheckCircle size={20} /> Mark as Completed</>}
          </button>
          <button 
            className="order-action-button" 
            onClick={() => handleStatusChange("open")} 
            disabled={updatingStatus !== null}
          >
            {updatingStatus === "open" ? "Updating..." : <><XCircle size={20} /> Search for Another Developer</>}
          </button>
          </div>
          <hr className="divider" />
          <h3>Order Actions</h3>
          <button 
            className="order-action-button delete-order" 
            onClick={handleDeleteOrder} 
            disabled={updatingStatus !== null}
          >
            {updatingStatus === "delete" ? "Deleting..." : <><Trash size={18} /> Delete Order</>}
          </button>
        </div>
      </div>
      {order.executor && (
        <div className="order-executor-section">
          <h3 className="assigned">Assigned Developer Messages:</h3>
          {order.chat ? (
            <ChatPreview chat={order.chat} onClick={() => navigate(`/chats/${order.id}`)} />
          ) : (
            <p className="no-mess">No messages yet</p>
          )}
        </div>
      )}
      </div>  
    </Layout>
  );
};
export default MyOrder;
