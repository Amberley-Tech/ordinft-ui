import { API_URL } from "./constants";

export async function createOrder(payload) {
  return fetch(`${API_URL}/orders/create`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (res) => {
    const data = await res.json();
    return data;
  });
}

export async function fetchAllOrders(token) {
  return fetch(`${API_URL}/orders`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  }).then(async (res) => {
    const data = await res.json();
    return data;
  });
}

export async function fetchOneOrder(id, token) {
  return fetch(`${API_URL}/orders/${id}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  }).then(async (res) => {
    const data = await res.json();
    return data;
  });
}

export async function fetchPaymentStatus(orderId) {
  return fetch(`${API_URL}/invoices/${orderId}`, {
    method: "GET",
  }).then(async (res) => {
    const data = await res.json();
    return data;
  });
}

export async function uploadAndProcessFiles(formData) {
  return fetch(`${API_URL}/images/process`, {
    method: "POST",
    body: formData,
  }).then(async (res) => {
    const data = await res.json();
    return data;
  });
}
