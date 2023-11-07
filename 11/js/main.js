import {photos, createPhotos} from './generate-photos.js';
import {renderPhotos} from './render-photos.js';
import './form.js';
import './check-hashtags.js';
import './effects.js';

createPhotos();
renderPhotos(photos);

