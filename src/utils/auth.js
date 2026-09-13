export const API_URL = import.meta.env.VITE_API_URL;

export const register = ({
  email,
  name,
  mobile,
  password,
  userType = "client",
}) => {
  return fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email, name, mobile, userType }),
  }).then(async (res) => {
    if (res.ok) {
      return res.json();
    }

    const error = await res.json();
    return Promise.reject(error);
  });
};

export const authorize = ({ password, email }) => {
  return fetch(`${API_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  }).then(async (res) => {
    if (res.ok) {
      return res.json();
    }

    const error = await res.json();
    return Promise.reject(error);
  });
};

export const tokenValidation = (token) => {
  return fetch(`${API_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(async (res) => {
    if (res.ok) {
      return res.json();
    }

    const error = await res.json();
    return Promise.reject(error);
  });
};
