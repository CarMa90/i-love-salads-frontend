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
        return Promise.reject(`Error: ${res.status}`);
      },
    );
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
