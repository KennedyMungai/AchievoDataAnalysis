import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import retrieveAllRegionsReducer from './regions/retrieveAllRegionsSlice'
import retrieveSingleRegionReducer from './regions/retrieveSingleRegionSlice'

const store = configureStore({
    reducer: {
        authState: authReducer,
        allRegions: retrieveAllRegionsReducer,
        singleRegion: retrieveSingleRegionReducer
    }
})


export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch