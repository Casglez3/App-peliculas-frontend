import React, { useEffect, useState } from 'react';
import { peliculasProximosEstrenos } from '../../api-calls/appTheMovieDB';
import { Box, Container, Pagination, Stack } from '@mui/material';
import TarjetaPelicula from '../TarjetaPelicula';


const PeliculasProximosEstrenos = () => {
  const [peliculas, setPeliculas] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);

  const manejarPaginacion = (event, value) => {
    setPaginaActual(value);
  };

  useEffect(() => {
    const obtenerPeliculas = async () => {
      try {
        const data = await peliculasProximosEstrenos(paginaActual);
        setPeliculas(data.results);
      } catch (error) {
        console.error('Error al obtener películas de próximos estrenos:', error);
      }
    };

    obtenerPeliculas();
  }, [paginaActual]);

  return (
    <div className='titulo-estado'>
      <h1>Películas de próximos estrenos</h1>
      {/* Contenedor para las tarjetas de películas */}
      <Container className='peliculas-container' maxWidth={false} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)', // 1 columna en pantallas extra pequeñas
              sm: 'repeat(2, 1fr)', // 2 columnas en pantallas pequeñas
              md: 'repeat(3, 1fr)', // 3 columnas en pantallas medianas
              lg: 'repeat(4, 1fr)', // 4 columnas en pantallas grandes
            },
            gap: 2, // Espacio entre las tarjetas
            width: '100%', // Ocupa todo el ancho del contenedor
          }}
        >
          {peliculas.map((pelicula) => (
            <TarjetaPelicula pelicula={pelicula} key={pelicula.id} />
          ))}
        </Box>
      </Container>

      {/* Contenedor separado para la paginación */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center', // Centra la paginación horizontalmente
          mt: 4, // Margen superior para separar la paginación de las películas
        }}
      >
        <Pagination 
          count={150} 
          variant="outlined" 
          color="primary" 
          page={paginaActual} 
          onChange={manejarPaginacion} 
          sx={{
            '& .MuiPaginationItem-root': {
              color: 'white', // Cambia el color del texto a blanco
              borderColor: 'white', // Cambia el color del borde a blanco
            },
            '& .Mui-selected': {
              backgroundColor: 'white', // Cambia el fondo del elemento seleccionado a blanco
              color: 'black', // Cambia el color del texto del elemento seleccionado a negro
            },
          }}
        />
      </Box>
    </div>
  );
};

export default PeliculasProximosEstrenos;
