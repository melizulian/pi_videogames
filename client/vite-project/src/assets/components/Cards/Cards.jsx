import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { setFilteredVideogames, setFilter, setSort } from '../../../redux/actions';
import Card from '../Card/Card';
import SearchBar from '../SearchBar/SearchBar';
import style from './Cards.module.css';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from './redux';


const Cards = ({ onSearch, genres }) => {
  const dispatch = useDispatch();
  const videogames = useSelector((state) => state.videogames);
  const filteredVideogames = useSelector((state) => state.filteredVideogames);

  const handleSearch = async (name) => {
    try {
      await onSearch(name);
    } catch (error) {
      console.error('Error al buscar:', error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const selectedGenre = useSelector((state) => state.filter.genre);

  const handleFilter = () => {
    dispatch(setFilter(selectedGenre));

    let filteredGames;

    if (selectedGenre === 'all') {
      filteredGames = videogames;
    } else {
      filteredGames = videogames.filter((game) => {
        // Verifica si existe game.genres y si incluye el género seleccionado
        return game.genres && game.genres.some(genre => genre.name === selectedGenre);
      });
    }

    dispatch(setFilteredVideogames(filteredGames));
  };
  

  const handleSort = (selectedSort) => {
    dispatch(setSort(selectedSort));

    let sortedGames = [...filteredVideogames];

    switch (selectedSort) {
      case 'asc':
        sortedGames.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'desc':
        sortedGames.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'rating':
        sortedGames.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // No ordenar
    }

    dispatch(setFilteredVideogames(sortedGames));
  };

  useEffect(() => {
    let filteredGames;

    if(selectedGenre === 'all'){
      filteredGames = videogames;
    } else {
      filteredGames = videogames.filter((game) => game.genres && game.genres.some(genre => genre.name === selectedGenre));
    }
    handleFilter();
    dispatch(setFilteredVideogames(filteredGames));

  }, [selectedGenre, videogames, dispatch, handleFilter]);

  

  return (
    <div className={style.container}>
      <div className={style.searchBar}>
        <SearchBar onSearch={handleSearch} onFilter={handleFilter} onSort={handleSort} genres={genres} />
      </div>

      <div className={style.containerData}>
        {filteredVideogames.length > 0 ? (
          filteredVideogames.map((item) => {
            const description =
              item.description || (item.data && item.data.description) || 'No hay descripción disponible';
            const platforms = Array.isArray(item.platforms) ? item.platforms : [];

            return (
              <Card
                key={item.id}
                videogame={{
                  ...item,
                  id: item.id.toString(),
                  released: formatDate(item.released),
                  description: description,
                  platforms: platforms,
                  genres: genres,
                }}
              />
            );
          })
        ) : (
          <p>No se encontraron resultados</p>
        )}
      </div>
    </div>
  );
};

Cards.propTypes = {
  onSearch: PropTypes.func.isRequired,
  genres: PropTypes.array,
};

const ConnectedCards = connect(mapStateToProps, mapDispatchToProps)(Cards);
export default ConnectedCards;
