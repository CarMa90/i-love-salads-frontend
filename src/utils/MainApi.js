const API_URL = import.meta.env.VITE_API_URL;
import { getToken } from "./token";

class Api {
  constructor(options) {
    this.url = options.url;
    this.headers = options.headers;
  }

  printUrl() {
    console.log(this.url);
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
