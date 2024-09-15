import React from 'react';
import { Breadcrumbs, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const BarraNavegacionSecundaria = () => {

    const navegacion = useNavigate();

    const manejarNavegacion = (ruta) => {
        navegacion(ruta);
    };

    return (
        <div className='barra-navegacion-secundaria'>
            <Breadcrumbs aria-label="breadcrumb">
                <Link
                    onClick={() => manejarNavegacion('/peliculas-en-cines')} 
                    underline="hover"
                    color="inherit"
                    style={{ cursor: 'pointer' }}
                >
                    Películas en cines
                </Link>
                <Link
                    onClick={() => manejarNavegacion('/peliculas-mejor-valoradas')} 
                    underline="hover"
                    color="inherit"
                    style={{ cursor: 'pointer' }}
                >
                    Películas mejor valoradas
                </Link>
                <Link
                    onClick={() => manejarNavegacion('/peliculas-proximos-estrenos')} 
                    underline="hover"
                    color="inherit"
                    style={{ cursor: 'pointer' }}
                >
                    Películas de próximos estrenos
                </Link>
                <Link
                    onClick={() => manejarNavegacion('/peliculas-populares')} 
                    underline="hover"
                    color="inherit"
                    style={{ cursor: 'pointer' }}
                >
                    Películas populares
                </Link>
            </Breadcrumbs>
        </div>
    );
};

export default BarraNavegacionSecundaria;
