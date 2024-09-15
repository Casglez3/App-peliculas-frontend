import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import { Box, Divider } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { obtenerUsuarioPorId } from '../api-calls/appPeliculas';

const TarjetaComentario = ({ resena }) => {
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const obtenerUsuario = async (id) => {
            try {
                const respuestaUsuario = await obtenerUsuarioPorId(id);
                setUsuario(respuestaUsuario.data);
            } catch (error) {
                console.error('Error al obtener el usuario:', error);
            }
        };

        if (resena.usuarioId) {
            obtenerUsuario(resena.usuarioId);
        }
    }, [resena]);

    // Renderizar las estrellas basadas en la calificación
    const renderizarEstrellas = (calificacion) => {
        return Array.from({ length: 5 }).map((_, index) => (
            <StarIcon
                key={index}
                sx={{ color: index < calificacion ? '#FFD700' : '#E0E0E0' }} // Oro para estrellas llenas y gris para vacías
            />
        ));
    };

    return (
        <Card sx={{ minWidth: 275, mb: 2, border: '1px solid #E0E0E0', borderRadius: '8px' }}>
            <CardHeader
                title={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            {usuario ? usuario.nick : 'Usuario'}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {renderizarEstrellas(resena.calificacion)}
                        </Box>
                    </Box>
                }
                subheader={new Date(resena.fechaPublicacion).toLocaleDateString()} // Mostrar la fecha en formato legible
            />
            <Divider />
            <CardContent>
                <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: 14 }}>
                    {resena.comentario}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default TarjetaComentario;
