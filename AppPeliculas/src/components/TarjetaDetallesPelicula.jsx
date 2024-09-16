import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { obtenerPeliculaPorId, obtenerVideoPelicula, obtenerCreditosPelicula } from '../api-calls/appTheMovieDB';
import { transformarFecha } from '../utilidades/utiles';
import { useSelector } from 'react-redux';
import { Avatar, Box, Container, TextField, Button } from '@mui/material';
import { guardarComentario, guardarPelicula, obtenerPeliculasPorApiId, obtenerResenaIdPelicula } from '../api-calls/appPeliculas';
import { useAuth } from '../utilidades/AuthContext';
import TarjetaComentario from './TarjetaComentario';
import Rating from '@mui/material/Rating';



const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
    variants: [
        {
            props: ({ expand }) => !expand,
            style: {
                transform: 'rotate(0deg)',
            },
        },
        {
            props: ({ expand }) => !!expand,
            style: {
                transform: 'rotate(180deg)',
            },
        },
    ],
}));

const TarjetaDetallesPelicula = () => {

    const { isAuthenticated } = useAuth();
    const [expanded, setExpanded] = useState(false);
    const [pelicula, setPelicula] = useState({});
    const [videoKey, setVideoKey] = useState('');
    const [creditos, setCreditos] = useState([]);
    const [resenas, setResenas] = useState([]); // Estado para comentarios
    const [calificacion, setCalificacion] = useState(1); // Estado para calificación
    const [mostrarResena, setMostrarResena] = useState(false); // Estado para mostrar la entrada de comentario
    const [nuevaResena, setNuevaResena] = useState(''); // Estado para manejar el nuevo comentario
    const [titulo, setTitulo] = useState('');
    const [fechaLanzamiento, setFechaLanzamiento] = useState('');
    const [imagen, setImagen] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const peliculaId = useSelector((state) => state.pelicula.idPelicula);
    const usuario = useSelector((state) => state.usuario);

    let respuestaApiPeliculas;

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                // Primero verificar si la película está presente

                if (isAuthenticated) {
                    respuestaApiPeliculas = await obtenerPeliculasPorApiId(peliculaId);
                }
                if (respuestaApiPeliculas && respuestaApiPeliculas.data) {
                    setPelicula(respuestaApiPeliculas.data); // Asignar la película al estado
                    setTitulo(respuestaApiPeliculas.data.titulo);
                    setFechaLanzamiento(respuestaApiPeliculas.data.fechaLanzamiento);
                    setImagen(respuestaApiPeliculas.data.imagen);
                    setDescripcion(respuestaApiPeliculas.data.descripcion);
                    const respuestaResena = await obtenerResenaIdPelicula(respuestaApiPeliculas.data.id);
                    if (respuestaResena && respuestaResena.data) {
                        setResenas(respuestaResena.data);
                    }
                } else {
                    const data = await obtenerPeliculaPorId(peliculaId);
                    setPelicula(data); // Asigna la película obtenida al estado
                    setTitulo(data.title);
                    setFechaLanzamiento(data.release_date);
                    setImagen(data.poster_path);
                    setDescripcion(data.overview);
                }

            } catch (error) {
                console.error('Error al obtener los datos de la película:', error);
            }
        };

        const obtenerCreditos = async () => {
            // Obtener los créditos
            const dataCreditos = await obtenerCreditosPelicula(peliculaId);

            const actoresOrdenados = dataCreditos.cast.sort((a, b) => a.order - b.order);
            const primerosCincoActores = actoresOrdenados.slice(0, 5);
            setCreditos(primerosCincoActores); // Asigna los primeros 5 actores al estado
        };

        const obtenerVideo = async () => {
            const dataVideo = await obtenerVideoPelicula(peliculaId);
            const youtubeVideos = dataVideo.results.filter(video => video.site === 'YouTube');
            if (youtubeVideos.length > 0) {
                setVideoKey(youtubeVideos[0].key); // Asigna el primer video de YouTube al estado
            } else {
                console.warn('No YouTube videos found');
            }
        };



        obtenerDatos();
        obtenerCreditos();
        obtenerVideo();

    }, [peliculaId, isAuthenticated, resenas]);



    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleMostrarComentario = () => {
        setMostrarResena(!mostrarResena);
    };

    const handleAgregarComentario = async () => {
        respuestaApiPeliculas = await obtenerPeliculasPorApiId(peliculaId);
        if (!respuestaApiPeliculas || !respuestaApiPeliculas.data) {
            let peliculaGuardada;
            try {
                const respuesta = await guardarPelicula({
                    apiId: pelicula.id,
                    titulo: pelicula.title,
                    fechaLanzamiento: pelicula.release_date,
                    imagen: pelicula.poster_path,
                    descripcion: pelicula.overview
                });
                if (respuesta && respuesta.data) {
                    peliculaGuardada = respuesta.data;
                }
            } catch (error) {
                console.error('Error al guardar la película:', error);
            }
            if (nuevaResena && peliculaGuardada) {
                try {
                    const response = await guardarComentario({
                        usuarioId: usuario.id,
                        peliculaId: peliculaGuardada.id,
                        comentario: nuevaResena,
                        calificacion: calificacion,
                        fechaPublicacion: new Date().toISOString()
                    });
                    setResenas([...resenas, nuevaResena]);
                    setNuevaResena('');
                } catch (error) {
                    console.error('Error al guardar el comentario:', error);
                }
            }
        } else {
            if (nuevaResena) {
                try {
                    const response = await guardarComentario({
                        usuarioId: usuario.id,
                        peliculaId: respuestaApiPeliculas.data.id,
                        comentario: nuevaResena,
                        calificacion: calificacion,
                        fechaPublicacion: new Date().toISOString()
                    });
                    setResenas([...resenas, nuevaResena]);
                    setNuevaResena('');
                } catch (error) {
                    console.error('Error al guardar el comentario:', error);
                }
            }
        }
    };



    return (
        <Container className='contenedor-peliculas-detalles' sx={{ marginTop: 8 }}>
            <h1>{titulo}</h1>
            <div className="fila-tarjetas">

                <Card sx={{ width: 460 }}>
                    <CardHeader
                        title={fechaLanzamiento ? `Fecha de lanzamiento: ${transformarFecha(fechaLanzamiento)}` : 'Fecha de lanzamiento desconocida'}
                    />
                    {imagen && (
                        <CardMedia
                            component="img"
                            height="600"
                            image={`https://image.tmdb.org/t/p/w500${imagen}`}
                            alt={titulo}
                        />
                    )}
                </Card>
                <Card sx={{ width: 650 }}>
                    <Typography variant="h6" sx={{ marginBottom: 1, marginTop: 3 }}>Sipnosis:</Typography>
                    <CardContent>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {descripcion}
                        </Typography>
                    </CardContent>
                    <div>
                        <Typography variant="h6" sx={{ marginBottom: 1 }}>Reparto:</Typography>
                        {creditos.map((actor) => (
                            <div key={actor.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', marginLeft: 15 }}>
                                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                    <Avatar size="lg"
                                        src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                                        alt={actor.name}
                                        style={{ marginRight: '10px', borderRadius: '50%' }}
                                    />
                                    <Typography>
                                        {actor.name} - {actor.character}
                                    </Typography>
                                </Box>
                            </div>
                        ))}
                    </div>
                    {isAuthenticated ? (
                        <CardActions disableSpacing>
                            <IconButton aria-label="add" onClick={handleMostrarComentario} disableRipple>
                                <AddCircleOutlineIcon /> Añadir comentario
                            </IconButton>
                            <IconButton aria-label="star" disableRipple>
                                <Rating
                                    name="simple-controlled"
                                    value={calificacion}
                                    onChange={(event, newValue) => {
                                        setCalificacion(newValue);
                                    }}
                                />
                            </IconButton>
                            <ExpandMore
                                expand={expanded}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more"
                            >
                                <ExpandMoreIcon />
                            </ExpandMore>
                        </CardActions>
                    ) : (
                        <div style={{ marginTop: '50px' }}>
                            <Typography variant="body1" color="textSecondary">
                                Registrate e inicia sesión para poder acceder a ver comentarios y añadir otros nuevos.
                            </Typography>
                        </div>

                    )}

                    {mostrarResena && (
                        <CardContent>
                            <TextField
                                fullWidth
                                label="Añadir un comentario"
                                value={nuevaResena}
                                onChange={(e) => setNuevaResena(e.target.value)}
                                variant="outlined"
                                multiline
                                rows={2}
                                sx={{ marginBottom: 2 }}
                            />
                            <Button variant="contained" color="primary" onClick={handleAgregarComentario}>
                                Agregar Comentario
                            </Button>
                        </CardContent>
                    )}

                    {isAuthenticated && (
                        <div>
                            <Button onClick={handleExpandClick}>
                                {expanded ? 'Ocultar comentarios' : 'Mostrar comentarios'}
                            </Button>
                            <Collapse in={expanded} timeout="auto" unmountOnExit>
                                {resenas.map((resena, index) => (
                                    <TarjetaComentario key={index} resena={resena} />
                                ))}
                            </Collapse>
                        </div>)}

                </Card>
            </div>
            <Card>

                <CardContent>
                    <Typography variant="h6" sx={{ marginBottom: 1 }}>Trailer:</Typography>
                    <CardMedia
                        component="iframe"
                        height="500"
                        src={`https://www.youtube.com/embed/${videoKey}`}
                        title="YouTube Video"
                    />
                </CardContent>

            </Card>
        </Container>
    );
}

export default TarjetaDetallesPelicula;
