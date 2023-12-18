import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from 'axios'
import { RootState } from "../store"


export const retrieveSingleStoreAverageIncidentValue = createAsyncThunk("stores/averageIncidentValue", async (storeId: number) => {
    const response = await axios.get(`http://localhost:8000/incidents/store/average/${storeId}`)
    const data = response.data
    return data
})

const initialState: IAverageData = {
    is_loaded: false,
    average_value: 0
}

export const retrieveSingleStoreAverageIncidentValueSlice = createSlice({
    name: "stores/averageIncidentValue",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(retrieveSingleStoreAverageIncidentValue.pending, (state) => {
                state.is_loaded = false
            })
            .addCase(retrieveSingleStoreAverageIncidentValue.fulfilled, (state, action: PayloadAction<IAverage>) => {
                state.is_loaded = true
                state.average_value = action.payload.average_value
            })
            .addCase(retrieveSingleStoreAverageIncidentValue.rejected, (state) => {
                state.is_loaded = false
            })
    }
})

export const selectSingleStoreAverageIncidentValue = (state: RootState) => state.singleStoreIncidentsAverage

export default retrieveSingleStoreAverageIncidentValueSlice.reducer