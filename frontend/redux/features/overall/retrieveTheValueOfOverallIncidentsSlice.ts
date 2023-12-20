import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from "../store"


export const retrieveTheValueOfOverallIncidents = createAsyncThunk("overall/value", async () => {
    const response = await axios.get("http://localhost:8000/incidents/overall/value")
    const data = response.data
    return data
})


const initialState: ITotalData = {
    is_loaded: false,
    total_values: 0
}


export const retrieveTheValueOfOverallIncidentsSlice = createSlice({
    name: "overall/value",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(retrieveTheValueOfOverallIncidents.pending, (state) => {
                state.is_loaded = false
            })
            .addCase(retrieveTheValueOfOverallIncidents.fulfilled, (state, action: PayloadAction<ITotal>) => {
                state.is_loaded = true
                state.total_values = action.payload.total_values
            })
            .addCase(retrieveTheValueOfOverallIncidents.rejected, (state) => {
                state.is_loaded = false
            })
    }
})

export const selectTheOverallTotalValueOfIncidents = (state: RootState) => state.overallIncidentsValue

export default retrieveTheValueOfOverallIncidentsSlice.reducer