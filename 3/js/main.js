const DESCRIPTIONS_TEXT = ['wow', 'cool', 'nice view', 'amazing', 'sick'];
const MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
const NAMES = ['Anna', 'Ben', 'Sofia', 'Evgenia', 'Antony'];
const COUNT_DESCRIPTIONS_PHOTO = 25;

const Likes = {
  MIN: 15,
  MAX: 200
};

const AvatarUrl = {
  MIN: 1,
  MAX: 6
};

const Comments = {
  MIN: 0,
  MAX: 30
};

const descriptionsPhoto = [];

const getRandomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomElementFromArray = (array) => array[getRandomNum(0, array.length - 1)];

const createComment = (index) => ({
  id: index,
  avatar: `img/avatar-${getRandomNum(AvatarUrl.MIN, AvatarUrl.MAX)}.svg`,
  message: getRandomElementFromArray(MESSAGES),
  name: getRandomElementFromArray(NAMES)
});

const createComments = (countsComments) => {
  const comments = [];
  for (let i = 0; i < countsComments; i++) {
    comments.push(createComment(i));
  }
  return comments;
};

const createDescription = (index) => ({
  id: index,
  url: `photos/${index + 1}.jpg`,
  description: getRandomElementFromArray(DESCRIPTIONS_TEXT),
  likes: getRandomNum(Likes.MIN, Likes.MAX),
  comments: createComments(getRandomNum(Comments.MIN, Comments.MAX))
});

const createDescriptions = () => {
  for (let i = 0; i < COUNT_DESCRIPTIONS_PHOTO; i++) {
    descriptionsPhoto.push(createDescription(i));
  }
};

createDescriptions();
