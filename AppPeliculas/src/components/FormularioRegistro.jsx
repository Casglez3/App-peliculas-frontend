import React, {useState} from 'react';
import { Box, Card, CardContent, CardActions, Button, Typography, Container, Alert } from '@mui/material';
import TextField from '@mui/material/TextField';
import { registrarUsuario } from '../api-calls/appPeliculas';


export const FormularioRegistro = () => {

    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [nick, setNick] = useState('');
    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [mensaje, setMensaje] = useState('');

    const manejarBotonRegistroUsuario = async () => {
        try{
            const respuestaRegistroUsuario = await registrarUsuario(nombre, apellidos, nick, email, contrasena);
            if (respuestaRegistroUsuario && respuestaRegistroUsuario.data) {
                 // Registro exitoso
                 setMensaje('¡Usuario registrado con éxito!');
            }
        } catch (error) {
            setMensaje('Error al intentar registrar el usuario.');
            console.error('Error al intentar registrar usuario:', error);
        }
    };

    const cardContent = (
        <div className='formulario-registro'>
            <CardContent>
            <Typography gutterBottom sx={{ color: 'text.primary', fontSize: { xs: 20, sm: 23 } }}>
            Registro de usuario
                </Typography>
                
                {/* Muestra el mensaje de éxito o error */}
                {mensaje && <Alert severity={mensaje.includes('éxito') ? 'success' : 'error'}>{mensaje}</Alert>}

                <Box
                    ccomponent="form"
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
                        <TextField required id="nick" label="Nick de usuario" variant="outlined"
                        value={nick}
                        onChange={(e) => setNick(e.target.value)}
                        fullWidth
                        />
                    </div>
                    <div>
                        <TextField required id="nombre" label="Nombre" variant="outlined" 
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>
                    <div>
                        <TextField required id="apellidos" label="Apellidos" variant="outlined" 
                        value={apellidos}  
                        onChange={(e) => setApellidos(e.target.value)}
                        />
                    </div>
                    <div>
                        <TextField required id="email" label="Correo electrónico" type="email" variant="outlined" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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

