import React, {useState} from 'react';
import { Box, Card, CardContent, CardActions, Button, Typography, TextField } from '@mui/material';
import { obtenerToken } from '../api-calls/appPeliculas';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utilidades/AuthContext';
import { useDispatch } from 'react-redux';
import { setUsuario } from '../reducers/usuarioSlice';

export const Login = () => {

    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();
    const dispatch = useDispatch();

    const manejarBotonLogin = async () => {
        try{
            const token = await obtenerToken(email, contrasena);
            if (token) {
                login();
                dispatch(setUsuario(token.usuarioDTO));
                navigate('/');
            } else {
                console.error('No se pudieron obtener usuarios.');
            }
        } catch (error) {
            console.error('Error al intentar obtener usuarios:', error);
        }
    };




    return (
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined"><CardContent>
                <Typography gutterBottom sx={{ color: 'text.primary', fontSize: 23 }}>
                    Iniciar sesión
                </Typography>
                <Box
                    component="form"
                    sx={{ '& .MuiTextField-root': { m: 1, width: '30ch' } }}
                    noValidate
                    autoComplete="off"
                >
                    <div>
                        <TextField required id="email" label="Correo electrónico" type="email" variant="outlined" 
                        value={email} // Controla el valor del campo con el estado
                        onChange={(e) => setEmail(e.target.value)} // Actualiza el estado cuando el usuario escribe
                        />
                    </div>
                    <div>
                        <TextField required id="contrasena" label="Contraseña" type="password" autoComplete="current-password" variant="outlined"
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)} 
                        />
                    </div>
                </Box>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center'}}>
                <Button variant="contained" disableElevation onClick={manejarBotonLogin}>
                    Iniciar Sesión
                </Button>
            </CardActions></Card>
        </Box>
    );
};

export default Login;

