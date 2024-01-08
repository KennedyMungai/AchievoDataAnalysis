import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import dateReducer from './date/dateSlice'
import retrieveAllEmployeesReducer from './employees/retrieveAllEmployeesSlice'
import retrieveSingleEmployeeReducer from './employees/retrieveSingleEmployeesSlice'
import retrieveTheMostNotoriousIncidentReportedByAnEmployeeReducer from './employees/retrieveTheMostNotoriousIncidentReportedByAnEmployeeSlice'
import retrieveTheNumberOfIncidentsReportedByAnEmployeeReducer from './employees/retrieveTheNumberOfIncidentsReportedByAnEmployeeSlice'
import retrieveTheTenMostNotoriousIncidentReportedByAnEmployeeReducer from './employees/retrieveTheTenMostNotoriousIncidentReportedByAnEmployeeSlice'
import retrieveTheValueOfIncidentsReportedByAnEmployee from './employees/retrieveTheValueOfIncidentsReportedByAnEmployeeSlice'
import retrieveTheMostNotoriousRegionReducer from './overall/retrieveTheMostNotoriousRegionSlice'
import retrieveTheNumberOfOverallIncidentsReducer from './overall/retrieveTheNumberOfOverallIncidentsSlice'
import retrieveTheTopTwentyMostNotoriousOverallIncidentsReducer from './overall/retrieveTheTopTwentyMostNotoriousOverallIncidentsSlice'
import retrieveTheValueOfOverallIncidentsReducer from './overall/retrieveTheValueOfOverallIncidentsSlice'
import retrieveAllRegionsReducer from './regions/retrieveAllRegionsSlice'
import retrieveSingleRegionReducer from './regions/retrieveSingleRegionSlice'
import retrieveTheMostNotoriousStoreInARegionReducer from './regions/retrieveTheMostNotoriousStoreInARegionSlice'
import retrieveTheNumberOfIncidentsInAGivenRegionReducer from './regions/retrieveTheNumberOfIncidentsInAGivenRegionSlice'
import retrieveTheTopTwentyIncidentsInARegionReducer from './regions/retrieveTheTopTwentyIncidentsInARegionSlice'
import retrieveTheTotalValueOfAllIncidentsInARegionReducer from './regions/retrieveTheValueOfAllIncidentsInARegionSlice'
import retrieveAllStoreStoreSectionsReducer from './storeSections/retrieveAllStoreStoreSectionsSlice'
import retrieveSingleStoreSectionReducer from './storeSections/retrieveSingleStoreSectionSlice'
import retrieveTheMostNotoriousIncidentInAStoreSectionReducer from './storeSections/retrieveTheMostNotoriousIncidentInAStoreSectionSlice'
import retrieveTheNumberOfAllTheIncidentsInAStoreSectionReducer from './storeSections/retrieveTheNumberOfAllTheIncidentsInAStoreSectionSlice'
import retrieveTheTopTwentyIncidentsInAStoreSectionReducer from './storeSections/retrieveTheTopTwentyIncidentsInAStoreSectionSlice'
import retrieveTheValueOfAllIncidentsInAStoreSectionReducer from './storeSections/retrieveTheValueOfAllTheIncidentsInAStoreSectionSlice'
import retrieveAllRegionStoresReducer from './stores/retrieveAllRegionStoresSlice'
import retrieveSingleStoreIncidentsCountReducer from './stores/retrieveSingleStoreIncidentsCountSlice'
import retrieveSingleStoreIncidentsValueReducer from './stores/retrieveSingleStoreIncidentsValueSlice'
import retrieveSingleStoreReducer from './stores/retrieveSingleStoreSlice'
import retrieveTheMostNotoriousStoreSectionReducer from './stores/retrieveTheMostNotoriousStoreSectionSlice'
import retrieveTopTwentyMostValuableIncidentsInAStoreReducer from './stores/retrieveTopTwentyMostValuableIncidentsInAStoreSlice'
import retrieveTheStoreGraphingDataReducer from './stores/retrieveTheStoreGraphingDataSlice'
import retrieveTheOverallGraphingDataReducer from './overall/retrieveTheOverallGraphingDataSlice'


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
        topTwentyMostValuableIncidentsInAStore: retrieveTopTwentyMostValuableIncidentsInAStoreReducer,
        theMostNotoriousStoreSection: retrieveTheMostNotoriousStoreSectionReducer,
        dateState: dateReducer,
        theTopTwentyIncidentsInARegion: retrieveTheTopTwentyIncidentsInARegionReducer,
        singleRegionIncidentsCount: retrieveTheNumberOfIncidentsInAGivenRegionReducer,
        singleRegionIncidentsValue: retrieveTheTotalValueOfAllIncidentsInARegionReducer,
        theMostNotoriousStoreInARegion: retrieveTheMostNotoriousStoreInARegionReducer,
        topTwentyMostValuableIncidentsOverall: retrieveTheTopTwentyMostNotoriousOverallIncidentsReducer,
        overallIncidentsCount: retrieveTheNumberOfOverallIncidentsReducer,
        overallIncidentsValue: retrieveTheValueOfOverallIncidentsReducer,
        theMostNotoriousRegionOverall: retrieveTheMostNotoriousRegionReducer,
        theTopTwentyIncidentsInAStoreSection: retrieveTheTopTwentyIncidentsInAStoreSectionReducer,
        theValueOfAllIncidentsInAStoreSection: retrieveTheValueOfAllIncidentsInAStoreSectionReducer,
        theNumberOfAllTheIncidentsInAStoreSection: retrieveTheNumberOfAllTheIncidentsInAStoreSectionReducer,
        theMostNotoriousIncidentInAStoreSection: retrieveTheMostNotoriousIncidentInAStoreSectionReducer,
        singleEmployee: retrieveSingleEmployeeReducer,
        numberOfIncidentsReportedByAnEmployee: retrieveTheNumberOfIncidentsReportedByAnEmployeeReducer,
        valueOfIncidentsReportedByAnEmployee: retrieveTheValueOfIncidentsReportedByAnEmployee,
        theMostNotoriousIncidentReportedByAnEmployee: retrieveTheMostNotoriousIncidentReportedByAnEmployeeReducer,
        theTenMostNotoriousIncidentsReportedByAnEmployee: retrieveTheTenMostNotoriousIncidentReportedByAnEmployeeReducer,
        theStoreGraphingData: retrieveTheStoreGraphingDataReducer,
        theOverallGraphingData: retrieveTheOverallGraphingDataReducer,
    }
})


export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch