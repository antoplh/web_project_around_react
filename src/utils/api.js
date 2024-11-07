class Api {
  constructor(options) {
    this._baseUrl = `${options.address}/v1/${options.groupId}`;
    this._headers = { authorization: options.token };
  }
  _checkResponse(response) {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(`Error: ${response.status}.`);
    }
  }
  get(endpoint) {
    return fetch(`${this._baseUrl}/${endpoint}`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }
  patch(endpoint, body) {
    return fetch(`${this._baseUrl}/${endpoint}`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((res) => this._checkResponse(res));
  }
  post(endpoint, body) {
    return fetch(`${this._baseUrl}/${endpoint}`, {
      method: "POST",
      headers: {
        ...this._headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((res) => this._checkResponse(res));
  }
  delete(endpoint) {
    return fetch(`${this._baseUrl}/${endpoint}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }
  put(endpoint) {
    return fetch(`${this._baseUrl}/${endpoint}`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }
}

const api = new Api({
  address: "https://around.nomoreparties.co",
  groupId: `web-es-cohort-16`,
  token: `3affd1de-5700-4699-bd1e-708179068d5e`,
});

export default api;
