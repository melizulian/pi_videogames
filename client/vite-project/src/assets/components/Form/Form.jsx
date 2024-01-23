
import { useState, useEffect, Fragment } from 'react';
import style from './Form.module.css';
import { validateForm } from './validation.js';


const Form = () => {
    const [game, setGame] = useState({
        name: '',
        image_url: '',
        description: '',
        platforms: '',
        released: '',
        rating: '',
        genres: [],
      });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);  // Nuevo estado para controlar la carga

  const [allGenres, setAllGenres] = useState([]);
// const [selectedGenres, setSelectedGenres] = useState([]);

useEffect(() => {
    if (loading) {
      fetch('http://localhost:3001/api/genres')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setAllGenres(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('There has been a problem with your fetch operation: ', error);
          setLoading(false);
        });
    }
  }, [loading]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    let updatedGame;
  
    if (name === 'rating') {
      updatedGame = { ...game, [name]: Number(value) };
    } else if (name === 'genres') {
      const selectedGenreIds = Array.from(event.target.selectedOptions, option => option.value);
      updatedGame = { ...game, [name]: selectedGenreIds, genres: selectedGenreIds };
    } else {
      updatedGame = { ...game, [name]: value };
    }
  
    setGame(updatedGame);
  
    const error = validateField(name, updatedGame[name]);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const validateField = (name, value) => {
    const fieldValidation = validateForm({ ...game, [name]: value });
    return fieldValidation ? fieldValidation[name] : null;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    console.log('Enviando formulario con datos:', game);
  
    try {
        const response = await fetch('http://localhost:3001/api/videogames', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(game)
        });
      
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
      
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Error en la solicitud POST:', error);
      }
  };
  console.log(game.genres)
  return (
    <Fragment >
    <div className={style.container}>
      <form   onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            name="name"
            value={game.name}
            onChange={handleChange}
            className={style.input}
            required
          />
          {errors.name && <span className={style.error}>{errors.name}</span>}
        </label>

        <label>
          Image:
          <input
            type="url"
            name="image_url"
            value={game.image_url}
            onChange={handleChange}
            className={style.input}
            required
          />
          {errors.image_url && <span className={style.error}>{errors.image_url}</span>}
        </label>

        <label>
          Description:
          <textarea
            name="description"
            value={game.description}
            onChange={handleChange}
            className={style.input}
            required
          ></textarea>
          {errors.description && <span className={style.error}>{errors.description}</span>}
        </label>

        <label>
          Platforms:
          <input
            name="platforms"
            value={game.platforms}
            onChange={handleChange}
            className={style.input}
            required
          />
          {errors.platforms && <span className={style.error}>{errors.platforms}</span>}
        </label>

        <label>
          Release date:
          <input
            type="date"
            name="released"
            value={game.released}
            onChange={handleChange}
            className={style.input}
            required
          />
          {errors.released && <span className={style.error}>{errors.released}</span>}
        </label>

        <label>
          Rating:
          <input
            type="number"
            name="rating"
            value={game.rating}
            onChange={handleChange}
            className={style.input}
            required
          />
          {errors.rating && <span className={style.error}>{errors.rating}</span>}
        </label>

        <label>
          Genres:
          <select
            name="genres"
            value={game.genres}
            onChange={handleChange}
            className={style.input}
            multiple
            required
            >
            {Array.isArray(allGenres) && allGenres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                {genre.name}
                </option>
            ))}
            </select>
          {errors.genres && <span className={style.error}>{errors.genres}</span>}
        </label>
        <div className={style.buttons}>
            <button type="submit" className={style.btn}>Create</button>
        </div>
        
      </form>
    </div>
    
    </Fragment>

    
  );
};

export default Form;