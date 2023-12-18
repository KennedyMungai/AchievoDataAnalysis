import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios"
import { RootState } from "../store";


export const retrieveSingleStoreIncidentsCount = createAsyncThunk("stores/incidentCount", async (storeId: number) => {
    const response = await axios.get(`http://localhost:8000/incidents/store/count/${storeId}`)
    const data = response.data
    return data
})

const initialState: ICountData = {
    is_loaded: false,
    count: 0
}

export const retrieveSingleStoreIncidentsCountSlice = createSlice({
    name: "stores/incidentCount",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(retrieveSingleStoreIncidentsCount.pending, (state) => {
                state.is_loaded = false
            })
            .addCase(retrieveSingleStoreIncidentsCount.fulfilled, (state, action: PayloadAction<ICountData>) => {
                state.is_loaded = true
                state.count = action.payload.count
            })
            .addCase(retrieveSingleStoreIncidentsCount.rejected, (state) => {
                state.is_loaded = false
            })
    }
})

export const selectSingleStoreIncidentsCount = (state: RootState) => state.singleStoreIncidentsCount.count

export default retrieveSingleStoreIncidentsCountSlice.reducer