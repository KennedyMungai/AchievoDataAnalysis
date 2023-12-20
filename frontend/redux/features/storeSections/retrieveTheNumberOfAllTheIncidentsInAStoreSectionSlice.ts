import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from "../store"


export const retrieveTheNumberOfAllTheIncidentsInAStoreSection = createAsyncThunk("storeSections/count", async (storeSectionId: number) => {
    const response = await axios.get(`http://localhost:8000/incidents/store_section/count/${storeSectionId}`)
    const data = response.data
    return data
})


const initialState: ICountData = {
    is_loaded: false,
    count: 0
}


export const retrieveTheNumberOfAllTheIncidentsInAStoreSectionSlice = createSlice({
    name: "retrieveTheNumberOfAllTheIncidentsInAStoreSection",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(retrieveTheNumberOfAllTheIncidentsInAStoreSection.pending, (state) => {
                state.is_loaded = false
            })
            .addCase(retrieveTheNumberOfAllTheIncidentsInAStoreSection.fulfilled, (state, action: PayloadAction<ICount>) => {
                state.is_loaded = true
                state.count = action.payload.count
            })
            .addCase(retrieveTheNumberOfAllTheIncidentsInAStoreSection.rejected, (state) => {
                state.is_loaded = false
            })
    }
})

export const selectTheNumberOfIncidentsInAStoreSection = (state: RootState) => state.theNumberOfAllTheIncidentsInAStoreSection.count

export default retrieveTheNumberOfAllTheIncidentsInAStoreSectionSlice.reducer