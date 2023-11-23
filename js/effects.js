const DEFAULT_VALUE = 1;
const PHOBOS_MAX = 3;
const HEAT_MIN = 1;
const HEAT_MAX = 3;
const MARVIN_MAX = 100;
const MARVIN_STEP = 1;

const Slider = {
  MIN: 0,
  MAX: 1,
  START: 1,
  STEP: 0.1
};

const effectsList = document.querySelector('.effects__list');
const imgPreview = document.querySelector('.img-upload__preview');
const image = imgPreview.querySelector('img');
const effectLevelValue = document.querySelector('.effect-level__value');
const sliderElement = document.querySelector('.effect-level__slider');
const sliderUpload = document.querySelector('.img-upload__effect-level');

let currentEffect = '';
effectLevelValue.value = DEFAULT_VALUE;

sliderUpload.classList.add('visually-hidden');

const updateSlider = (min, max, start, step, levelValue) => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      'min': min,
      'max': max
    },
    start: start,
    step: step
  });

  effectLevelValue.value = levelValue;
};

const effects = {
  none: () => {
    sliderUpload.classList.add('visually-hidden');
    return 'none';
  },
  chrome: () => {
    sliderUpload.classList.remove('visually-hidden');
    return `grayscale(${effectLevelValue.value})`;
  },
  sepia: () => {
    sliderUpload.classList.remove('visually-hidden');
    return `sepia(${effectLevelValue.value})`;
  },
  marvin: () => {
    sliderUpload.classList.remove('visually-hidden');
    return `invert(${effectLevelValue.value}%)`;
  },
  phobos: () => {
    sliderUpload.classList.remove('visually-hidden');
    return `blur(${effectLevelValue.value}px)`;
  },
  heat: () => {
    sliderUpload.classList.remove('visually-hidden');
    return `brightness(${effectLevelValue.value})`;
  },
};

const configSlider = {
  none: [Slider.MIN, Slider.MAX, Slider.START, Slider.STEP, DEFAULT_VALUE],
  chrome: [Slider.MIN, Slider.MAX, Slider.START, Slider.STEP, DEFAULT_VALUE],
  sepia: [Slider.MIN, Slider.MAX, Slider.START, Slider.STEP, DEFAULT_VALUE],
  marvin: [Slider.MIN, MARVIN_MAX, MARVIN_MAX, MARVIN_STEP, MARVIN_MAX],
  phobos: [Slider.MIN, PHOBOS_MAX, PHOBOS_MAX, Slider.STEP, PHOBOS_MAX],
  heat: [HEAT_MIN, HEAT_MAX, HEAT_MAX, Slider.STEP, HEAT_MAX]
};

const onEffectsListClick = (evt) => {
  let target = evt.target;

  if (target.classList.contains('effects__label')) {
    target = target.querySelector('span');
  }

  if (target.classList.contains('effects__preview')) {
    if (currentEffect !== '') {
      image.classList.remove(currentEffect);
    }

    currentEffect = target.classList[1];
    image.classList.add(currentEffect);
    const nameEffect = currentEffect.replace('effects__preview--','');
    updateSlider(...configSlider[nameEffect]);
    image.style.filter = effects[nameEffect]();
  }
};

effectsList.addEventListener('click', onEffectsListClick);

noUiSlider.create(sliderElement, {
  range: {
    min: Slider.MIN,
    max: Slider.MAX
  },
  start: Slider.START,
  step: Slider.STEP,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  }
});

sliderElement.noUiSlider.on('change', () => {
  effectLevelValue.value = sliderElement.noUiSlider.get();

  image.style.filter = effects[currentEffect.replace('effects__preview--','')]();
});

const resetEffects = () => {
  effectLevelValue.value = DEFAULT_VALUE;
  sliderUpload.classList.add('visually-hidden');
  image.style.filter = 'none';
  if (currentEffect !== '') {
    image.classList.remove(currentEffect);
  }
};

export {resetEffects};


