import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import retrieveAllEmployeesReducer from './employees/retrieveAllEmployeesSlice'
import retrieveAllRegionsReducer from './regions/retrieveAllRegionsSlice'
import retrieveSingleRegionReducer from './regions/retrieveSingleRegionSlice'
import retrieveAllStoreStoreSectionsReducer from './storeSections/retrieveAllStoreStoreSectionsSlice'
import retrieveSingleStoreSectionReducer from './storeSections/retrieveSingleStoreSectionSlice'
import retrieveAllRegionStoresReducer from './stores/retrieveAllRegionStoresSlice'
import retrieveSingleStoreReducer from './stores/retrieveSingleStoreSlice'
import retrieveSingleStoreIncidentsCountReducer from './stores/retrieveSingleStoreIncidentsCountSlice'

const store = configureStore({
    reducer: {
        authState: authReducer,
        allRegions: retrieveAllRegionsReducer,
        singleRegion: retrieveSingleRegionReducer,
        allRegionStores: retrieveAllRegionStoresReducer,
        allEmployees: retrieveAllEmployeesReducer,
        singleStore: retrieveSingleStoreReducer,
        singleStoreSection: retrieveSingleStoreSectionReducer,
        allStoreStoreSections: retrieveAllStoreStoreSectionsReducer,
        singleStoreIncidentsCount: retrieveSingleStoreIncidentsCountReducer
    }
})


export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch