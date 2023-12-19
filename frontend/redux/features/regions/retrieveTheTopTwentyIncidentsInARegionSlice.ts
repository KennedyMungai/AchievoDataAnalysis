import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from "../store"



export const retrieveTheTopTwentyIncidentsInARegion = createAsyncThunk('region/topTwenty', async (regionId: number) => {
    const response = await axios.get(`http://localhost:8000/incidents/region/top_twenty/${regionId}`)
    const data = response.data
    return data
})


const initialState: IIncidentsData = {
    incidents: [],
    is_loaded: false
}


export const retrieveTheTopTwentyIncidentsInARegionSlice = createSlice({
    name: 'region/topTwenty',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(retrieveTheTopTwentyIncidentsInARegion.pending, (state) => {
                state.is_loaded = false
            })
            .addCase(retrieveTheTopTwentyIncidentsInARegion.fulfilled, (state, action: PayloadAction<IIncident[]>) => {
                state.is_loaded = true
                state.incidents = action.payload
            })
            .addCase(retrieveTheTopTwentyIncidentsInARegion.rejected, (state) => {
                state.is_loaded = false
            })
    }
})

export const selectTopTwentyIncidentsInARegion = (state: RootState) => state.theTopTwentyIncidentsInARegion.incidents

export default retrieveTheTopTwentyIncidentsInARegionSlice.reducer