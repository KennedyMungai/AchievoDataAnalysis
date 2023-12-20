import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from "../store"


export const retrieveTheTotalValueOfAllIncidentsInARegion = createAsyncThunk("region/totalValue", async (regionId: number) => {
    const response = await axios.get(`http://localhost:8000/incidents/region/value/${regionId}`)
    const data = response.data
    return data
})


const initialState: ITotalData = {
    is_loaded: false,
    total_values: 0
}


export const retrieveTheValueOfAllIncidentsInARegionSlice = createSlice({
    name: 'region/totalValue',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(retrieveTheTotalValueOfAllIncidentsInARegion.pending, (state) => {
                state.is_loaded = false
            })
            .addCase(retrieveTheTotalValueOfAllIncidentsInARegion.fulfilled, (state, action: PayloadAction<ITotal>) => {
                state.is_loaded = true
                state.total_values = action.payload.total_values
            })
            .addCase(retrieveTheTotalValueOfAllIncidentsInARegion.rejected, (state) => {
                state.is_loaded = false
            })
    }
})

export const selectTheTotalValueOfIncidentsInARegion = (state: RootState) => state.singleRegionIncidentsValue

export default retrieveTheValueOfAllIncidentsInARegionSlice.reducer