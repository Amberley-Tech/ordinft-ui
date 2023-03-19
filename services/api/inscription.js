import { API_URL } from "./constants";

export async function getAllInscriptions(page) {
  return fetch(`${API_URL}/inscriptions/?page=1&limit=${8 * page}`, {
    method: "GET",
  }).then(async (res) => {
    return await res.json();
  });
}
