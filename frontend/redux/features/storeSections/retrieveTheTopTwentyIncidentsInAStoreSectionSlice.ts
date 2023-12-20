import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from "../store"


export const retrieveTheTopTwentyIncidentsInAStoreSection = createAsyncThunk("storeSections/topTwentyIncidents", async (storeSectionId: number) => {
    const response = await axios.get(`http://localhost:8000/incidents/store_section/top_twenty/${storeSectionId}`)
    const data = response.data
    return data
})


const initialState: IIncidentsData = {
    incidents: [],
    is_loaded: false
}


export const retrieveTheTopTwentyIncidentsInAStoreSectionSlice = createSlice({
    name: "retrieveTheTopTwentyIncidentsInAStoreSection",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(retrieveTheTopTwentyIncidentsInAStoreSection.pending, (state) => {
                state.is_loaded = false
            })
            .addCase(retrieveTheTopTwentyIncidentsInAStoreSection.fulfilled, (state, action: PayloadAction<IIncident[]>) => {
                state.incidents = action.payload
                state.is_loaded = true
            })
            .addCase(retrieveTheTopTwentyIncidentsInAStoreSection.rejected, (state) => {
                state.is_loaded = false
            })
    }
})

export const selectTheTopTwentyIncidentsInAStoreSection = (state: RootState) => state.theTopTwentyIncidentsInAStoreSection.incidents

export default retrieveTheTopTwentyIncidentsInAStoreSectionSlice.reducer