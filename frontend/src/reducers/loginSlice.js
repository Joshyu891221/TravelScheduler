import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        loginWithGoogle: false,
        userId: '',
        displayName: '',
        email: '',
        photoURL: '',
    },
    reducers: {
        register: (state, action) => {
            state.userId = action.payload.userId;  
        },
        loggedOut: (state) => {
            state.loginWithGoogle = false;
            state.displayName = '';
            state.email = '';
            state.photoURL = '';
        },
        getUser: (state, action) => {
            state.userId = action.payload.userId;
            state.displayName = action.payload.displayName;
            state.email = action.payload.email;
            state.photoURL = action.payload.photoURL;
        }
    }
});

export const { register, loggedOut, getUser } = loginSlice.actions;
export default loginSlice.reducer;