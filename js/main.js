const DESCRIPTIONS_TEXT = ['wow', 'cool', 'nice view', 'amazing', 'sick'];
const MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
const NAMES = ['Anna', 'Ben', 'Sofia', 'Evgenia', 'Antony'];

const getRandomNum = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomElementFromArray = (array) => array[getRandomNum(0, array.length - 1)];

const createRandomComment = () => {
  const count = getRandomNum(1, 2);
  const message = getRandomElementFromArray(MESSAGES);
  let secondMessage = getRandomElementFromArray(MESSAGES);

  if (count === 1) {
    return message;
  }

  while (secondMessage.includes(message)) {
    secondMessage = getRandomElementFromArray(MESSAGES);
  }

  return `${message} ${secondMessage}`;
};

const getId = () => {
  const id = [];
  let num = 1;

  return function () {
    while (id.includes(num)) {
      num++;
    }
    id.push(num);
    return num;
  };
};

const IDDESCRIPTION = getId();
const IDCOMMENT = getId();
const URLIMAGE = getId();

const createComments = () =>
  ({
    id: IDCOMMENT(),
    avatar: `img/avatar-${getRandomNum(1, 6)}.svg`,
    message: createRandomComment(),
    name: getRandomElementFromArray(NAMES)
  });

const createDescriptionsForPhoto = () =>
  ({
    id: IDDESCRIPTION(),
    url: `photos/${URLIMAGE()}.jpg`,
    description: getRandomElementFromArray(DESCRIPTIONS_TEXT),
    likes: getRandomNum(15, 200),
    comments: Array.from({length: getRandomNum(0, 30)}, createComments)
  });

const DESCRIPTIONS = Array.from({length: 25}, createDescriptionsForPhoto);
