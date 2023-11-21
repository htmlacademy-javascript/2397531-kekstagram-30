import {renderPhotos} from './render-photos.js';
import './form.js';
import './check-hashtags.js';
import './effects.js';
import {getData} from './api.js';
import {showAlertError} from './messages.js';
import './filters.js';
import './img-upload.js';

let photos = [];

const loadPictures = async () => {
  await getData()
    .then((data) => {
      photos = data.slice();
      renderPhotos(data);
    })
    .then(() => document.querySelector('.img-filters').classList.remove('img-filters--inactive'))
    .catch(() => showAlertError());
};

loadPictures();


export {photos};
