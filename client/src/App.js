// import './App.css';
import { Route, Routes } from 'react-router-dom'
import Form from './components/Form/Form'
import Home from './components/Home/Home'
import Detail from './components/Detail/Detail'
import Landing from './components/Landing/Landing'

function App() {
  return (
    <div className='app'>
      <h1>APP</h1>
      <Routes>
        <Route path="/" element={Landing} />
        <Route path="/home" element={Home}/>
       <Route path="/form" element={Form}/>
        <Route path="/detail" element={Detail} />
      </Routes>
    </div>
  );
}

export default App; 
