import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from "../store"


export const retrieveTheNumberOfIncidentsInAGivenRegion = createAsyncThunk("regions/count", async (regionId: number) => {
    const response = await axios.get(`http://localhost:8000/incidents/region/count/${regionId}`)
    const data = response.data
    return data
})


const initialState: ICountData = {
    is_loaded: false,
    count: 0
}


export const retrieveTheNumberOfIncidentsInAGivenRegionSlice = createSlice({
    name: 'regions/count',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(retrieveTheNumberOfIncidentsInAGivenRegion.pending, (state) => {
                state.is_loaded = false
            })
            .addCase(retrieveTheNumberOfIncidentsInAGivenRegion.fulfilled, (state, action: PayloadAction<ICount>) => {
                state.is_loaded = true
                state.count = action.payload.count
            })
            .addCase(retrieveTheNumberOfIncidentsInAGivenRegion.rejected, (state) => {
                state.is_loaded = false
            })
    }
})

export const selectTheIncidentCountPerRegion = (state: RootState) => state.singleRegionIncidentsCount.count

export default retrieveTheNumberOfIncidentsInAGivenRegionSlice.reducer