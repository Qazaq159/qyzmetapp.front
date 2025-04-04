import React from "react";
import { LoaderCircle } from "lucide-react";

const OrderCard = ({ order, onMessageClient, onReject, isRejecting }) => {
  return (
    <div className="order-card">
      <h2>{order.title}</h2>
      <p>{order.description}</p>

      <div className="order-meta">
        <span className="badge badge-budget">Budget: {order.budget} KZT</span>
        <span className="badge badge-deadline">Deadline: {order.deadline} days</span>
      </div>

      <p><strong>Client:</strong> {order.customer.name}</p>
      <p><strong>Posted:</strong> {order.created_at}</p>

      {order.attached_files && order.attached_files.length > 0 && (
        <div className="attached-files">
          <strong>Attached Files:</strong>
          {order.attached_files.map((fileUrl, index) => {
            const fileName = fileUrl.split("/").pop();
            return (
              <a key={index} href={fileUrl} target="_blank" rel="noopener noreferrer" className="file-link">
                {fileName}
              </a>
            );
          })}
        </div>
      )}

      <div className="order-actions">
          <button className="accept-btn" onClick={onMessageClient}>Message Client</button>
          <button className="reject-btn" onClick={onReject} disabled={isRejecting}>
              {isRejecting ? <LoaderCircle className="btn-spinner" /> : "Skip Order"}
          </button>
      </div>
    </div>
  );
};

export default OrderCard;
