class Api {
  constructor(options) {
    this.url = options.url;
    this.headers = options.headers;
  }

  getOrders() {
    // console.log(this.headers);
    return fetch(`${this.url}orders`, { headers: this.headers }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Error: ${res.status}`);
    });
  }

  getNewOrder(data) {
    return fetch(`${this.url}orders`, {
      headers: this.headers,
      body: JSON.stringify({
        products: data.products,
        client: data.client,
        clientId: data.clientId,
        date: data.date,
        time: data.time,
        status: "Enviado",
        mobile: data.mobile,
        cancelMessage: data.cancelMessage,
      }),
      method: "POST",
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Error: ${res.status}`);
    });
  }

  changeOrderStatus(data) {
    return fetch(`${this.url}orders/${data._id}`, {
      headers: this.headers,
      body: JSON.stringify(data),
      method: "PUT",
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Error: ${res.status}`);
    });
  }
}

export const api = new Api({
  url: "https://6a88dfcf7b483fa21fe94285.mockapi.io/api/v1/",
  headers: {
    "content-type": "application/json",
  },
});
