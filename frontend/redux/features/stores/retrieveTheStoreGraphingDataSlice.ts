import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from "../store"


export const retrieveTheStoreGraphingData = createAsyncThunk('stores/graphingData', async (storeId: number) => {
    const response = await axios.get(`http://localhost:8000/incidents/store/value/store_sections/${storeId}`)
    return response.data
})


const initialState: IGraphData = {
    is_loaded: false,
    labels: [],
    data: []
}


export const retrieveTheStoreGraphingDataSlice = createSlice({
    name: 'graphingData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(retrieveTheStoreGraphingData.pending, (state) => {
                state.is_loaded = false
            })
            .addCase(retrieveTheStoreGraphingData.fulfilled, (state, action: PayloadAction<IGraph>) => {
                state.is_loaded = true
                state.labels = action.payload.labels
                state.data = action.payload.data
            })
            .addCase(retrieveTheStoreGraphingData.rejected, (state, action) => {
                state.is_loaded = false
            })
    }
})

export const selectTheStoreGraphingDataLabels = (state: RootState) => state.theStoreGraphingData.labels
export const selectTheStoreGraphingData = (state: RootState) => state.theStoreGraphingData.data

export default retrieveTheStoreGraphingDataSlice.reducer