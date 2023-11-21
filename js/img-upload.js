const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileChooser = document.querySelector('input[type=file]');
const preview = document.querySelector('.img-upload__preview img');
const previewEffect = document.querySelectorAll('.effects__preview');

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    preview.src = URL.createObjectURL(file);
    previewEffect.forEach((img) => {
      img.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
    });
  }
});
