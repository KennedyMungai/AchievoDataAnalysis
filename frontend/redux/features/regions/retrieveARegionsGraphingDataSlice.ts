import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from "../store"


export const retrieveARegionsGraphingData = createAsyncThunk("regions/graphingData", async (regionId: number) => {
    const response = await axios.get(`http://localhost:8000/incidents/incidents/region/graphing_data/${regionId}`)
    return response.data
})


const initialState: IGraphData = {
    is_loaded: false,
    labels: [],
    data: []
}


export const retrieveARegionsGraphingDataSlice = createSlice({
    name: "regions/graphingData",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(retrieveARegionsGraphingData.pending, (state) => {
                state.is_loaded = false
            })
            .addCase(retrieveARegionsGraphingData.fulfilled, (state, action: PayloadAction<IGraph>) => {
                state.is_loaded = true
                state.labels = action.payload.labels
                state.data = action.payload.data
            })
            .addCase(retrieveARegionsGraphingData.rejected, (state) => {
                state.is_loaded = false
            })
    }
})

export const selectARegionsGraphingDataLabels = (state: RootState) => state.theRegionsGraphingData.labels
export const selectARegionsGraphingData = (state: RootState) => state.theRegionsGraphingData.data

export default retrieveARegionsGraphingDataSlice.reducer