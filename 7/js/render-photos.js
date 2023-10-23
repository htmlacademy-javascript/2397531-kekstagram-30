import {photos} from './generate-photos.js';

const pictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const renderPhoto = (photo) => {
  const pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = photo.url;
  pictureElement.querySelector('.picture__img').alt = photo.description;
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;

  return pictureElement;
};

const renderPhotos = (photosData) => {
  const fragment = document.createDocumentFragment();

  photosData.forEach((photo) => {
    fragment.append(renderPhoto(photo));
  });

  pictures.append(fragment);
};

renderPhotos(photos);

export {renderPhoto, renderPhotos};
