const getRandomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomElementFromArray = (array) => array[getRandomNum(0, array.length - 1)];

export {getRandomNum, getRandomElementFromArray};
