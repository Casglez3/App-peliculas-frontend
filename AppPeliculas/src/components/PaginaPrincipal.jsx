import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MovieIcon from '@mui/icons-material/Movie';
import InfoIcon from '@mui/icons-material/Info';


const PaginaPrincipal = () => {



    return (
        <Container maxWidth="lg">
            <Box fflex="1"
                minWidth="300px"
                mr={2}
                mb={2}
                mt={7} // Margen superior
                p={2} // Padding interno
                borderRadius={8} // Borde redondeado
                sx={{
                    backgroundColor: 'rgba(128, 128, 128, 0.6)', // Color gris con 50% de opacidad
                    color: 'white', // Color del texto
                    boxShadow: 3 // Sombra
                }}
            >
                <Typography
                    variant="h3"
                    component="h1"
                    align="center"
                    gutterBottom
                    sx={{
                        fontFamily: "'Cinzel', serif", // Cambio de fuente
                        color: 'white'
                    }}>
                    FilmFusion
                    <Box mt={2} /> {/* Añadir margen superior */}
                    <Box>
                        <Typography variant="body1">
                            ¡Bienvenido a nuestra nueva aplicación de películas, tu destino definitivo para descubrir, explorar
                            y disfrutar del cine!
                            <br />
                            Esta aplicación ha sido creada pensando en los amantes del cine que buscan una
                            forma fácil y atractiva de encontrar sus películas favoritas, dejar reseñas y mantenerse al día con
                            los últimos estrenos.
                        </Typography>
                    </Box>
                </Typography>
            </Box>

            <Box display="flex" justifyContent="space-between" flexWrap="wrap">
                {/* Sección izquierda */}
                <Box
                    flex="1"
                    minWidth="300px"
                    mr={2}
                    mb={2}
                    p={2} // Padding interno
                    borderRadius={8} // Borde redondeado
                    sx={{
                        backgroundColor: 'rgba(33, 150, 243, 0.6)',
                        color: 'white', // Color del texto
                        boxShadow: 3 // Sombra
                    }}
                >


                    <Typography variant="body1">

                        <strong>¿Qué encontrarás?</strong>
                        <br />
                        <Box mt={2} /> {/* Añadir margen superior */}

                        <strong>Búsqueda Intuitiva: </strong>Realiza búsquedas directas de películas a través de nuestro buscador optimizado o
                        navega por diversas listas predefinidas:


                        <List>
                            <ListItemButton>
                                <ListItemIcon>
                                    <MovieIcon sx={{ color: 'white' }} />
                                </ListItemIcon>
                                <ListItemText primary="Películas en cartelera" />
                            </ListItemButton>

                            <ListItemButton>
                                <ListItemIcon>
                                    <MovieIcon sx={{ color: 'white' }} />                                 </ListItemIcon>
                                <ListItemText primary="Próximos estrenos" />
                            </ListItemButton>

                            <ListItemButton>
                                <ListItemIcon>
                                    <MovieIcon sx={{ color: 'white' }} />                                 </ListItemIcon>
                                <ListItemText primary="Películas mejor valoradas de la historia" />
                            </ListItemButton>

                            <ListItemButton>
                                <ListItemIcon>
                                    <MovieIcon sx={{ color: 'white' }} />                                 </ListItemIcon>
                                <ListItemText primary="Películas más populares" />
                            </ListItemButton>
                        </List>

                        <Box>
                            <Typography variant="body1" >
                                <strong>Interacción de Usuarios:</strong> Regístrate e inicia sesión como usuario para poder dejar
                                comentarios o reseñas sobre cualquier película. Tus opiniones quedarán registradas para que otros usuarios
                                puedan verlas y participar en la discusión.
                            </Typography>

                            <Typography variant="body1" >
                            <Box mt={2} /> {/* Añadir margen superior */}

                                <strong>Información Detallada de Películas:</strong>
                                Cada película cuenta con una página detallada que incluye:
                                <List>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <InfoIcon sx={{ color: 'white' }} /> {/* Icono en blanco */}
                                        </ListItemIcon>
                                        <ListItemText primary="Fecha de lanzamiento" sx={{ color: 'white' }} /> {/* Texto en blanco */}
                                    </ListItemButton>

                                    <ListItemButton>
                                        <ListItemIcon>
                                            <InfoIcon sx={{ color: 'white' }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Actores principales" sx={{ color: 'white' }} />
                                    </ListItemButton>

                                    <ListItemButton>
                                        <ListItemIcon>
                                            <InfoIcon sx={{ color: 'white' }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Sinopsis" sx={{ color: 'white' }} />
                                    </ListItemButton>

                                    <ListItemButton>
                                        <ListItemIcon>
                                            <InfoIcon sx={{ color: 'white' }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Video del tráiler" sx={{ color: 'white' }} />
                                    </ListItemButton>
                                </List>
                            </Typography>
                        </Box>
                    </Typography>
                </Box>

                {/* Sección derecha */}
                <Box
                    flex="1"
                    minWidth="300px"
                    mr={2}
                    mb={2}
                    p={2} // Padding interno
                    borderRadius={8} // Borde redondeado
                    sx={{
                        backgroundColor: 'rgba(33, 150, 243, 0.6)',
                        color: 'white', // Color del texto
                        boxShadow: 3 // Sombra
                    }}
                >
                    <Typography variant="body1" paragraph>
                        <strong>¿Qué tecnologías se han utilizado?</strong>
                        <br />
                        <Box mt={2} /> {/* Añadir margen superior */}
                        <strong sx={{ fontSize: '1.5rem' }}>Backend:</strong> {/* Texto más grande */}
                        <br />
                        Desarrollado en Java utilizando Spring Boot para garantizar un rendimiento sólido y escalabilidad. Se han
                        implementado capas separadas de repositorio, servicio y controlador para cada entidad, lo que mejora la
                        mantenibilidad del código. Uso de DTOs (Data Transfer Objects) para manejar datos de manera eficiente entre el
                        frontend y backend. Seguridad mejorada mediante autenticación con tokens JWT, lo que garantiza que cada
                        usuario que inicie sesión reciba un token de autenticación válido durante un tiempo específico.
                        <br />
                        <Box mt={5} /> {/* Añadir margen superior */}
                        <strong>Frontend:</strong>
                        <br />
                        Desarrollado en JavaScript utilizando React para una interfaz de usuario interactiva y dinámica. Integración
                        con una API externa de películas para optimizar el tiempo de desarrollo y enriquecer la base de datos con
                        contenido actualizado. Uso de Material UI para proporcionar componentes visuales consistentes y atractivos.
                        Implementación de Redux para la gestión eficiente del estado de la aplicación, asegurando una experiencia de
                        usuario fluida y rápida.
                    </Typography>
                </Box>
            </Box>

            <Box mt={4}>

            </Box>

            {/* Nuevo párrafo especial */}
            <Box
                fflex="1"
                minWidth="300px"
                mr={2}
                mb={2}
                p={2} // Padding interno
                borderRadius={8} // Borde redondeado
                sx={{
                    backgroundColor: 'rgba(128, 128, 128, 0.5)', // Color gris con 50% de opacidad
                    color: 'white', // Color del texto
                    boxShadow: 3 // Sombra
                }}
            >
                <Typography variant="body1" paragraph>
                    <strong>¿Qué hace especial a nuestra aplicación?</strong>
                    <br />
                    Nuestra aplicación no solo te permite explorar el mundo del cine de manera sencilla, sino que también
                    está construida con las mejores prácticas de desarrollo de software, utilizando tecnologías modernas
                    y eficientes. Queremos que descubras nuevas películas, interactúes con otros usuarios y siempre estés
                    informado sobre las últimas novedades del cine.
                </Typography>
            </Box>
        </Container>
    );
};

export default PaginaPrincipal;