import {isEscapeKey} from './utils.js';

const DELAY_REMOVE_MESSAGE = 5000;

const templateDataError = document.querySelector('#data-error').content.querySelector('.data-error');
const elementSuccessMessage = document.querySelector('#success').content.querySelector('.success');
const elementErrorMessage = document.querySelector('#error').content.querySelector('.error');

const showAlertError = () => {
  const errorMessage = templateDataError.cloneNode(true);
  document.body.append(errorMessage);
  setTimeout(() => errorMessage.remove(), DELAY_REMOVE_MESSAGE);
};

const onCloseButtonClick = () => {
  hideMessage();
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    hideMessage();
  }
};

const onBodyClick = (evt) => {
  if (!evt.target.closest('.success__inner') && !evt.target.closest('.error__inner')) {
    hideMessage();
  }
};

const showMessage = (element, classButton) => {
  document.body.append(element);
  document.addEventListener('keydown', onDocumentKeydown);
  document.body.addEventListener('click', onBodyClick);
  element
    .querySelector(classButton)
    .addEventListener('click', onCloseButtonClick);
};

const showSuccessFormMessage = () => {
  showMessage(elementSuccessMessage, '.success__button');
};

const showErrorFormMessage = () => {
  showMessage(elementErrorMessage, '.error__button');
};

function hideMessage () {
  const element = document.querySelector('.success') || document.querySelector('.error');
  element.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  document.body.removeEventListener('click', onBodyClick);
}

export {showAlertError, showSuccessFormMessage, showErrorFormMessage};
