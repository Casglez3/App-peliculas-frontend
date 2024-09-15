import { createSlice } from '@reduxjs/toolkit';

const peliculaSlice = createSlice({
    name: 'pelicula',
    initialState: { idPelicula: null },
    reducers: {
        setIdPelicula(state, action) {
            state.idPelicula = action.payload;
        }
    }
});

export const { setIdPelicula } = peliculaSlice.actions;
export default peliculaSlice.reducer;

