import { createSlice, PayloadAction } from '@reduxjs/toolkit'


export interface AuthState {
    isAuth: boolean;
    loading: boolean;
    user: {
        username?: string,
        email?: string,
        uid?: string,
        photoURL?: string,
        color?: string,
    };
}

const initialState: AuthState = {
    isAuth: false,
    loading: true,
    user: {},
}
 
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logOut () {
            initialState
        },
        logIn (state, action: PayloadAction<any>) {
            state.isAuth = true
            state.loading = false
            state.user = action.payload
        },
        notLogged (state) {
            state.isAuth = false
            state.loading = false
            state.user = {}
        }
    }
})

export const { logIn, logOut, notLogged } = authSlice.actions
export default authSlice.reducer
