import { useNavigate, useLocation, Link } from 'react-router-dom';
import style from './NavBar.module.css'


const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  const goHome = () => {
    navigate('/home');
  };

  const goBack = () => {
    navigate(-1);
  };

  if (isHome) {
    return null;
  }

  return (
    <div className={style.container}>
      <button className={style.btn} onClick={goHome}>Inicio</button>
      <button className={style.btn} onClick={goBack}>Atrás</button>
      <Link to='/Form' className={style.btn}>Crear Videojuego</Link>
    </div>
  );
};

export default Navbar;