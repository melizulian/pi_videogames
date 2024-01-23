export const validateForm = (game) => {
  const urlPattern = /^(https?:\/\/)?(((a-z\d*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(:(\d+))?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(#[-a-z\d_]*)?$/i;

  const errors = {};

  const validateRequiredString = (fieldName, value) => {
    if (!value || !value.trim() || typeof value !== 'string') {
      errors[fieldName] = `El ${fieldName.toLowerCase()} es requerido y debe ser una cadena de texto`;
    }
  };

  const validateURL = (fieldName, value) => {
    if (!value || !value.trim() || !urlPattern.test(value)) {
      errors[fieldName] = `La ${fieldName.toLowerCase()} es requerida y debe ser una URL válida`;
    }
  };

  validateRequiredString('Nombre', game.name);
  validateURL('Imagen', game.image_url);
  validateRequiredString('Descripción', game.description);
  validateRequiredString('Plataformas', game.platforms);

  if (!game.released || !game.released.trim() || isNaN(Date.parse(game.released))) {
    errors.released = 'La fecha de lanzamiento es requerida y debe ser una fecha válida';
  }

  if (!game.rating || typeof game.rating !== 'number' || game.rating < 1 || game.rating > 5) {
    errors.rating = 'El rating es requerido y debe ser un número entre 1 y 5';
  }

  if (game.genres.length === 0 || !Array.isArray(game.genres)) {
    errors.genres = 'Debes seleccionar al menos un género';
  }

  return Object.keys(errors).length ? errors : null;
};