import Popup from "./popup.js"
export default class Card {
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
      const openPhotoPopup = new Popup(document.querySelector('.popup_open-photo'));
  
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