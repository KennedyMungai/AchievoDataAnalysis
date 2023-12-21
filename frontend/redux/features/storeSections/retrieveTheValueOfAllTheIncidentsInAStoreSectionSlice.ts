import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from "../store"


export const retrieveTheValueOfAllIncidentsInAStoreSection = createAsyncThunk("storeSections/totalValue", async (storeSectionId:number) => {
    const response = await axios.get(`http://localhost:8000/incidents/store_section/value/${storeSectionId}`)
    const data = response.data
    return data
})


const initialState: ITotalData = {
    is_loaded: false,
    total_values: 0
}


export const retrieveTheValueOfAllIncidentsInAStoreSectionSlice = createSlice({
    name: "retrieveTheValueOfAllIncidentsInAStoreSection",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(retrieveTheValueOfAllIncidentsInAStoreSection.pending, (state) => {
                state.is_loaded = false
            })
            .addCase(retrieveTheValueOfAllIncidentsInAStoreSection.fulfilled, (state, action: PayloadAction<ITotal>) => {
                state.is_loaded = true
                state.total_values = action.payload.total_values
            })
            .addCase(retrieveTheValueOfAllIncidentsInAStoreSection.rejected, (state) => {
                state.is_loaded = false
            })
    }
})

export const selectTheTotalValueOfIncidentsInAStoreSection = (state: RootState) => state.theValueOfAllIncidentsInAStoreSection.total_values

export default retrieveTheValueOfAllIncidentsInAStoreSectionSlice.reducer