import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios"
import { RootState } from "../store";


export const retrieveSingleStoresIncidentsValue = createAsyncThunk("stores/totalIncidentsValue", async (storeId: number) => {
    const response = await axios.get(`http://localhost:8000/incidents/store/value/${storeId}`)
    const data = response.data
    return data
})

const initialState: ITotalData = {
    is_loaded: false,
    total_values: 0
}


export const retrieveSingleStoreIncidentsValueSlice = createSlice({
    name: 'stores/totalIncidentsValue',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(retrieveSingleStoresIncidentsValue.pending, (state) => {
                state.is_loaded = false
            })
            .addCase(retrieveSingleStoresIncidentsValue.fulfilled, (state, action: PayloadAction<ITotal>) => {
                state.is_loaded = true
                state.total_values = action.payload.total_values
            })
            .addCase(retrieveSingleStoresIncidentsValue.rejected, (state) => {
                state.is_loaded = false
            })
    }
})

export const selectSingleStoreIncidentsValue = (state: RootState) => state.singleStoreIncidentsValue

export default retrieveSingleStoreIncidentsValueSlice.reducer