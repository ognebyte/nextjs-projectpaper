import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/authSlice'
import pageReducer from './features/pageSlice'
import projectReducer from './features/projectSlice'
import { TypedUseSelectorHook, useSelector } from 'react-redux'


export const store = configureStore({
    reducer: {
        authReducer,
        pageReducer,
        projectReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector