import {validate, fillProfile} from './utils.js'

export default class Popup {
    open(element) {
      if (element.target.id === 'open_card') {
        const popup = document.querySelector('.popup');
        popup.classList.add('popup_is-opened');
      } else if (element.target.id === 'open_profile') {
        const popup = document.querySelector('.popup_edit-profile');
        const profileForm = document.forms.profile; // получаем форму профиля
        const profileName = profileForm.elements.profileName; // получаем имя
        const profileAbout = profileForm.elements.profileAbout; //получаем доп. информацию
        popup.classList.add('popup_is-opened');
        fillProfile();
        validate(profileName);
        validate(profileAbout);
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