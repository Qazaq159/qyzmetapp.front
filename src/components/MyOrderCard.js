import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteOrder } from "../services/orderService";

const MyOrderCard = ({ order, onOrderDeleted }) => {
    const navigate = useNavigate();
    const handleCardClick = () => {
      navigate(`/my-orders/${order.id}`);
  };
    const [isDeleting, setIsDeleting] = useState(false);
    const handleDelete = async () => {
      if (!window.confirm("Are you sure you want to delete this order?")) return;
      setIsDeleting(true);
      try {
          await deleteOrder(order.id);
          onOrderDeleted(order.id); 
      } catch (error) {
          console.error("Error deleting order:", error);
      } finally {
        setIsDeleting(false);
    }
  };
    const getStatusBadge = () => {
      switch (order.status) {
        case "open":
          return <span className="order-status-badge open">Searching for a Developer</span>;
        case "reviewing":
          return <span className="order-status-badge reviewing">Under Review</span>;
        case "in_progress":
          return <span className="order-status-badge in_progress">In Progress</span>;
        case "completed":
          return <span className="order-status-badge completed">Completed</span>;
        default:
          return null;
      }
    };  
    const renderActions = () => {
        switch (order.status) {
          case "open":
          case "completed":
            return (
              <>
                <button className="order-cancel-btn" onClick={handleDelete} disabled={isDeleting}>
                    {isDeleting ? "Deleting..." : "Delete Order"}
                </button>
              </>
            );
          case "reviewing":
            return (
              <button className="order-complete-btn">Mark as In Progress</button>
            );
          case "in_progress":
            return (
              <button className="order-complete-btn">Mark as Completed</button>
            );
          default:
            return null;
        }
      };
      return (
        <div className="my-order-card" onClick={handleCardClick}>
          <div className="order-card-header">
            <h2 className="order-card-title">{order.title}</h2>
            {getStatusBadge()}
          </div>
          <div className="order-card-content">
            <div className="order-card-info">
              <p className="order-card-label">Budget</p>
              <p className="order-card-value">{order.budget} KZT</p>
            </div>
            <div className="order-card-info">
              <p className="order-card-label">Posted</p>
              <p className="order-card-value">{order.created_at}</p>
            </div>
            <div className="order-card-info">
              <p className="order-card-label">Assigned Developer</p>
              <p className="order-card-value">
                {order.executor?.name || "Not yet assigned"}
              </p>
            </div>
            <div className="order-card-info">
              <p className="order-card-label">Chat</p>
              <p className="order-card-value">
                {order.has_chat ? (
                  <span
                    className="order-chat-link"
                    onClick={() => navigate(`/my-orders/${order.id}`)}
                  >
                    View Messages
                  </span>
                ) : (
                  "No messages yet"
                )}
              </p>
            </div>
          </div>
          <div className="order-card-actions">
            {renderActions()}
          </div>
        </div>
    );
};
export default MyOrderCard;
