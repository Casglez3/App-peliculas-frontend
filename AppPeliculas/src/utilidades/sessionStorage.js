
export const setToken = (token) => {
    sessionStorage.setItem('token', token);
};

export const getToken = () => {
    return sessionStorage.getItem('token');
  };

export const setFechaExpiracion = (fechaExpiracion) => {
    sessionStorage.setItem('fechaExpiracion', fechaExpiracion);
};

export const getFechaExpiracion = () => {
    return sessionStorage.getItem('fechaExpiracion');
};


export const removeToken = () => {
    sessionStorage.removeItem('token');
    };

export const removeFechaExpiracion = () => {
    sessionStorage.removeItem('fechaExpiracion');
    }