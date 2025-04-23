import React, { useState } from "react";
import Modal from "./Modal";

const OrderForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        budget: "",
        deadline: "",
        attached_files: [],
    });
    const [errors, setErrors] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [prepayment, setPrepayment] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const handleFileChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            attached_files: [...e.target.files],
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const budget = parseFloat(formData.budget);
        if (isNaN(budget) || budget < 10000) {
            setErrors({ budget: ["Minimum budget amount should be 10000 KZT"] });
            return;
        }
        setPrepayment(budget * 0.1);
        setModalVisible(true);
    };
    const confirmOrder = async () => {
        setModalVisible(false);
        setIsLoading(true); 
        try {
            await onSubmit(formData);
        } catch (error) {
            setErrors(error.response?.data?.errors || {});
        } finally {
            setIsLoading(false); 
        }
    };
    return (
        <>
        <form className="order-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} required />
                {errors.title && <span className="error">{errors.title[0]}</span>}
            </div>
            <div className="form-group">
                <label>Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} required />
                {errors.description && <span className="error">{errors.description[0]}</span>}
            </div>
            <div className="form-group">
                <label>Budget (KZT)</label>
                <input type="number" name="budget" value={formData.budget} onChange={handleChange} required />
                {errors.budget && <span className="error">{errors.budget[0]}</span>}
            </div>
            <div className="form-group">
                <label>Deadline (days)</label>
                <input type="number" name="deadline" value={formData.deadline} onChange={handleChange} required />
                {errors.deadline && <span className="error">{errors.deadline[0]}</span>}
            </div>
            <div className="form-group">
                <label>Attach Files</label>
                <input type="file" name="attached_files" multiple onChange={handleFileChange} />
                {errors.attached_files && <span className="error">{errors.attached_files[0]}</span>}
            </div>
            <button className="order-submit-btn" type="submit" disabled={isLoading}>
                    {isLoading ? "Processing..." : "Create Order & Pay 10% Prepayment"}
            </button>
        </form>
        {modalVisible && (
            <Modal
                title="Confirm Prepayment"
                message={`You are about to pay ${prepayment} KZT as a prepayment.`}
                onConfirm={confirmOrder}
                onCancel={() => setModalVisible(false)}
                confirmText="Confirm Payment"
                cancelText="Cancel"
            />
        )}
        </>
    );
};
export default OrderForm;