import { renderProfile } from "../index";
export default class Api {
    constructor(data) {
      this.url = data.baseUrl,
        this.token = data.token
    }
  
    getResponseData(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  
    getCards(callback) {
      return fetch(`${this.url}/cards`, {
          method: 'GET',
          headers: {
            authorization: this.token,
            'Content-Type': 'application/json'
          }
        })
        .then(res => {
          return this.getResponseData(res)
        })
        .then((cards) => {
          callback(cards)
  
        })
        .catch(err => console.log(err));
    }
  
    postNewCard(name, link) {
      fetch(`${this.url}/cards`, {
          method: 'POST',
          body: JSON.stringify({
            name: name,
            link: link
          }),
          headers: {
            authorization: this.token,
            "Content-type": "application/json"
          }
        })
        .then(res => {
          return this.getResponseData(res)
        })
        .then((cards) => {
        })
        .catch(err => console.log(err));
    }
  
    getUserProfile(callback) {
      return fetch(`${this.url}/users/me`, {
          method: 'GET',
          headers: {
            authorization: this.token,
            'Content-Type': 'application/json'
          }
        })
        .then(res => {
          return this.getResponseData(res)
        })
        .then((userData) => {
          callback(userData)
        })
        .catch(err => console.log(err));
    }
  
    editUserProfile(data) {
      fetch(`${this.url}/users/me`, {
          body: JSON.stringify({
            name: data.name,
            about: data.about,
          }),
          method: 'PATCH',
          headers: {
            authorization: this.token,
            'Content-Type': 'application/json'
          }
        })
        .then(res => {
          return this.getResponseData(res)
        })
        .then((userData) => {
          renderProfile(userData);
  
        })
        .catch(err => console.log(err));
    }
  }