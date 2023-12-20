import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from "../store"


export const retrieveTheMostNotoriousRegion = createAsyncThunk("overall/mostNotoriousRegion", async () => {
    const response = await axios.get('http://localhost:8000/incidents/overall/max/region')
    const data = response.data
    return data
})

const initialState: INotoriousRegionData = {
    is_loaded: false,
    region_name: "",
    max_value: 0
}


export const retrieveTheMostNotoriousRegionSlice = createSlice({
    name: "overall/mostNotoriousRegion",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(retrieveTheMostNotoriousRegion.pending, (state) => {
                state.is_loaded = false
            })
            .addCase(retrieveTheMostNotoriousRegion.fulfilled, (state, action: PayloadAction<INotoriousRegion>) => {
                state.is_loaded = true
                state.region_name = action.payload.region_name
                state.max_value = action.payload.max_value
            })
            .addCase(retrieveTheMostNotoriousRegion.rejected, (state) => {
                state.is_loaded = false
            })
    }
})

export const selectTheMostNotoriousRegionOverall = (state: RootState) => state.theMostNotoriousRegionOverall

export default retrieveTheMostNotoriousRegionSlice.reducer