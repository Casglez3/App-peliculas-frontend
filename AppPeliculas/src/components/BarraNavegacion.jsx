import React from 'react';
import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import { useAuth } from '../utilidades/AuthContext';

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor =
        theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[800];
    return {
        backgroundColor,
        height: theme.spacing(3),
        color: theme.palette.text.primary,
        fontWeight: theme.typography.fontWeightRegular,
        '&:hover, &:focus': {
            backgroundColor: emphasize(backgroundColor, 0.06),
        },
        '&:active': {
            boxShadow: theme.shadows[1],
            backgroundColor: emphasize(backgroundColor, 0.12),
        },
        fontSize: theme.typography.pxToRem(14),
        [theme.breakpoints.down('sm')]: {
            fontSize: theme.typography.pxToRem(12), // Reducción en pantallas pequeñas
        },
    };
});




const BarraNavegacion = () => {
    const { isAuthenticated, logout } = useAuth();

    return (
        <div className='barra-navegacion'>
            <Breadcrumbs aria-label="breadcrumb">
                <StyledBreadcrumb
                    component={Link}
                    to="/"
                    label="Página principal"
                    icon={<HomeIcon fontSize="small" />}
                    className='breadcrumb'
                />
                {!isAuthenticated && (
                    <StyledBreadcrumb
                        component={Link}
                        to='formulario-registro'
                        label="Registrarse"
                        className='breadcrumb'
                    />
                )}
                {!isAuthenticated && (
                    <StyledBreadcrumb
                        component={Link}
                        to="login"
                        label="Iniciar sesión"
                        className='breadcrumb'
                    />
                )}
                {isAuthenticated && (
                    <StyledBreadcrumb
                        component={Link}
                        to="login"
                        label="Cerrar sesión"
                        onClick={logout}
                        className='breadcrumb'
                    />
                )}
            </Breadcrumbs>
        </div>
    )
}

export default BarraNavegacion;
