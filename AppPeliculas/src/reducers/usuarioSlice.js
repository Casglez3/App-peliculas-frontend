import { createSlice } from "@reduxjs/toolkit";

const usuarioSlice = createSlice({
    name: "usuario",
    initialState: { id: null, nombre: null, apellidos: null, nick: null, email: null },
    reducers: {
        setUsuario(state, action) {
            const { id, nombre, apellidos, nick, email } = action.payload;
            state.id = id;
            state.nombre = nombre;
            state.apellidos = apellidos;
            state.nick = nick;
            state.email = email;
        }
    }
});

export const { setUsuario } = usuarioSlice.actions;
export default usuarioSlice.reducer;