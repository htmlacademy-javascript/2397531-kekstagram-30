import {isEscapeKey} from './utils.js';

const COMMENTS_STEP = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsShownCount = bigPicture.querySelector('.social__comment-shown-count');
const commentsTotalCount = bigPicture.querySelector('.social__comment-total-count');
const commentsList = bigPicture.querySelector('.social__comments');
const captionPicture = bigPicture.querySelector('.social__caption');
const cancelBigPicture = bigPicture.querySelector('.big-picture__cancel');
const commentsLoader = bigPicture.querySelector('.social__comments-loader');

let totalComments = [];
let currentCountComments = 5;

const renderComments = (comments) => {

  const showComments = comments.slice(0, (currentCountComments >= comments.length) ? comments.length : currentCountComments);

  commentsList.innerHTML = '';

  showComments.forEach((comment) => {
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

  if (currentCountComments >= totalComments.length) {
    commentsLoader.classList.add('hidden');
  }

  commentsShownCount.textContent = showComments.length;
};

const onCommentsLoaderClick = () => {
  currentCountComments += COMMENTS_STEP;
  renderComments(totalComments);
};

const onCloseBigPictureClick = () => {
  currentCountComments = 5;

  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  commentsLoader.classList.remove('hidden');

  cancelBigPicture.removeEventListener('click', onCloseBigPictureClick);
  document.removeEventListener('keydown', onBigPictureEscapeKeydown);
  commentsLoader.removeEventListener('click', onCommentsLoaderClick);
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

  totalComments = picture.comments.slice();

  renderComments(totalComments);

  cancelBigPicture.addEventListener('click', onCloseBigPictureClick);
  document.addEventListener('keydown', onBigPictureEscapeKeydown);
  commentsLoader.addEventListener('click', onCommentsLoaderClick);
};

export {showBigPicture};
