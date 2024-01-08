import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from "../store"


export const retrieveTheOverallGraphingData = createAsyncThunk('overall/graphingData', async () => {
    const response = await axios.get('http://localhost:8000/incidents/incidents/overall/graphing_data')
    return response.data
})


const initialState: IGraphData = {
    is_loaded: false,
    labels: [],
    data: []
}


export const retrieveTheOverallGraphingDataSlice = createSlice({
    name: 'overall/graphingData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(retrieveTheOverallGraphingData.pending, (state) => {
                state.is_loaded = false
            })
            .addCase(retrieveTheOverallGraphingData.fulfilled, (state, action: PayloadAction<IGraph>) => {
                state.is_loaded = true
                state.labels = action.payload.labels
                state.data = action.payload.data
            })
            .addCase(retrieveTheOverallGraphingData.rejected, (state, action) => {
                state.is_loaded = false
            })
    }
})

export const selectTheOverallGraphingDataLabels = (state: RootState) => state.theOverallGraphingData.labels
export const selectTheOverallGraphingData = (state: RootState) => state.theOverallGraphingData.data

export default retrieveTheOverallGraphingDataSlice.reducer