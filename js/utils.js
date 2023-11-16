const DEFAULT_DELAY = 500;

const getRandomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomElementFromArray = (array) => array[getRandomNum(0, array.length - 1)];
const isEscapeKey = (evt) => evt.key === 'Escape';

const debounce = (callback, timeoutDelay = DEFAULT_DELAY) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

export {getRandomNum, getRandomElementFromArray, isEscapeKey, debounce, shuffleArray};
