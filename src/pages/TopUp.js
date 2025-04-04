import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { topUpBalance } from "../services/userService";
import "../styles/TopUp.css"

function TopUp() {
    const [amount, setAmount] = useState("");
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef(null); 
    const navigate = useNavigate();
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        setMessage("Top-up request sent. Balance update within an hour.");
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage("");
        setError("");
        if (!amount || !file) {
            setError("Please enter the amount and upload the payment proof.");
            return;
        }
        setIsLoading(true);
        try {
            await topUpBalance(amount, file);
            setMessage("Top-up request sent. Balance update within an hour.");
            setTimeout(() => navigate("/my-profile"), 4000);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <Layout>
            <div className="topuppage">
                <div className="top-up-container">
                    <h1 className="top-up-title">Top Up Balance via Kaspi</h1>
                    <p className="instruction">Transfer the required amount, then upload the receipt:</p>
                    <div className="payment-details">
                        <p>📌 Send money to this number:</p>
                        <h2 className="kaspi-number">+7 706 647 73 44</h2>
                    </div>
                    <form onSubmit={handleSubmit} className="top-up-form">
                        <label>Transfer Amount (KZT):</label>
                        <input 
                            type="number" 
                            value={amount} 
                            onChange={(e) => setAmount(e.target.value)} 
                            placeholder="Enter amount" 
                            required 
                            disabled={isLoading}
                        />
                        <label>Payment Confirmation (Receipt):</label>
                        <input 
                            type="file" 
                            accept=".pdf, .jpg, .jpeg, .png" 
                            onChange={handleFileChange} 
                            required 
                            className="file-input" 
                            ref={fileInputRef} 
                            disabled={isLoading}
                        />
                        <button type="submit" className="submit-btn" disabled={isLoading}>
                            {isLoading ? "Processing..." : "Submit"}
                        </button>
                    </form>
                    {message && <p className="sucs-message">{message}</p>}
                    {error && <p className="error-message">{error}</p>}
                </div>
            </div>
        </Layout>
    );
}
export default TopUp;
  