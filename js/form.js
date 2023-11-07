import {isEscapeKey} from './utils.js';

const Scale = {
  STEP: 25,
  MIN: 25,
  MAX: 100
};

const fileUpload = document.querySelector('.img-upload__input');
const editPhoto = document.querySelector('.img-upload__overlay');
const cancelUploadImg = document.querySelector('.img-upload__cancel');
const inputHashtag = document.querySelector('.text__hashtags');
const inputComment = document.querySelector('.text__description');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const previewImg = document.querySelector('.img-upload__preview');

let scaleValue = 100;

const closeEditPhoto = () => {
  fileUpload.value = '';
  inputHashtag.value = '';
  inputComment.value = '';

  editPhoto.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentEscapeKeydown);
};

function onDocumentEscapeKeydown (evt) {
  if (isEscapeKey(evt) &&
      !evt.target.classList.contains('text__hashtags') &&
      !evt.target.classList.contains('text__description')) {
    closeEditPhoto();
  }
}

const onCancelUploadImgClick = () => {
  closeEditPhoto();
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
