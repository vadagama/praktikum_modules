import "./index.css"
import Api from "./modules/api.js"
import CardList from "./modules/cardlist.js"
import Popup from "./modules/popup.js"
import handleValidate from "./modules/utils.js"
/* import {handleValidate, validate} from "./modules/utils.js" */

const NODE_ENV = '';
const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort2' : 'https://praktikum.tk/cohort2'

const CONFIG = {
  baseUrl: serverUrl,
  token: '7d5e7e3f-04b5-4500-97a5-c163428b8ef3'
};
const CARD_PLACE = document.querySelector('.places-list');
const api = new Api(CONFIG);

/* Классы */



/* Определение переменных */



const cardList = new CardList(api,CARD_PLACE, '');
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