import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"


export const retrieveTheAverageValueOfAllIncidentsInARegion = createAsyncThunk("region/averageValue", async (regionId: number) => {
    const response = await axios.get(`http://localhost:8000/incidents/region/average/${regionId}`)
    const data = response.data
    return data
})


const initialState: IAverageData = {
    is_loaded: false,
    average_value: 0
}


export const retrieveTheAverageValueOfAllIncidentsInARegionSlice = createSlice({
    name: "region/averageValue",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(retrieveTheAverageValueOfAllIncidentsInARegion.pending, (state) => {
                state.is_loaded = false
            })
            .addCase(retrieveTheAverageValueOfAllIncidentsInARegion.fulfilled, (state, action: PayloadAction<IAverage>) => {
                state.is_loaded = true
                state.average_value = action.payload.average_value
            })
            .addCase(retrieveTheAverageValueOfAllIncidentsInARegion.rejected, (state) => {
                state.is_loaded = false
            })
    }
})


export default retrieveTheAverageValueOfAllIncidentsInARegionSlice.reducer