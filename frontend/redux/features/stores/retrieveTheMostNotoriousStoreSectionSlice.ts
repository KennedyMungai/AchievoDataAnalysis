import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from "../store"


export const retrieveTheMostNotoriousStoreSection = createAsyncThunk("stores/mostNotoriousSection", async (storeId: number) => {
    const response = await axios.get(`http://localhost:8000/incidents/store/max/store_sections/${storeId}`)
    const data = response.data
    return data
})


export const retrieveTheMostNotoriousStoreSectionSlice = createSlice({
    name: "stores/mostNotoriousSection",
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(retrieveTheMostNotoriousStoreSection.fulfilled, (state, action) => {
            return action.payload
        })
        builder.addCase(retrieveTheMostNotoriousStoreSection.rejected, (state, action) => {
            return {}
        })
        builder.addCase(retrieveTheMostNotoriousStoreSection.pending, (state, action) => {
            return {}
        })
    }
})

export const selectMostNotoriousSectionData = (state: RootState) => state.theMostNotoriousStoreSection

export default retrieveTheMostNotoriousStoreSectionSlice.reducer