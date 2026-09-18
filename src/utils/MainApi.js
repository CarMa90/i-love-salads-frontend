const API_URL = import.meta.env.VITE_API_URL;
import { getToken } from "./token";

class Api {
  constructor(options) {
    this.url = options.url;
    this.headers = options.headers;
  }

  getHeaders() {
    const token = getToken();

    return {
      ...this.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  getUserInfo() {
    return fetch(`${this.url}/users/me`, { headers: this.getHeaders() }).then(
      (res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then((err) => Promise.reject(err));
      },
    );
  }

  createOrder(data) {
    return fetch(`${this.url}/orders`, {
      headers: this.getHeaders(),
      method: "POST",
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return res.json().then((err) => Promise.reject(err));
    });
  }

  getOrders() {
    // console.log(this.headers);
    return fetch(`${this.url}/orders`, { headers: this.getHeaders() }).then(
      (res) => {
        if (res.ok) {
          return res.json();
        }

        return res.json().then((err) => Promise.reject(err));
      },
    );
  }

  changeOrderStatus(data) {
    return fetch(`${this.url}/orders/${data._id}/status`, {
      headers: this.getHeaders(),
      body: JSON.stringify({ status: data.status }),
      method: "PUT",
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return res.json().then((err) => Promise.reject(err));
    });
  }

  cancelOrder(data) {
    return fetch(`${this.url}/orders/${data._id}/cancel`, {
      headers: this.getHeaders(),
      method: "PUT",
      body: JSON.stringify({ message: data.message }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return res.json().then((err) => Promise.reject(err));
    });
  }

  acceptCancelation(data) {
    return fetch(`${this.url}/orders/${data}/cancel/acceptance`, {
      headers: this.getHeaders(),
      method: "PUT",
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return res.json().then((err) => Promise.reject(err));
    });
  }
}

const token = getToken();

export const mainApi = new Api({
  url: API_URL,
  headers: {
    // Authorization: "288e77e1-cc55-482e-83a6-7664a6a338f5",
    Authorization: `Bearer ${token}`,
    "content-type": "application/json",
  },
});
