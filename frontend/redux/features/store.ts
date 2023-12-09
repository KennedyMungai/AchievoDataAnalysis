import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'


const store = configureStore({
    reducer: {
        authState: authReducer
    }
})


export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch