
import './app.css';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setVideogames } from './redux/actions'; 
import Form from './assets/components/Form/Form.jsx';
import Cards from './assets/components/Cards/Cards.jsx';
import Detail from './assets/components/Detail/Detail.jsx';
import Landing from './assets/components/Landing/Landing.jsx';
import Navbar from './assets/components/NavBar/NavBar.jsx';

function App() {
  const dispatch = useDispatch();
  const videogames = useSelector(state => state.videogames);
  const [genres, setGenres] = useState([]);

  const onSearch = async (name) => {
    try {
      if (!name || name.trim() === '') {
        console.error('Name is undefined or empty');
        return;
      }
  
      const encodedName = encodeURIComponent(name);
      console.log('Nombre a buscar (antes de la solicitud):', encodedName);
  
      const apiKey = import.meta.env.VITE_API_KEY;
  
      // Buscar en la base de datos
      const dbResponse = await axios.get(`http://localhost:3001/api/videogames/name/${encodedName}`);
      const dbResults = dbResponse.data;
  
      // Si ya tienes 15 o más resultados de la base de datos, no necesitas buscar en la API
      if (dbResults.length >= 15) {
        dispatch(setVideogames(dbResults.slice(0, 15)));
        return;
      }
  
      // Buscar en la API para completar
      const apiResponse = await axios.get(`https://api.rawg.io/api/games?key=${apiKey}&page_size=15&search=${encodedName}`);
      const apiResults = apiResponse.data.results;
  
      // Combinar resultados de la base de datos y la API
      const combinedResults = [...dbResults, ...apiResults];
  
      // Limitar los resultados a los primeros 15
      const limitedResults = combinedResults.slice(0, 15);
      dispatch(setVideogames(limitedResults));
    } catch (error) {
      console.error('Error al buscar:', error);
    }
  };

  useEffect(() => {
    const fetchVideogames = async () => {
      try {
        const apiKey = import.meta.env.VITE_API_KEY;
        const response = await axios.get(`https://api.rawg.io/api/games?key=${apiKey}&page_size=15`);
        const data = response.data.results;
  
        // Obtén la descripción de cada videojuego
        const videogamesWithDescription = await Promise.all(data.map(async game => {
          const gameDescriptionResponse = await axios.get(`https://api.rawg.io/api/games/${game.id}?key=${apiKey}`);
          game.description = gameDescriptionResponse.data.description;
          return game;
        }));
  
        dispatch(setVideogames(videogamesWithDescription));
      } catch (error) {
        console.error('Error al obtener los videojuegos:', error);
      }
    };
  
    fetchVideogames();
  }, [dispatch]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        // Hacer solicitud para obtener los géneros desde tu API
        const response = await axios.get('http://localhost:3001/api/genres'); // Ajusta la URL según tu configuración
        const genresData = response.data;

        // Actualizar el estado con los géneros obtenidos
        setGenres(genresData);
      } catch (error) {
        console.error('Error al obtener los géneros:', error);
      }
    };

    // Llamar a la función para obtener los géneros
    fetchGenres();
  }, []);

  return (
    <div className='container'>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={<Landing />}
          />
          <Route
            path="/home"
            element={<Cards onSearch={onSearch} searchResults={videogames} videogames={videogames} genres={genres}/>}
          />
          <Route path="/form" element={<Form />} />

          {genres.length > 0 && (
          <Route
            path="/detail/:id"
            element={
              <Detail
                genres={genres}
                searchResults={videogames.map(game => ({ ...game, id: parseInt(game.id), platforms: Array.isArray(game.platforms) ? game.platforms : [] }))}
                videogames={videogames.map(game => ({ ...game, id: parseInt(game.id), platforms: Array.isArray(game.platforms) ? game.platforms : [] }))}
              />
            }
          />
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;

