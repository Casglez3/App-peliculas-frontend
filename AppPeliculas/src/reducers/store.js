import { configureStore } from '@reduxjs/toolkit';
import peliculaSlice from './peliculaSlice';
import usuarioSlice from './usuarioSlice';

//Aquí guardaremos todo lo referente al estado global para las peliculas

const store = configureStore({
  reducer: {
    pelicula: peliculaSlice,
    usuario: usuarioSlice,
  },
});

export default store;