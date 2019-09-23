/*  Валидация форм */

export function handleValidate(event) {
    resetError(event.target);
    validate(event.target);
}

export function validate(element) {
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

export function activateError(element) {
    element.parentNode.classList.add('input-container__invalid');
}

export function resetError(element) {
    element.parentNode.classList.remove('input-container__invalid');
    element.textContent = '';
}