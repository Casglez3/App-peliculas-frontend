import axios from 'axios';
import { getToken, setToken, setFechaExpiracion, getFechaExpiracion } from '../utilidades/sessionStorage';

export const obtenerToken = async (email, contrasena) => {
    try {
        const responseToken = await axios.post(`${import.meta.env.VITE_API_URL}/usuarios/auth`,
            {

                email: email,
                contrasena: contrasena
            }

        );

        //Obtiene el token de la respuesta
        const token = responseToken.data.token;
        const fechaExpiracion = responseToken.data.expiracion;

        //Si el token existe, lo guarda en el sessionstorage
        if (token) {
            setToken(token); // Guarda el token usando setToken
            setFechaExpiracion(fechaExpiracion); // Guarda la fecha de expiración
        }

        return responseToken.data;

    } catch (error) {
        // Maneja el error
        console.error('Error al realizar la solicitud de login:', error);
    }
};

export const comprobarValidezToken = () => {

    const token = getToken();
    const fechaExpiracion = new Date(getFechaExpiracion());
    if (token && fechaExpiracion.getTime() > Date.now()) {
        return true;
    } else {
        return false;
    }

}

export const registrarUsuario = async (nombre, apellidos, nick, email, contrasena) => {
    try {
        const respuestaRegistro = await axios.post(`${import.meta.env.VITE_API_URL}/usuarios/registro`,
            {

                nombre: nombre,
                apellidos: apellidos,
                nick: nick,
                email: email,
                contrasena: contrasena

            }

        );



        return respuestaRegistro;

    } catch (error) {
        // Maneja el error
        console.error('Error al realizar la solicitud de registro:', error);
    }
};


export const obtenerUsuarios = async (email, contrasena) => {
    try {

        // Intenta obtener el token ya sea llamando a la API o del almacenamiento de sesión
        let token;
        const tokenEsValido = comprobarValidezToken();
        // Si no hay un token en sessionStorage, obtén uno nuevo
        if (!tokenEsValido) {
            const respuestaToken = await obtenerToken(email, contrasena);
            token = respuestaToken.token;
        }

        // Realiza la solicitud para obtener usuarios solo si hay un token válido
        if (token) {
            const responseUsuarios = await axios.get(`${import.meta.env.VITE_API_URL}/usuarios`, {
                headers: {
                    'Authorization': `Bearer ${token}` // Header de autorización
                }
            });

            return responseUsuarios;
        } else {
            console.error('No se pudo obtener el token de autenticación.');
        }
    } catch (error) {
        // Maneja el error
        console.error('Error al obtener los usuarios:', error);
    }

};

export const guardarPelicula = async (pelicula) => {
    try {
        let token = getToken();
        const tokenEsValido = comprobarValidezToken();
        // Si no hay un token en sessionStorage, obtén uno nuevo
        if (!tokenEsValido) {
            const respuestaToken = await obtenerToken(email, contrasena);
            token = respuestaToken.token;
        }

        // Realiza la solicitud para guardar la película solo si hay un token válido
        if (token) {
            const responsePelicula = await axios.post(`${import.meta.env.VITE_API_URL}/peliculas`, {
                apiId: pelicula.apiId,
                titulo: pelicula.titulo,
                fechaLanzamiento: pelicula.fechaLanzamiento,
                imagen: pelicula.imagen,
                descripcion: pelicula.descripcion
            }, {
                headers: {
                    'Authorization': `Bearer ${token}` // Header de autorización
                }
            });

            // Maneja la respuesta como sea necesario
            return responsePelicula;
        } else {
            console.error('No se pudo obtener el token de autenticación.');

        }
    } catch (error) {
        // Maneja el error
        console.error('Error al guardar la película:', error);
    }
}

export const guardarComentario = async (resena) => {
    try {
        let token = getToken();
        const tokenEsValido = comprobarValidezToken();
        // Si no hay un token en sessionStorage, obtén uno nuevo
        if (!tokenEsValido) {
            const respuestaToken = await obtenerToken(email, contrasena);
            token = respuestaToken.token;
        }

        // Realiza la solicitud para guardar el comentario solo si hay un token válido
        if (token) {
            const responseComentario = await axios.post(`${import.meta.env.VITE_API_URL}/resenas`, {
                usuarioId: resena.usuarioId,
                peliculaId: resena.peliculaId,
                calificacion: resena.calificacion,
                comentario: resena.comentario,
                fechaPublicacion: resena.fechaPublicacion
            }, {
                headers: {
                    'Authorization': `Bearer ${token}` // Header de autorización
                }
            });

            // Maneja la respuesta como sea necesario
            return responseComentario;
        } else {
            console.error('No se pudo obtener el token de autenticación.');
        }
    }
    catch (error) {
        // Maneja el error
        console.error('Error al guardar el comentario:', error);
    }
}


export const obtenerPeliculasPorApiId = async (apiId, email, contrasena) => {
    try {
        let token = getToken();
        const tokenEsValido = comprobarValidezToken();
        // Si no hay un token en sessionStorage, obtén uno nuevo
        if (!tokenEsValido) {
            const respuestaToken = await obtenerToken(email, contrasena);
            token = respuestaToken.token;
        }

        // Realiza la solicitud para obtener la película por su apiId solo si hay un token válido
        if (token) {
            const responsePelicula = await axios.get(`${import.meta.env.VITE_API_URL}/peliculas/api/${apiId}`, {
                headers: {
                    'Authorization': `Bearer ${token}` // Header de autorización
                }
            });

            // Maneja la respuesta como sea necesario
            return responsePelicula;
        } else {
            console.error('No se pudo obtener el token de autenticación.');
        }
    } catch (error) {
        // Maneja el error
        console.error('Error al obtener la película:', error);
    }
}

export const obtenerResenaIdPelicula = async (peliculaId) => {
    try {
        let token = getToken();
        const tokenEsValido = comprobarValidezToken();
        // Si no hay un token en sessionStorage, obtén uno nuevo
        if (!tokenEsValido) {
            const respuestaToken = await obtenerToken(email, contrasena);
            token = respuestaToken.token;
        }

        // Realiza la solicitud para obtener la reseña por su id de película solo si hay un token válido
        if (token) {
            const responseResena = await axios.get(`${import.meta.env.VITE_API_URL}/resenas/peliculas/${peliculaId}`, {
                headers: {
                    'Authorization': `Bearer ${token}` // Header de autorización
                }
            });

            // Maneja la respuesta como sea necesario
            return responseResena;
        } else {
            console.error('No se pudo obtener el token de autenticación.');
        }

    
    }catch (error) {
        // Maneja el error
        console.error('Error al obtener la reseña:', error);
    }}



    export const obtenerUsuarioPorId = async (id) => {
        try {
            let token = getToken();
            const tokenEsValido = comprobarValidezToken();
            // Si no hay un token en sessionStorage, obtén uno nuevo
            if (!tokenEsValido) {
                const respuestaToken = await obtenerToken(email, contrasena);
                token = respuestaToken.token;
            }
    
            // Realiza la solicitud para obtener el usuario por su id solo si hay un token válido
            if (token) {
                const responseUsuario = await axios.get(`${import.meta.env.VITE_API_URL}/usuarios/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}` // Header de autorización
                    }
                });
    
                // Maneja la respuesta como sea necesario
                return responseUsuario;
            } else {
                console.error('No se pudo obtener el token de autenticación.');
            }
        } catch (error) {
            // Maneja el error
            console.error('Error al obtener el usuario:', error);
        }
    }