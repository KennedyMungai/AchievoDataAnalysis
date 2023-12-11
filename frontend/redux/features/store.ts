import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import retrieveAllEmployeesReducer from './employees/retrieveAllEmployeesSlice'
import retrieveAllRegionsReducer from './regions/retrieveAllRegionsSlice'
import retrieveSingleRegionReducer from './regions/retrieveSingleRegionSlice'
import retrieveAllRegionStoresReducer from './stores/retrieveAllRegionStoresSlice'

const store = configureStore({
    reducer: {
        authState: authReducer,
        allRegions: retrieveAllRegionsReducer,
        singleRegion: retrieveSingleRegionReducer,
        allRegionStores: retrieveAllRegionStoresReducer,
        allEmployees: retrieveAllEmployeesReducer
    }
})


export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch