import {isEscapeKey} from './utils.js';
import {pristine} from './check-hashtags.js';
import {sendData} from './api.js';
import {showSuccessFormMessage, showErrorFormMessage} from './messages.js';
import { resetEffects } from './effects.js';

const DEFAULT_SCALE = 100;
const DEFAULT_TRANSFORM = 1;

const Scale = {
  STEP: 25,
  MIN: 25,
  MAX: 100
};

const form = document.querySelector('.img-upload__form');
const uploadSubmitButton = document.querySelector('.img-upload__submit');
const fileUpload = document.querySelector('.img-upload__input');
const editPhoto = document.querySelector('.img-upload__overlay');
const cancelUploadImg = document.querySelector('.img-upload__cancel');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const previewImg = document.querySelector('.img-upload__preview');

let scaleValue = DEFAULT_SCALE;

const resetForm = () => {
  resetEffects();
  form.reset();
  previewImg.style.transform = `scale(${DEFAULT_TRANSFORM})`;
  scaleControlValue.value = `${DEFAULT_SCALE}%`;
  fileUpload.value = '';
};

const closeEditPhoto = () => {
  editPhoto.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentEscapeKeydown);
};

function onDocumentEscapeKeydown (evt) {
  if (isEscapeKey(evt) &&
      !evt.target.classList.contains('text__hashtags') &&
      !evt.target.classList.contains('text__description') &&
      !document.querySelector('.error') &&
      !document.querySelector('.success')) {
    closeEditPhoto();
    resetForm();
  }
}

const onCancelUploadImgClick = () => {
  closeEditPhoto();
  resetForm();
};

const onFileUploadChange = () => {
  editPhoto.classList.remove('hidden');
  document.body.classList.add('modal-open');
  cancelUploadImg.addEventListener('click', onCancelUploadImgClick);
  document.addEventListener('keydown', onDocumentEscapeKeydown);
};

fileUpload.addEventListener('change', onFileUploadChange);

const changeScale = (factor = 1) => {
  scaleValue = parseInt(scaleControlValue.value, 10) + (Scale.STEP * factor);

  if (scaleValue < Scale.MIN) {
    scaleValue = Scale.MIN;
  }

  if (scaleValue > Scale.MAX) {
    scaleValue = Scale.MAX;
  }

  previewImg.style.transform = `scale(${scaleValue / 100})`;
  scaleControlValue.value = `${scaleValue}%`;
};

const onScaleSmallerClick = () => {
  changeScale(-1);
};

const onScaleBiggerClick = () => {
  changeScale();
};

scaleControlSmaller.addEventListener('click', onScaleSmallerClick);
scaleControlBigger.addEventListener('click', onScaleBiggerClick);

const buttonSubmitIsDisabled = () => {
  uploadSubmitButton.disabled = !uploadSubmitButton.disabled;
};

const sendForm = async () => {
  buttonSubmitIsDisabled();

  if (!pristine.validate()) {
    return;
  }

  try {
    await sendData(new FormData(form));
    resetForm();
    closeEditPhoto();
    showSuccessFormMessage();
  } catch (error) {
    showErrorFormMessage();
  } finally {
    buttonSubmitIsDisabled();
  }
};

const onFormSubmit = async (evt) => {
  evt.preventDefault();
  sendForm();
};

form.addEventListener('submit', onFormSubmit);
