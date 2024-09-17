import React, { useState } from 'react';
import { Box, Card, CardContent, CardActions, Button, Typography, TextField } from '@mui/material';
import { obtenerToken } from '../api-calls/appPeliculas';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utilidades/AuthContext';
import { useDispatch } from 'react-redux';
import { setUsuario } from '../reducers/usuarioSlice';
import { Alert } from '@mui/material';

export const Login = () => {

    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();
    const dispatch = useDispatch();
    const [errores, setErrores] = useState({});
    const [mensajeError, setMensajeError] = useState('');



    const validarFormulario = () => {
        const nuevosErrores = {};
        if (!email) {
            nuevosErrores.email = 'El correo electrónico es obligatorio';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            nuevosErrores.email = 'El correo electrónico no es válido';
        }
        if (!contrasena) {
            nuevosErrores.contrasena = 'La contraseña es obligatoria';
        }
        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const manejarBotonLogin = async () => {
        if (!validarFormulario()) return;

        try {
            const token = await obtenerToken(email, contrasena);
            if (token) {
                login();
                dispatch(setUsuario(token.usuarioDTO));
                navigate('/');
            } else {
                console.error('Error al intentar iniciar sesión');
                setMensajeError('Error al intentar iniciar sesión. Por favor, verifica tus credenciales.');

            }
        } catch (error) {
            setMensajeError('Error al intentar iniciar sesión. Por favor, intenta nuevamente.');
            console.error('Error al intentar iniciar sesión:', error);
        }
    };




    return (
        <Box sx={{ minWidth: 275, marginTop: 25 }}>
            <Card variant="outlined"><CardContent>
                <Typography gutterBottom sx={{ color: 'text.primary', fontSize: 23 }}>
                    Iniciar sesión
                </Typography>
                {mensajeError && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {mensajeError}
                        </Alert>
                    )}
                <Box
                    component="form"
                    sx={{ '& .MuiTextField-root': { m: 1, width: '30ch' } }}
                    noValidate
                    autoComplete="off"
                >
                    <div>
                        <TextField
                            required
                            id="email"
                            label="Correo electrónico"
                            type="email"
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={!!errores.email}
                            helperText={errores.email}
                        />
                    </div>
                    <div>
                        <TextField
                            required
                            id="contrasena"
                            label="Contraseña"
                            type="password"
                            autoComplete="current-password"
                            variant="outlined"
                            value={contrasena}
                            onChange={(e) => setContrasena(e.target.value)}
                            error={!!errores.contrasena}
                            helperText={errores.contrasena}
                        />
                    </div>
                </Box>
            </CardContent>
                <CardActions sx={{ justifyContent: 'center' }}>
                    <Button variant="contained" disableElevation onClick={manejarBotonLogin}>
                        Iniciar Sesión
                    </Button>
                </CardActions></Card>
        </Box>
    );
};

export default Login;

