import React, { useState } from "react";
import OrderForm from "../components/OrderForm";
import { createOrder } from "../services/orderService";
import "../styles/OrderForm.css"
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

const CreateOrder = () => {
    const navigate = useNavigate();
    const [notification, setNotification] = useState(null);
    const handleOrderSubmit = async (formData) => {
        setNotification(null);
        const form = new FormData();
        Object.keys(formData).forEach((key) => {
            if (key === "attached_files") {
                formData.attached_files.forEach((file) => form.append("attached_files[]", file));
            } else {
                form.append(key, formData[key]);
            }
        });
        try {
            await createOrder(form);
            sessionStorage.removeItem("myOrders");
            navigate("/my-orders", { state: { message: "Order created successfully!" } });
        } catch (error) {
            if (error.message === "INSUFFICIENT_FUNDS") {
                setNotification({
                    type: "error",
                    message: `Insufficient funds! Your balance: ${error.current_balance} KZT`,
                    link: "/top-up",
                    linkText: "Top up balance",
                });
            } else {
                setNotification({ type: "error", message: "Error creating order. Please try again." });
            }
        }
    };
    return (
        <Layout>
            <div className="order-page">
                <h1>Create New Order</h1>
                {notification && (
                    <div className={`error-message-notification`}>
                        <span>{notification.message}</span>
                        {notification.link && (
                            <a href={notification.link} className="top-up-link">
                                {notification.linkText}
                            </a>
                        )}
                        <button className="close-btn" onClick={() => setNotification(null)}>✖</button>
                    </div>
                )}
                <OrderForm onSubmit={handleOrderSubmit} />
            </div>
        </Layout>
    );
};
export default CreateOrder;
