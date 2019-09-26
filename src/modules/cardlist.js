import Card from './card.js'

export default class CardList {
    constructor(api, container, array) {
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