import {BrowserRouter , Routes , Route} from 'react-router-dom'

import './App.css'
import { Inicio } from './pages/Inicio'
import { Login } from './pages/Login'
import { Libros } from './pages/Libros'

function App() {
  

  return (
    <BrowserRouter>
    <>
      
      <Routes>
        <Route path='/'       element={<Login/>}/>
        <Route path='/inicio' element={<Inicio/>}/>
        <Route path='/libros' element={<Libros/>}/>
        
      </Routes>
    </>
    </BrowserRouter>
  )
}

export default App
