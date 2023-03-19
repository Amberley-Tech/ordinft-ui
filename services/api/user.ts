import { API_URL } from "./constants";

export async function login(email: string, password: string) {
  return fetch(`${API_URL}/login`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function register(name: string, email: string, password: string) {
  return fetch(`${API_URL}/signup`, {
    method: "POST",
    body: JSON.stringify({
      name,
      email,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function changePassword(
  password: string,
  token: string
): Promise<UserResponse> {
  return fetch(`${API_URL}/changepassword`, {
    method: "POST",
    body: JSON.stringify({
      password,
    }),
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  }).then(async (res) => {
    return await res.json();
  });
}

export async function forgotPassword(
  email: string
): Promise<ForgotPasswordResponse> {
  return fetch(`${API_URL}/forgotpassword`, {
    method: "POST",
    body: JSON.stringify({
      email,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (res) => {
    return await res.json();
  });
}

export async function resetPassword(
  password: string,
  token: string
): Promise<UserResponse> {
  return fetch(`${API_URL}/resetpassword/${token}`, {
    method: "POST",
    body: JSON.stringify({
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (res) => {
    return await res.json();
  });
}

export async function userSupport(
  message: string,
  token: string
): Promise<ForgotPasswordResponse> {
  return fetch(`${API_URL}/usersupport`, {
    method: "POST",
    body: JSON.stringify({
      message,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then(async (res) => {
    return await res.json();
  });
}

export async function verifyUser(token: string): Promise<UserResponse> {
  return fetch(`${API_URL}/verify/${token}`, {
    method: "GET",
  }).then(async (res) => {
    return await res.json();
  });
}

export async function resendVerification(token: string): Promise<UserResponse> {
  return fetch(`${API_URL}/resendverification`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  }).then(async (res) => {
    return await res.json();
  });
}

export async function getUser(token: string): Promise<UserResponse> {
  return fetch(`${API_URL}/user`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  }).then(async (res) => {
    return await res.json();
  });
}

export async function logout() {
  return fetch(`${API_URL}/logout`);
}
