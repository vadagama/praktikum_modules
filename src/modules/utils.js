export function handleValidate(event) {
    resetError(event.target);
    validate(event.target);
}

export function validate(element) {
    const errorElement = document.querySelector(`#error-${element.id}`);
    const openProfileButton = profile.querySelector('.popup__button');
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

export function fillProfile() {
    const nameContent = document.querySelector('.user-info__name');
    const aboutContent = document.querySelector('.user-info__job');
    const profile = document.querySelector('.popup_edit-profile');
    const nameTarget = profile.querySelector('.popup__input_type_name');
    const aboutTarget = profile.querySelector('.popup__input_type_link-url');
  
    nameTarget.value = nameContent.innerHTML;
    aboutTarget.value = aboutContent.innerHTML;
  }