import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: '',
    isAuthenticated: false,
    loading: true,
    loginError:'',
    registerError:'',
    sessionError:''
}

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        loadUser: (state, actions) => {
            state.currentUser = actions.payload
            state.isAuthenticated = true;
            state.loading = false
        },

        setLoading: (state, actions) => {
            state.loading = actions.payload;
        },
        setLoginError:(state, actions) => {
            state.loginError =actions.payload
        },
        setRegisterError:(state, actions) => {
            state.registerError = actions.payload
        },
        setSessionError:(state, actions) =>{
            state.sessionError = actions.payload
        }

    }
})

export default authSlice.reducer;
export const { loadUser, setLoading, setLoginError, setRegisterError, setSessionError } = authSlice.actions

