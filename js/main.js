import {renderPhotos} from './render-photos.js';
import './form.js';
import './check-hashtags.js';
import './effects.js';
import {getData} from './api.js';
import {showAlertError} from './messages.js';

const loadPictures = async () => {
  await getData()
    .then((data) => renderPhotos(data))
    .catch(() => showAlertError());
};

loadPictures();
