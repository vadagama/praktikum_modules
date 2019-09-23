import "./index.css"

const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort2' : 'https://praktikum.tk/cohort2'

class Api {
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
    console.log(name);
    console.log(link);
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
        console.log(cards);
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

const CONFIG = {
  baseUrl: serverUrl,
  token: '7d5e7e3f-04b5-4500-97a5-c163428b8ef3'
};
const CARD_PLACE = document.querySelector('.places-list');

const api = new Api(CONFIG);


/* Классы */

class Card {
  constructor(item) {
    this.name = item.name;
    this.link = item.link;
    this.cardElement = this.create();
    this.like = this.like.bind(this);
    this.remove = this.remove.bind(this);
    this.handleCardEvent = this.handleCardEvent.bind(this);
    this.cardElement.addEventListener('click', this.handleCardEvent);
  }
  create() {
    const placeCard = document.createElement('div');
    placeCard.classList.add('place-card');

    const placeCardImage = document.createElement('div');
    placeCardImage.classList.add('place-card__image');
    const imageLink = `background-image: url(${this.link})`;
    placeCardImage.setAttribute('style', imageLink);

    const placeCardDeleteIcon = document.createElement('div');
    placeCardDeleteIcon.classList.add('place-card__delete-icon');

    const placeCardDescription = document.createElement('div');
    placeCardDescription.classList.add('place-card__description');

    const placeCardName = document.createElement('h3');
    placeCardName.classList.add('place-card__name');
    placeCardName.textContent = this.name;

    const placeCardLikeIcon = document.createElement('button');
    placeCardLikeIcon.classList.add('place-card__like-icon');

    placeCard.appendChild(placeCardImage);
    placeCardImage.appendChild(placeCardDeleteIcon);
    placeCard.appendChild(placeCardDescription);
    placeCardDescription.appendChild(placeCardName);
    placeCardDescription.appendChild(placeCardLikeIcon);
    return placeCard;
  }

  handleCardEvent(event) {
    const _event = event;

    if (event.target.classList.contains('place-card__delete-icon')) {
      this.remove(_event);
    }
    if (event.target.classList.contains('place-card__like-icon')) {
      this.like(_event);
    }
    if (event.target.classList.contains('place-card__image')) {
      openPhotoPopup.open(event);
    }
  }

  remove(event) {
    event.target.closest('.places-list').removeChild(event.target.closest('.place-card'));
  }

  like(event) {
    event.target.classList.toggle('place-card__like-icon_liked');

  }
}

class CardList {
  constructor(container, array) {
    this.container = container;
    this.array = array;
    this.render()
    this.renderCards = this.renderCards.bind(this);
    api.getCards(this.renderCards)
  }

  renderCards(array) {
    if (array) {
      array.forEach(function (item) {
        this.addCard(item);
      }, this);
    }
  }


  addCard(item) {
    const card = new Card(item);
    this.container.appendChild(card.cardElement);
    this.container.querySelectorAll('.place-card');
    const popup = document.querySelector('.popup');
    popup.classList.remove('popup_is-opened');
    const openPopupButton = document.querySelector('.popup__button');
    openPopupButton.setAttribute('disabled', true);
    openPopupButton.classList.add('popup__button_disabled');
  }

  render() {
    if (this.array) {
      this.array.forEach(function (item) {
        this.addCard(item);
      }, this);
    }
  }

}

class Popup {
  open(element) {
    if (element.target.id === 'open_card') {
      const popup = document.querySelector('.popup');
      popup.classList.add('popup_is-opened');
    } else if (element.target.id === 'open_profile') {
      const popup = document.querySelector('.popup_edit-profile');
      popup.classList.add('popup_is-opened');
      fillProfile();
      validate(profile_name);
      validate(profile_about);
    } else if (element.target.classList.value === 'place-card__image') {
      const url = element.target.getAttribute('style').slice(22, -1);
      const popup = document.querySelector('.popup_open-photo');
      const photo = popup.querySelector('.popup_open-photo__image');
      popup.classList.add('popup_is-opened');
      photo.setAttribute('src', url);
    }
  }
  close(element) {
    if ((element.target.id === 'close_card') || (element.id === 'close_card_button')) {
      const popup = document.querySelector('.popup');
      popup.classList.remove('popup_is-opened');
    } else if ((element.target.id === 'close_profile') || (element.id === 'close_profile_button')) {
      const popup = document.querySelector('.popup_edit-profile');
      popup.classList.remove('popup_is-opened');
    } else if (element.target.id === 'close_photo') {
      const popup = document.querySelector('.popup_open-photo');
      popup.classList.remove('popup_is-opened');
    }
  }
}

/* Определение переменных */



const cardList = new CardList(CARD_PLACE, '');
const newCardPopup = new Popup(document.querySelector('.popup_create-card'));
const editProfilePopup = new Popup(document.querySelector('.popup_edit-profile'));
const openPhotoPopup = new Popup(document.querySelector('.popup_open-photo'));

const userInfoButton = document.querySelector('.user-info__button');
const openPopupButton = document.querySelector('.popup__button');
const closePopupButton = document.querySelector('.popup__close');
const form = document.forms.new; // получаем форму
const name = form.elements.name; // получаем название
const link = form.elements.link; //получаем URL картинки
const userProfileButton = document.querySelector('.user-info__edit');
const profile = document.querySelector('.popup_edit-profile');
const openProfileButton = profile.querySelector('.popup__button');
const closeProfileButton = profile.querySelector('.popup__close');
const profile_form = document.forms.profile; // получаем форму профиля
const profile_name = profile_form.elements.profile_name; // получаем имя
const profile_about = profile_form.elements.profile_about; //получаем доп. информацию
const photo = document.querySelector('.popup_open-photo');
const closePhotoButton = photo.querySelector('.popup__close');


/* Заполнение полей профиля */

function fillProfile() {
  const name_content = document.querySelector('.user-info__name');
  const about_content = document.querySelector('.user-info__job');
  const name_target = profile.querySelector('.popup__input_type_name');
  const about_target = profile.querySelector('.popup__input_type_link-url');

  name_target.value = name_content.innerHTML;
  about_target.value = about_content.innerHTML;
}

/* Рендер профиля */

api.getUserProfile(renderProfile);

function renderProfile(element) {
  const name_placeholder = document.querySelector('.user-info__name');
  const about_placeholder = document.querySelector('.user-info__job');

  name_placeholder.textContent = element.name;
  about_placeholder.textContent = element.about;
  const popup = document.querySelector('.popup_edit-profile');
  popup_button = popup.querySelector('.popup__button');
  popup.classList.remove('popup_is-opened');
}


/*  Валидация форм */

function handleValidate(event) {
  resetError(event.target);
  validate(event.target);
}

function validate(element) {
  const errorElement = document.querySelector(`#error-${element.id}`);
  if (!element.checkValidity()) {
    errorElement.textContent = element.validationMessage;
    activateError(errorElement);
    errorElement.textContent = 'Это обязательное поле!';
    openProfileButton.setAttribute('disabled', true);
    openProfileButton.classList.add('popup__button_disabled');
    return false
  } else if ((element.value.length < 2) || (element.value.length > 30)) {
    errorElement.textContent = element.validationMessage;
    activateError(errorElement);
    const errorMessage = 'Должно быть от 2 до 30 символов!';
    errorElement.textContent = errorMessage;
    openProfileButton.setAttribute('disabled', true);
    openProfileButton.classList.add('popup__button_disabled');
    return false
  } else {
    resetError(errorElement);
    return false
  }
}

function activateError(element) {
  element.parentNode.classList.add('input-container__invalid');
}

function resetError(element) {
  element.parentNode.classList.remove('input-container__invalid');
  element.textContent = '';
}

/* Обработчики событий */

// Обработчик события ввода значений в форму
form.addEventListener('input', function () {

  if (name.value.length === 0 || link.value.length === 0) {
    openPopupButton.setAttribute('disabled', true);
    openPopupButton.classList.add('popup__button_disabled');
  } else {
    openPopupButton.removeAttribute('disabled');
    openPopupButton.classList.remove('popup__button_disabled');
  }
});

form.addEventListener('submit', function (event) {
  event.preventDefault();
  const card = {
    name: form.elements.name.value,
    link: form.elements.link.value
  };
  api.postNewCard(form.elements.name.value, form.elements.link.value);
  cardList.addCard(card);
});

// Обработчик события ввода значений в форму
profile_form.addEventListener('input', function () {

  if (profile_name.value.length === 0 || profile_about.value.length === 0) {
    openProfileButton.setAttribute('disabled', true);
    openProfileButton.classList.add('popup__button_disabled');
  } else {
    openProfileButton.removeAttribute('disabled');
    openProfileButton.classList.remove('popup__button_disabled');
  }
});

profile_form.addEventListener('submit', function () {
  api.editUserProfile({
    name: event.currentTarget.profile_name.value,
    about: event.currentTarget.profile_about.value
  });
  renderProfile(profile);
  event.preventDefault();
});

profile_form.addEventListener('input', handleValidate);
userInfoButton.addEventListener('click', newCardPopup.open);
closePopupButton.addEventListener('click', newCardPopup.close);
closePhotoButton.addEventListener('click', openPhotoPopup.close);
userProfileButton.addEventListener('click', editProfilePopup.open);
closeProfileButton.addEventListener('click', editProfilePopup.close);