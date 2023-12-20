import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from "../store"


export const retrieveTheAverageValueOfOverallIncidents = createAsyncThunk("overall/average", async () => {
    const response = await axios.get("http://localhost:8000/incidents/overall/average")
    const data = response.data
    return data
})

const initialState: IAverageData = {
    is_loaded: false,
    average_value: 0
}


export const retrieveTheAverageValueOfOverallIncidentsSlice = createSlice({
    name: "overall/average",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(retrieveTheAverageValueOfOverallIncidents.pending, (state) => {
                state.is_loaded = false
            })
            .addCase(retrieveTheAverageValueOfOverallIncidents.fulfilled, (state, action: PayloadAction<IAverage>) => {
                state.is_loaded = true
                state.average_value = action.payload.average_value
            })
            .addCase(retrieveTheAverageValueOfOverallIncidents.rejected, (state) => {
                state.is_loaded = false
            })
    }
})

export const selectTheAverageValueOfAllIncidents = (state: RootState) => state.overallIncidentsAverage.average_value

export default retrieveTheAverageValueOfOverallIncidentsSlice.reducer