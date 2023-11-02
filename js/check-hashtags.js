import '../vendor/pristine/pristine.min.js';

const MAX_HASHTAGS = 5;
const HASHTAG_LENGTH = 20;

const form = document.querySelector('.img-upload__form');
const inputHashtag = document.querySelector('.text__hashtags');
const uploadSubmitButton = document.querySelector('.img-upload__submit');

let textError = '';

const getMessageError = () => textError;
const hashtagFormat = /^#[a-zа-яё0-9]{1-19}$/i;

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const hashtagHandlers = (value) => {
  textError = '';
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
      check: hashtagSplit.some((hashtag) => !hashtagFormat.test(hashtag)),
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

pristine.addValidator(inputHashtag, hashtagHandlers, getMessageError);

const onHashtagInput = () => {
  if (pristine.validate()) {
    uploadSubmitButton.disabled = false;
  } else {
    uploadSubmitButton.disabled = true;
  }
};

inputHashtag.addEventListener('input', onHashtagInput);
form.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});
