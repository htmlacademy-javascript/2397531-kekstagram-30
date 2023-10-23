import {getRandomNum, getRandomElementFromArray} from './get-random.js';

const DESCRIPTIONS_TEXT = ['wow', 'cool', 'nice view', 'amazing', 'sick'];
const MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
const NAMES = ['Anna', 'Ben', 'Sofia', 'Evgenia', 'Antony'];
const COUNT_PHOTOS = 25;

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

const photos = [];

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

const createPhoto = (index) => ({
  id: index,
  url: `photos/${index + 1}.jpg`,
  description: getRandomElementFromArray(DESCRIPTIONS_TEXT),
  likes: getRandomNum(Likes.MIN, Likes.MAX),
  comments: createComments(getRandomNum(Comments.MIN, Comments.MAX))
});

const createPhotos = () => {
  for (let i = 0; i < COUNT_PHOTOS; i++) {
    photos.push(createPhoto(i));
  }
};

createPhotos();

export {photos};
