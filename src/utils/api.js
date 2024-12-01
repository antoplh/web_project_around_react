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
  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: this._headers,
    }).then(this._handleResponse);
  }
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
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

  setUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }
  getUserInfo() {
    return this.get("users/me"); // Endpoint 'users/me' para obtener los datos del usuario
  }
  getCards() {
    return this.get("cards");
  }
  setUserAvatar(data) {
    return this.patch("users/me/avatar", { avatar: data.avatar });
  }
}

const api = new Api({
  address: "https://around.nomoreparties.co",
  groupId: `web-es-cohort-16`,
  token: `3affd1de-5700-4699-bd1e-708179068d5e`,
});

export default api;
