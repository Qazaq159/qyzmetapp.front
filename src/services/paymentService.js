
import api from "./api";

export const createPaymentIntent = (amount) =>
    api
        .post("payments/create-intent/", { json: { amount } })
        .json();

export const getPayments = () => api.get("payments").json();
