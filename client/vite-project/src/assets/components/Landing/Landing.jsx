//imagen de fondo
//boton que redirija a la HOME PAGE

import style from './Landing.module.css'
import { Link } from 'react-router-dom'

const Landing = () => {

return (
    <div className={style.container}>
        
        <Link to='/home'>
            <button type='submit' className={style.btn}>Enter site</button>
        </Link>
        
    </div>
)
}

export default Landing;