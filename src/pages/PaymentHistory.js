import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getPayments } from "../services/paymentService";
import './PaymentHistory.css';

export default function PaymentHistory() {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getPayments()
            .then(data => setItems(Array.isArray(data) ? data : data.results ?? []))
            .catch(err => {
                console.error("Ошибка при получении платежей:", err);
                setError("Не удалось загрузить историю платежей.");
            });
    }, []);

    return (
        <Layout>
            <div className="history-page">
                <h2>💳 Payment History</h2>

                {error && <p style={{ color: "red" }}>{error}</p>}
                {items.length === 0 && !error && <p>No payments yet.</p>}

                {items.map((p) => (
                    <div key={p.id} className="history-item">
                        <span>{new Date(p.created_at).toLocaleDateString()}</span>
                        <span>{p.amount} {p.currency}</span>
                        <span className={p.status}>{p.status}</span>
                    </div>
                ))}
            </div>
        </Layout>
    );
}
