import axios from "axios";

// Configuración de la API
const tokenApi = import.meta.env.VITE_DB_MOVIES_TOKEN;
const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200';


// Función para obtener las películas mejor valoradas
export const peliculasMejorValoradas = async ( page ) => {
    const opciones = {
        method: 'GET',
        url: `${url}/movie/top_rated`,
        params: { language: 'es', page },
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${tokenApi}`,
        }
    }

    try {
        const respuestaPeliculasMejorValoradas = await axios.request(opciones) // Hace la solicitud HTTP usando Axios
        return respuestaPeliculasMejorValoradas.data // Devuelve los datos de la respuesta

    } catch (error) {
        console.error('Error al obtener las películas mejor valoradas:', error); // Muestra el error en consola
        throw error; //Lanza el error para que sea manejado por el código que llama a esta función
    }
};



// Función para obtener las películas populares
export const peliculasPopulares = async (page) => {
    const opcionesPopulares = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/movie/popular',
        params: { language: 'es', page },
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${tokenApi}`,
        }
    }

    try {
        const respuestaPeliculasPopulares = await axios.request(opcionesPopulares)
        return respuestaPeliculasPopulares.data
    } catch (error) {
        console.error('Error al obtener las películas populares:', error);
        throw error;
    }
}



// Función para obtener las películas de próximos estrenos
export const peliculasProximosEstrenos = async (page) => {
    const opcionesProximosEstrenos = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/movie/upcoming',
        params: { language: 'es', page },
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${tokenApi}`,
        }
    }

    try {
        const respuestaPeliculasProximosEstrenos = await axios.request(opcionesProximosEstrenos)
        return respuestaPeliculasProximosEstrenos.data
    } catch (error) {
        console.error('Error al obtener las películas de próximos estrenos:', error);
        throw error;
    }
}




// Función para obtener las películas actualmente en cines
export const peliculasEnCines = async (page) => {    
    const opcionesEnCines = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/movie/now_playing',
        params: { language: 'es', page },
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${tokenApi}`,
        }
    }

    try {
        const respuestaPeliculasEnCines = await axios.request(opcionesEnCines)
        return respuestaPeliculasEnCines.data
    } catch (error) {
        console.error('Error al obtener las películas en cines:', error);
        throw error;
    }
}


// Función para obtener los detalles de la pelicula por ID
export const obtenerPeliculaPorId = async ( idPelicula, language = 'es' ) => {    
    const peliculaPorId = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/${idPelicula}`,
        params: {language},
        headers: {
            accept: 'application/json', 
            Authorization: `Bearer ${tokenApi}`,
        }
    }

    try {
        const respuestaPeliculaPorId = await axios.request(peliculaPorId)
        return respuestaPeliculaPorId.data
    } catch (error) {
        console.error('Error al obtener los detalles de la pelicula:', error);
        throw error;
    }
}


export const obtenerVideoPelicula = async ( idPelicula, language = 'es' ) => {    
    const videoPelicula = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/${idPelicula}/videos`,
        params: {language},
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${tokenApi}`,
        }
      };

    try {
        const respuestaVideoPelicula = await axios.request(videoPelicula)
        return respuestaVideoPelicula.data
    } catch (error) {
        console.error('Error al obtener el video de la pelicula:', error);
        throw error;
    }
}


export const obtenerCreditosPelicula = async ( idPelicula, language = 'es' ) => {    
    const creditosPelicula = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/${idPelicula}/credits`,
        params: {language},
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${tokenApi}`,
        }
      };

    try {
        const respuestaCreditosPelicula = await axios.request(creditosPelicula)
        return respuestaCreditosPelicula.data
    } catch (error) {
        console.error('Error al obtener los creditos de la pelicula:', error);
        throw error;
    }
}

