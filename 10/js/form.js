import {isEscapeKey} from './utils.js';

const fileUpload = document.querySelector('.img-upload__input');
const editPhoto = document.querySelector('.img-upload__overlay');
const cancelUploadImg = document.querySelector('.img-upload__cancel');
const inputHashtag = document.querySelector('.text__hashtags');
const inputComment = document.querySelector('.text__description');

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
