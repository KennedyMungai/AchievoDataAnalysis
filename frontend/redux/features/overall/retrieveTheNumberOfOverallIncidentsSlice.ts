import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from "../store"


export const retrieveTheNumberOfOverallIncidents = createAsyncThunk("overall/count", async () => {
    const response = await axios.get("http://localhost:8000/incidents/overall/count")
    const data = response.data
    return data
})


const initialState: ICountData = {
    is_loaded: false,
    count: 0
}


export const retrieveTheNumberOfOverallIncidentsSlice = createSlice({
    name: "overall/count",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(retrieveTheNumberOfOverallIncidents.pending, (state) => {
                state.is_loaded = false
            })
            .addCase(retrieveTheNumberOfOverallIncidents.fulfilled, (state, action: PayloadAction<ICount>) => {
                state.is_loaded = true
                state.count = action.payload.count
            })
            .addCase(retrieveTheNumberOfOverallIncidents.rejected, (state) => {
                state.is_loaded = false
            })
    }
})

export const selectTheNumberOfOverallIncidents = (state: RootState) => state.overallIncidentsCount.count

export default retrieveTheNumberOfOverallIncidentsSlice.reducer