import { useParams } from 'react-router-dom';
import style from './Detail.module.css';
import PropTypes from 'prop-types';

function Detail({ videogames, searchResults }) {
  const { id } = useParams();
  const gameId = parseInt(id);

  // Combine all games from both sources
  const allGames = [...videogames, ...searchResults];

  // Find the selected videogame by matching the ID
  const selectedVideogame = allGames.find((game) => game.id === gameId);

  if (!selectedVideogame) {
    return <div className={style.loading}>Loading...</div>;
  }

  const {
    name,
    platforms,
    description,
    released,
    rating,
    genres: gameGenres, // Rename to avoid conflict with the prop
  } = selectedVideogame;

  // Unify image_url and background_image
  const imageUrlToShow = selectedVideogame.image_url || selectedVideogame.background_image;

  // Ensure that platforms is an array before trying to map over it
  const platformsToShow = Array.isArray(platforms)
    ? platforms.map((platformObj) => platformObj.platform.name)
    : [];

  // Ensure that gameGenres is defined before trying to access its elements
  const genresToShow = gameGenres || [];

  return (
    <div className={style.parentContainer}>
      <div className={style.container}>
        <div className={style.parentName}>
          <h1>Id: {id}</h1>
          <h2>Name: {name}</h2>
        </div>
        <img src={imageUrlToShow} alt={name} />
        <div className={style.listContainer}>
          <div className={style.listItem}>
            <h2>Platforms:</h2>
            <ul>
              {platformsToShow.map((platform) => (
                <li key={platform}>{platform}</li>
              ))}
            </ul>
          </div>
          <div className={style.listItem}>
            <h2>Genres:</h2>
            <ul>
              {genresToShow.map((genre, index) => (
                <li key={index}>{genre.name}</li>
              ))}
            </ul>
          </div>
        </div>
        <h2>Description:</h2>
        <div dangerouslySetInnerHTML={{ __html: description }} />
        <h2>Release Date: {released}</h2>
        <h2>Rating: {rating}</h2>
      </div>
    </div>
  );
}

Detail.propTypes = {
  videogames: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      name: PropTypes.string.isRequired,
      image_url: PropTypes.string,
      background_image: PropTypes.string,
      description: PropTypes.string,
      platforms: PropTypes.arrayOf(
        PropTypes.shape({
          platform: PropTypes.shape({
            name: PropTypes.string.isRequired,
          }).isRequired,
          released_at: PropTypes.string,
          requirements: PropTypes.object,
        })
      ).isRequired,
      released: PropTypes.string,
      rating: PropTypes.number.isRequired,
      genres: PropTypes.array,
    })
  ).isRequired,
  searchResults: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      name: PropTypes.string.isRequired,
      image_url: PropTypes.string,
      background_image: PropTypes.string,
      description: PropTypes.string,
      platforms: PropTypes.arrayOf(
        PropTypes.shape({
          platform: PropTypes.shape({
            name: PropTypes.string.isRequired,
          }).isRequired,
          released_at: PropTypes.string,
          requirements: PropTypes.object,
        })
      ).isRequired,
      released: PropTypes.string,
      rating: PropTypes.number.isRequired,
      genres: PropTypes.array,
    })
  ).isRequired,
};

export default Detail;