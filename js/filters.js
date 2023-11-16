import { photos } from './main.js';
import { debounce, shuffleArray } from './utils.js';
import { renderPhotos } from './render-photos.js';

const ACTIVE_CLASS = 'img-filters__button--active';
const COUNT_RANDOM_PICTURES = 10;

const pictures = document.getElementsByClassName('picture');
const filtersForm = document.querySelector('.img-filters__form');

const isButton = (evt) => evt.target.tagName === 'BUTTON';

const filters = {
  'filter-default': () => photos.slice(),
  'filter-random': () => shuffleArray(photos.slice()).slice(0, COUNT_RANDOM_PICTURES),
  'filter-discussed': () => photos.slice().sort((a, b) => b.comments.length - a.comments.length)
};

const onButtonClick = (evt) => {
  if (isButton(evt)) {
    const selectedButton = document.querySelector(`.${ACTIVE_CLASS}`);

    if (selectedButton) {
      selectedButton.classList.remove(ACTIVE_CLASS);
    }
    evt.target.classList.add(ACTIVE_CLASS);
  }
};

const onFiltersFormClick = debounce((evt) => {
  if (isButton(evt)) {

    if (pictures) {
      [...pictures].forEach((picture) => picture.remove());
    }
    renderPhotos(filters[evt.target.id]());
  }
});

filtersForm.addEventListener('click', onButtonClick);
filtersForm.addEventListener('click', onFiltersFormClick);
