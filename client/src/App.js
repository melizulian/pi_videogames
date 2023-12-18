// import './App.css';
import { Route, Routes } from 'react-router-dom'
import Cards from './components/Cards/Cards'
import Home from './components/Home/Home'
import Detail from './components/Detail/Detail'
import Landing from './components/Landing/Landing'

function App() {
  return (
    <div className='app'>
      <Routes>
        <Route path="/" element={Landing}/>
        <Route path="/home" element={Home}/>
        <Route path="/videogames" element={Cards}/>
        <Route path="/detail" element={Detail}/>
      </Routes>
    </div>
  );
}

export default App;
