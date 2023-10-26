import {isEscapeKey} from './utils.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsTotalCount = bigPicture.querySelector('.social__comment-total-count');
const commentsList = bigPicture.querySelector('.social__comments');
const captionPicture = bigPicture.querySelector('.social__caption');
const cancelBigPicture = bigPicture.querySelector('.big-picture__cancel');

const onCloseBigPictureClick = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  cancelBigPicture.removeEventListener('click', onCloseBigPictureClick);
  document.removeEventListener('keydown', onBigPictureEscapeKeydown);
};

function onBigPictureEscapeKeydown (evt) {
  if (isEscapeKey(evt)) {
    onCloseBigPictureClick();
    document.removeEventListener('keydown', onBigPictureEscapeKeydown);
  }
}


const showBigPicture = (picture) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  bigPictureImg.src = picture.url;
  likesCount.textContent = picture.likes;
  captionPicture.textContent = picture.description;
  commentsTotalCount.textContent = picture.comments.length;

  commentsList.innerHTML = '';

  picture.comments.forEach((comment) => {
    commentsList.innerHTML += `
    <li class="social__comment">
    <img
      class="social__picture"
      src="${comment.avatar}"
      alt="${comment.name}"
      width="35" height="35">
    <p class="social__text">${comment.message}</p>
  </li>
    `;
  });

  cancelBigPicture.addEventListener('click', onCloseBigPictureClick);
  document.addEventListener('keydown', onBigPictureEscapeKeydown);
};


export {showBigPicture};
