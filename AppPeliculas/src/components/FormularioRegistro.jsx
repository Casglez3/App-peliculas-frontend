import React, { useState } from 'react';
import { Box, Card, CardContent, CardActions, Button, Typography, Container } from '@mui/material';
import TextField from '@mui/material/TextField';
import { registrarUsuario } from '../api-calls/appPeliculas';
import { useNavigate } from 'react-router-dom';



export const FormularioRegistro = () => {

    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [nick, setNick] = useState('');
    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [errores, setErrores] = useState({});

    const navigate = useNavigate();

    const validarFormulario = () => {
        const nuevosErrores = {};
        if (!nombre) nuevosErrores.nombre = 'El nombre es obligatorio';
        if (!apellidos) nuevosErrores.apellidos = 'Los apellidos son obligatorios';
        if (!nick) nuevosErrores.nick = 'El nick es obligatorio';
        if (!email) {
            nuevosErrores.email = 'El correo electrónico es obligatorio';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            nuevosErrores.email = 'El correo electrónico no es válido';
        }
        if (!contrasena) {
            nuevosErrores.contrasena = 'La contraseña es obligatoria';
        } else if (contrasena.length < 6) {
            nuevosErrores.contrasena = 'La contraseña debe tener al menos 6 caracteres';
        }
        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const manejarBotonRegistroUsuario = async () => {
        if (!validarFormulario()) return;

        try {
            const respuestaRegistroUsuario = await registrarUsuario(nombre, apellidos, nick, email, contrasena);
            if (respuestaRegistroUsuario && respuestaRegistroUsuario.data) {
                navigate('/login');
            }
        } catch (error) {
            console.error('Error al intentar registrar usuario:', error);
        }
    };


    const cardContent = (
        <div className='formulario-registro'>
            <CardContent>
                <Typography gutterBottom sx={{ color: 'text.primary', fontSize: { xs: 20, sm: 23 } }}>
                    Registro de usuario
                </Typography>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': {
                            m: 1,
                            width: { xs: '100%', sm: '45ch', md: '55ch' }, // Ancho responsive
                        },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div>
                        <TextField
                            required
                            id="nick"
                            label="Nick de usuario"
                            variant="outlined"
                            value={nick}
                            onChange={(e) => setNick(e.target.value)}
                            fullWidth
                            error={!!errores.nick}
                            helperText={errores.nick}
                        />
                    </div>
                    <div>
                        <TextField
                            required
                            id="nombre"
                            label="Nombre"
                            variant="outlined"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            fullWidth
                            error={!!errores.nombre}
                            helperText={errores.nombre}
                        />
                    </div>
                    <div>
                        <TextField
                            required
                            id="apellidos"
                            label="Apellidos"
                            variant="outlined"
                            value={apellidos}
                            onChange={(e) => setApellidos(e.target.value)}
                            fullWidth
                            error={!!errores.apellidos}
                            helperText={errores.apellidos}
                        />
                    </div>
                    <div>
                        <TextField
                            required
                            id="email"
                            label="Correo electrónico"
                            type="email"
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
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
                            fullWidth
                            error={!!errores.contrasena}
                            helperText={errores.contrasena}
                        />
                    </div>
                </Box>

            </CardContent>
            <CardActions sx={{ justifyContent: 'center' }}>
                <Button variant="contained" disableElevation onClick={manejarBotonRegistroUsuario}>
                    Registrar usuario
                </Button>
            </CardActions>
        </div>
    );

    return (
        <Container maxWidth="sm" sx={{ mt: 15 }}>
            <Card variant="outlined">{cardContent}</Card>
        </Container>
    );
};

export default FormularioRegistro;

