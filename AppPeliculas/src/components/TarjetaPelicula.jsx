import React from 'react'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { setIdPelicula } from '../reducers/peliculaSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const TarjetaPelicula = ({ pelicula }) => {
    
    const peliculaId = pelicula.id;
    const dispatch = useDispatch();

    const navegacion = useNavigate();

    const handleClick = () => {
        dispatch(setIdPelicula(peliculaId));
        navegacion(`/tarjeta-detalles-pelicula/${peliculaId}`);
 
    }

    return (
        <div className='card-container' onClick={handleClick}>
            <Card sx={{ maxWidth: 300, position: 'relative' }}>
                <CardMedia
                    component="img"
                    sx={{
                        height: 450, // Ajusta la altura para que sea más alta, similar a una cartelera
                        objectFit: 'cover', // Asegura que la imagen se recorte adecuadamente si es necesario
                    }}
                    image={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`}
                    alt={pelicula.title}
                />
                <div className="title-overlay">
                    <Typography variant="h6" sx={{ color: 'white' }}>
                        {pelicula.title}
                    </Typography>
                </div>
                <CardContent >
                    <Typography variant="body2" sx={{
                        color: 'text.secondary',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        WebkitLineClamp: 6,  // Limita a 3 líneas
                        textOverflow: 'ellipsis',
                    }}>
                        {pelicula.overview}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default TarjetaPelicula;
