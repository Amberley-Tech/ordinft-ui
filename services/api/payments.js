import { API_URL } from "./constants";

export async function fetchCurrencyEstimates({ from, to, amount, token }) {
  return fetch(`${API_URL}/payments/currency_estimates`, {
    method: "POST",
    body: JSON.stringify({
      amount,
      currency_from: from,
      currency_to: to,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then(async (res) => {
    const data = await res.json();
    if (data.success) {
      return data.estimates;
    }
    return 0;
  });
}

export async function fetchMinimumPaymentAmount({
  currency_from,
  currency_to,
  fiat_equivalent,
  token,
}) {
  return fetch(`${API_URL}/payments/minimum_payment_amount`, {
    method: "POST",
    body: JSON.stringify({
      currency_from,
      currency_to,
      fiat_equivalent,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then(async (res) => {
    const data = await res.json();
    return data;
  });
}
