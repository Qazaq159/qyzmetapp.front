// src/pages/TopUp.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loadStripe } from "@stripe/stripe-js";
import {
    Elements,
    CardElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";

import Layout from "../components/Layout";
import { createPaymentIntent } from "../services/paymentService";
import './TopUp.css';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

function TopUpForm() {
    const stripe   = useStripe();
    const elements = useElements();
    const nav      = useNavigate();

    const [amount,  setAmount]  = useState("");
    const [msg,     setMsg]     = useState("");
    const [err,     setErr]     = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const value = Number(amount);
        if (!value || isNaN(value)) {
            setErr("Введите корректную сумму (>0)");
            return;
        }
        if (!stripe || !elements) return;

        try {
            setLoading(true);
            const { client_secret, payment_id } = await createPaymentIntent(value);
            // console.log("DEBUG ⟶ client_secret:", client_secret, "id:", payment_id);

            const { error: stripeErr } = await stripe.confirmCardPayment(client_secret, {
                payment_method: { card: elements.getElement(CardElement) },
            });
            if (stripeErr) throw stripeErr;

            setMsg("Оплата прошла успешно! Баланс скоро обновится.");
            setTimeout(() => nav("/my-profile"), 3500);
        } catch (e) {
            // console.error("DEBUG ⟶", e);
            setErr(e.message ?? "Ошибка");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="top-up-form">
            <label>Amount (KZT):</label>
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="100"
                disabled={loading}
            />

            <label>Card details:</label>
            <CardElement className="card-element" />

            <button className="submit-btn" disabled={!stripe || loading}>
                {loading ? "Processing…" : "Pay"}
            </button>

            {msg && <p className="sucs-message">{msg}</p>}
            {err && <p className="error-message">{err}</p>}
        </form>
    );
}

export default function TopUp() {
    return (
        <Layout>
            <div className="topuppage">
                <div className="top-up-container">
                    <h1 className="top-up-title">Top-up balance</h1>

                    <Elements stripe={stripePromise}>
                        <TopUpForm />
                    </Elements>

                    <a className="history-link" href="/payment-history">
                        View payment history
                    </a>
                </div>
            </div>
        </Layout>
    );
}
