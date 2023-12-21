import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from "../store"


export const retrieveTheAverageValueOfAllIncidentsInAStoreSection = createAsyncThunk("storeSection/average", async (storeSectionId: number) => {
    const response = await axios.get(`http://localhost:8000/incidents/store_section/average/${storeSectionId}`)
    const data = response.data
    return data
})


const initialState: IAverageData = {
    is_loaded: false,
    average_value: 0
}


export const retrieveTheAverageValueOfAllTheIncidentsInAStoreSectionSlice = createSlice({
    name: "storeSection/average",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(retrieveTheAverageValueOfAllIncidentsInAStoreSection.pending, (state) => {
                state.is_loaded = false
            })
            .addCase(retrieveTheAverageValueOfAllIncidentsInAStoreSection.fulfilled, (state, action: PayloadAction<IAverage>) => {
                state.is_loaded = true
                state.average_value = action.payload.average_value
            })
            .addCase(retrieveTheAverageValueOfAllIncidentsInAStoreSection.rejected, (state) => {
                state.is_loaded = false
            })
    }
})

export const selectTheAverageValueOfAllIncidentsInAStoreSection = (state: RootState) => state.theAverageValueOfAllIncidentsInAStoreSection.average_value

export default retrieveTheAverageValueOfAllTheIncidentsInAStoreSectionSlice.reducer