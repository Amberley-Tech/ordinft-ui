export async function fetchBtcFeeRates() {
  return fetch(`https://mempool.space/api/v1/fees/recommended`, {
    method: "GET",
  }).then(async (res) => {
    const data = await res.json();
    return data;
  });
}

export async function fetchLtcFeeRates() {
  return fetch(`https://api.blockcypher.com/v1/ltc/main`, {
    method: "GET",
  }).then(async (res) => {
    const data = await res.json();
    return data;
  });
}
