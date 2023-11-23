const MAX_HASHTAGS = 5;
const HASHTAG_LENGTH = 20;
const MAX_COMMENT_LENGTH = 140;

const form = document.querySelector('.img-upload__form');
const inputHashtag = document.querySelector('.text__hashtags');
const inputComment = document.querySelector('.text__description');
const uploadSubmitButton = document.querySelector('.img-upload__submit');

let textError = '';

const getMessageError = () => textError;

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const hashtagHandlers = (value) => {
  const hashtagString = value.toLowerCase().trim();
  const hashtagSplit = hashtagString.split(/\s+/);

  if (!hashtagString) {
    return true;
  }

  if (hashtagSplit.length === 0) {
    return true;
  }

  const rules = [
    {
      check: hashtagSplit.some((hashtag) => hashtag[0] !== '#'),
      error: 'Хэштэг должен начинаться с символа "#"'
    },
    {
      check: hashtagSplit.some((hashtag) => hashtag === '#'),
      error: 'Хэштэг не должен состоять только из одной "#" (решётки)'
    },
    {
      check: hashtagSplit.some((hashtag) => hashtag.indexOf('#', 1) >= 1),
      error: 'Хэштэги должны разделяться пробелами'
    },
    {
      check: hashtagSplit.some((hashtag, index, array) => array.includes(hashtag, index + 1)),
      error: 'Хэштэги не должны повторяться'
    },
    {
      check: hashtagSplit.length > MAX_HASHTAGS,
      error: `Максимальное количество хэштегов: ${MAX_HASHTAGS}`
    },
    {
      check: hashtagSplit.some((hashtag) => hashtag.length > HASHTAG_LENGTH),
      error: `Максимальная длина хэштега: ${HASHTAG_LENGTH} символов`
    },
    {
      check: hashtagSplit.some((hashtag) => !(/^#[a-zа-я0-9]{1,19}$/i.test(hashtag))),
      error: 'Хэштег содержит запрещенные символы'
    }
  ];

  return rules.every((rule) => {
    const isValid = rule.check;
    if (isValid) {
      textError = rule.error;
    }
    return !isValid;
  });

};

pristine.addValidator(inputHashtag, hashtagHandlers, getMessageError, 2, false);

const validateComment = (value) => value.length < MAX_COMMENT_LENGTH;

pristine.addValidator(inputComment, validateComment, `Длина комментария больше ${MAX_COMMENT_LENGTH} символов`);

function checkValidate () {
  uploadSubmitButton.disabled = !pristine.validate();
}

const onHashtagInput = () => {
  checkValidate();
};

const onCommentInput = () => {
  checkValidate();
};

inputHashtag.addEventListener('input', onHashtagInput);
inputComment.addEventListener('input', onCommentInput);

export {pristine};
