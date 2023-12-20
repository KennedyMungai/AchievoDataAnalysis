import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from "../store"


export const retrieveTheTopTwentyMostNotoriousOverallIncidents = createAsyncThunk("overall/topTwentyIncidents", async () => {
    const response = await axios.get("http://localhost:8000/incidents/overall/top_twenty")
    const data = response.data
    return data
})


const initialState: IIncidentsData = {
    incidents: [],
    is_loaded: false
}


export const retrieveTheTopTwentyMostNotoriousOverallIncidentsSlice = createSlice({
    name: "overall/topTwentyIncidents",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(retrieveTheTopTwentyMostNotoriousOverallIncidents.pending, (state) => {
                state.is_loaded = false
            })
            .addCase(retrieveTheTopTwentyMostNotoriousOverallIncidents.fulfilled, (state, action: PayloadAction<IIncident[]>) => {
                state.is_loaded = true
                state.incidents = action.payload
            })
            .addCase(retrieveTheTopTwentyMostNotoriousOverallIncidents.rejected, (state) => {
                state.is_loaded = false
            })
    }
})

export const selectTheMostNotoriousIncidentsOverall = (state: RootState) => state.topTwentyMostValuableIncidentsOverall.incidents

export default retrieveTheTopTwentyMostNotoriousOverallIncidentsSlice.reducer