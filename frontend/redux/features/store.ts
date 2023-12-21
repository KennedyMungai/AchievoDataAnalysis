import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import dateReducer from './date/dateSlice'
import retrieveAllEmployeesReducer from './employees/retrieveAllEmployeesSlice'
import retrieveSingleEmployeeReducer from './employees/retrieveSingleEmployeesSlice'
import retrieveTheNumberOfIncidentsReportedByAnEmployeeReducer from './employees/retrieveTheNumberOfIncidentsReportedByAnEmployeeSlice'
import retrieveTheValueOfIncidentsReportedByAnEmployee from './employees/retrieveTheValueOfIncidentsReportedByAnEmployeeSlice'
import retrieveTheAverageValueOfOverallIncidentsReducer from './overall/retrieveTheAverageValueOfOverallIncidentsSlice'
import retrieveTheMostNotoriousRegionReducer from './overall/retrieveTheMostNotoriousRegionSlice'
import retrieveTheNumberOfOverallIncidentsReducer from './overall/retrieveTheNumberOfOverallIncidentsSlice'
import retrieveTheTopTwentyMostNotoriousOverallIncidentsReducer from './overall/retrieveTheTopTwentyMostNotoriousOverallIncidentsSlice'
import retrieveTheValueOfOverallIncidentsReducer from './overall/retrieveTheValueOfOverallIncidentsSlice'
import retrieveAllRegionsReducer from './regions/retrieveAllRegionsSlice'
import retrieveSingleRegionReducer from './regions/retrieveSingleRegionSlice'
import retrieveTheAverageValueOfAllIncidentsInARegionReducer from './regions/retrieveTheAverageValueOfAllIncidentsInARegionSlice'
import retrieveTheMostNotoriousStoreInARegionReducer from './regions/retrieveTheMostNotoriousStoreInARegionSlice'
import retrieveTheNumberOfIncidentsInAGivenRegionReducer from './regions/retrieveTheNumberOfIncidentsInAGivenRegionSlice'
import retrieveTheTopTwentyIncidentsInARegionReducer from './regions/retrieveTheTopTwentyIncidentsInARegionSlice'
import retrieveTheTotalValueOfAllIncidentsInARegionReducer from './regions/retrieveTheValueOfAllIncidentsInARegionSlice'
import retrieveAllStoreStoreSectionsReducer from './storeSections/retrieveAllStoreStoreSectionsSlice'
import retrieveSingleStoreSectionReducer from './storeSections/retrieveSingleStoreSectionSlice'
import retrieveTheAverageValueOfAllTheIncidentsInAStoreSectionReducer from './storeSections/retrieveTheAverageValueOfAllTheIncidentsInAStoreSectionSlice'
import retrieveTheMostNotoriousIncidentInAStoreSectionReducer from './storeSections/retrieveTheMostNotoriousIncidentInAStoreSectionSlice'
import retrieveTheNumberOfAllTheIncidentsInAStoreSectionReducer from './storeSections/retrieveTheNumberOfAllTheIncidentsInAStoreSectionSlice'
import retrieveTheTopTwentyIncidentsInAStoreSectionReducer from './storeSections/retrieveTheTopTwentyIncidentsInAStoreSectionSlice'
import retrieveTheValueOfAllIncidentsInAStoreSectionReducer from './storeSections/retrieveTheValueOfAllTheIncidentsInAStoreSectionSlice'
import retrieveAllRegionStoresReducer from './stores/retrieveAllRegionStoresSlice'
import retrieveSingleStoreAverageIncidentValueReducer from './stores/retrieveSingleStoreIncidentsAverageSlice'
import retrieveSingleStoreIncidentsCountReducer from './stores/retrieveSingleStoreIncidentsCountSlice'
import retrieveSingleStoreIncidentsValueReducer from './stores/retrieveSingleStoreIncidentsValueSlice'
import retrieveSingleStoreReducer from './stores/retrieveSingleStoreSlice'
import retrieveTheMostNotoriousStoreSectionReducer from './stores/retrieveTheMostNotoriousStoreSectionSlice'
import retrieveTopTwentyMostValuableIncidentsInAStoreReducer from './stores/retrieveTopTwentyMostValuableIncidentsInAStoreSlice'


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
        singleStoreIncidentsCount: retrieveSingleStoreIncidentsCountReducer,
        singleStoreIncidentsValue: retrieveSingleStoreIncidentsValueReducer,
        singleStoreIncidentsAverage: retrieveSingleStoreAverageIncidentValueReducer,
        topTwentyMostValuableIncidentsInAStore: retrieveTopTwentyMostValuableIncidentsInAStoreReducer,
        theMostNotoriousStoreSection: retrieveTheMostNotoriousStoreSectionReducer,
        dateState: dateReducer,
        theTopTwentyIncidentsInARegion: retrieveTheTopTwentyIncidentsInARegionReducer,
        singleRegionIncidentsCount: retrieveTheNumberOfIncidentsInAGivenRegionReducer,
        singleRegionIncidentsValue: retrieveTheTotalValueOfAllIncidentsInARegionReducer,
        singleRegionIncidentsAverage: retrieveTheAverageValueOfAllIncidentsInARegionReducer,
        theMostNotoriousStoreInARegion: retrieveTheMostNotoriousStoreInARegionReducer,
        topTwentyMostValuableIncidentsOverall: retrieveTheTopTwentyMostNotoriousOverallIncidentsReducer,
        overallIncidentsCount: retrieveTheNumberOfOverallIncidentsReducer,
        overallIncidentsValue: retrieveTheValueOfOverallIncidentsReducer,
        overallIncidentsAverage: retrieveTheAverageValueOfOverallIncidentsReducer,
        theMostNotoriousRegionOverall: retrieveTheMostNotoriousRegionReducer,
        theTopTwentyIncidentsInAStoreSection: retrieveTheTopTwentyIncidentsInAStoreSectionReducer,
        theValueOfAllIncidentsInAStoreSection: retrieveTheValueOfAllIncidentsInAStoreSectionReducer,
        theNumberOfAllTheIncidentsInAStoreSection: retrieveTheNumberOfAllTheIncidentsInAStoreSectionReducer,
        theAverageValueOfAllIncidentsInAStoreSection: retrieveTheAverageValueOfAllTheIncidentsInAStoreSectionReducer,
        theMostNotoriousIncidentInAStoreSection: retrieveTheMostNotoriousIncidentInAStoreSectionReducer,
        singleEmployee: retrieveSingleEmployeeReducer,
        numberOfIncidentsReportedByAnEmployee: retrieveTheNumberOfIncidentsReportedByAnEmployeeReducer,
        valueOfIncidentsReportedByAnEmployee: retrieveTheValueOfIncidentsReportedByAnEmployee
    }
})


export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch