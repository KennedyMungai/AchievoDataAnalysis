import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from "../store"



export const retrieveTopTwentyMostValuableIncidentsInAStore = createAsyncThunk("stores/topTwentyIncidents", async (storeId: number) => {
    const response = await axios.get(`http://localhost:8000/incidents/store/top_twenty/${storeId}`)
    const data = response.data
    return data
})


const initialState: IIncidentsData = {
    incidents: [],
    is_loaded: false
}


export const retrieveTopTwentyMostValuableIncidentsInAStoreSlice = createSlice({
    name: "stores/topTwentyIncidents",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(retrieveTopTwentyMostValuableIncidentsInAStore.pending, (state) => {
                state.is_loaded = false
            })
            .addCase(retrieveTopTwentyMostValuableIncidentsInAStore.fulfilled, (state, action: PayloadAction<IIncident[]>) => {
                state.is_loaded = true
                state.incidents = action.payload
            })
            .addCase(retrieveTopTwentyMostValuableIncidentsInAStore.rejected, (state) => {
                state.is_loaded = false
            })
    }
})

export const selectTopTwentyMostValuableIncidentsInAStore = (state: RootState) => state.topTwentyMostValuableIncidentsInAStore.incidents

export default retrieveTopTwentyMostValuableIncidentsInAStoreSlice.reducer