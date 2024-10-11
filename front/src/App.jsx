import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from "./pages/Login"
import Home from './pages/Home'
import Usuarios from './pages/Usuarios'
import Pacientes from './pages/Pacientes'
import Turnos from './pages/Turnos'
import Veterinarios from './pages/Veterinarios'
import Perfil from './pages/Perfil'
import CambioContraseña from './pages/CambioContraseña'
import Productos from './pages/Productos'
import Proveedores from './pages/Proveedores'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/usuarios' element={<Usuarios/>}/>
      <Route path='/pacientes' element={<Pacientes/>}/>
      <Route path='/turnos' element={<Turnos/>}></Route>
      <Route path='/turnos' element={<Turnos/>}></Route> 
      <Route path='/Veterinarios' element={<Veterinarios/>}></Route> 
      <Route path='/perfil/:id' element={<Perfil/>}></Route>
      <Route path='/cambiopass' element={<CambioContraseña/>}/>
      <Route path='/productos' element={<Productos/>}/>
      <Route path='/proveedores' element={<Proveedores/>}/>
      
    </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
