import { createSlice, PayloadAction } from '@reduxjs/toolkit'


type InitialState = {
    value: AuthState;
}

type AuthState = {
    isAuth: boolean;
    username: string;
    uid: string;
    loading: boolean;
}

const initialState = {
    value: {
        isAuth: false,
        username: '',
        uid: '',
        loading: true,
    } as AuthState,
} as InitialState;
 
export const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logOut: () => {
            return initialState
        },
        logIn: (state, action: PayloadAction<{ username: string, uid: string }>) => {
            return {
                value: {
                    isAuth: true,
                    username: action.payload.username,
                    uid: action.payload.uid,
                    loading: false,
                }
            }
        },
        notLogged: (state) => {
            return {
                value: {
                    isAuth: false,
                    username: '',
                    uid: '',
                    loading: false,
                }
            }
        }
    }
})

export const { logIn, logOut, notLogged } = auth.actions
export default auth.reducer
