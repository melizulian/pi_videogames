
import style from './Card.module.css'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const Card = ({ videogame }) => {
  const { name, background_image, image_url, platforms, released, rating, id, description } = videogame;
  const stringId = id.toString();

  const platformList = Array.isArray(platforms)
    ? platforms.map((platformObj, index) => <li key={index}>{platformObj.platform.name}</li>)
    : null;

  const imageUrlToShow = background_image || image_url;

  return (
    <div className={style.container}>
      <div className={style.containerData}>
        <img src={imageUrlToShow} alt={name} className={style.img} />
        <Link to={`/detail/${stringId}`} className={style.name}>
          {name}
        </Link>
        <h4 className={style.description} dangerouslySetInnerHTML={{ __html: description || 'No hay descripción disponible' }} />
        <ul>{platformList}</ul>
        <div className={style.genres}>
        <h2>Genres:</h2>
        <ul>
          {videogame.genres.map((genre, index) => (
            <li key={index}>{genre.name}</li>
          ))}
        </ul>
      </div>
        <h4>{released}</h4>
        <h4>{rating}</h4>
      </div>
    </div>
  );
};

Card.propTypes = {
  videogame: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    name: PropTypes.string.isRequired,
    background_image: PropTypes.string,
    image_url: PropTypes.string,
    description: PropTypes.string,
    platforms: PropTypes.oneOfType([
      PropTypes.arrayOf(
        PropTypes.shape({
          platform: PropTypes.shape({
            name: PropTypes.string.isRequired,
          }).isRequired,
        })
      ),
      PropTypes.string,
    ]).isRequired,
    released: PropTypes.string,
    rating: PropTypes.number.isRequired,
    genres: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
};
export default Card;


