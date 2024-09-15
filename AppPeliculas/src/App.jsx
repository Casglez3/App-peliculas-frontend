import { BrowserRouter, Route, Routes } from "react-router-dom";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css'
import FormularioRegistro from './components/FormularioRegistro';
import { Login } from './components/Login';
import PaginaPrincipal from './components/PaginaPrincipal';
import BarraNavegacion from './components/BarraNavegacion';
import BarraNavegacionSecundaria from './components/BarraNavegacionSecundaria';
import PeliculasEnCines from './components/tipos-peliculas/PeliculasEnCines';
import PeliculasMejorValoradas from './components/tipos-peliculas/PeliculasMejorValoradas';
import PeliculasProximosEstrenos from './components/tipos-peliculas/PeliculasProximosEstrenos';
import PeliculasPopulares from './components/tipos-peliculas/PeliculasPopulares';
import { AuthProvider } from './utilidades/AuthContext';
import TarjetaDetallesPelicula from "./components/TarjetaDetallesPelicula";



function App() {


  return (
    <AuthProvider>
      <BrowserRouter>
        <BarraNavegacion />
        <BarraNavegacionSecundaria />
        <Routes>
          <Route path='/' element={<PaginaPrincipal />} />
          <Route path='formulario-registro' element={<FormularioRegistro />} />
          <Route path='login' element={<Login />} />
          <Route path='peliculas-en-cines' element={<PeliculasEnCines />} />
          <Route path='peliculas-mejor-valoradas' element={<PeliculasMejorValoradas />} />
          <Route path='peliculas-proximos-estrenos' element={<PeliculasProximosEstrenos />} />
          <Route path='peliculas-populares' element={<PeliculasPopulares />} />
          <Route path='tarjeta-detalles-pelicula/:id' element={<TarjetaDetallesPelicula />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
