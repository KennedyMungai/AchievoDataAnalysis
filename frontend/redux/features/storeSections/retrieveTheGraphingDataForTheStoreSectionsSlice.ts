import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from "../store"


export const retrieveTheStoreSectionGraphingData = createAsyncThunk("storeSection/graphingData", async (storeSectionId: number) => {
    const response = await axios.get(`http://localhost:8000/incidents/incidents/store_section/graphing_data/${storeSectionId}`)
    return response.data
})


const initialState: IGraphData = {
    is_loaded: false,
    labels: [],
    data: []
}


export const retrieveTheStoreSectionGraphingDataSlice = createSlice({
    name: "storeSection/graphingData",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(retrieveTheStoreSectionGraphingData.pending, (state) => {
                state.is_loaded = false
            })
            .addCase(retrieveTheStoreSectionGraphingData.fulfilled, (state, action: PayloadAction<IGraph>) => {
                state.is_loaded = true
                state.labels = action.payload.labels
                state.data = action.payload.data
            })
            .addCase(retrieveTheStoreSectionGraphingData.rejected, (state) => {
                state.is_loaded = false
            })
    }
})

export const selectAStoreSectionsDataLabels = (state: RootState) => state.theStoreSectionGraphingData.labels
export const selectAStoreSectionsData = (state: RootState) => state.theStoreSectionGraphingData.data

export default retrieveTheStoreSectionGraphingDataSlice.reducer