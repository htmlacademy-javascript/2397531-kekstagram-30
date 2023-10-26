const getRandomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomElementFromArray = (array) => array[getRandomNum(0, array.length - 1)];
const isEscapeKey = (evt) => evt.key === 'Escape';

export {getRandomNum, getRandomElementFromArray, isEscapeKey};
