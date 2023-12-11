import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";


export const retrieveSingleRegion = createAsyncThunk('regions/singleRegion', async (regionId: number) => {
    const response = await axios.get(`http://localhost:8000/regions/${regionId}`)

    const regionData = response.data

    return regionData
})


const initialState: IRegionData = {
    is_loaded: false,
    region_id: 0,
    region_name: "",
    created_at: new Date()
}


const retrieveSingleRegionSlice = createSlice({
    name: 'regions/singleRegion',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(retrieveSingleRegion.pending, (state) => {
                state.is_loaded = false
            })
            .addCase(retrieveSingleRegion.fulfilled, (state, action:PayloadAction<IRegion>) => {
                state.is_loaded = true
                state.region_id = action.payload.region_id
                state.region_name = action.payload.region_name
                state.created_at = action.payload.created_at
            })
            .addCase(retrieveSingleRegion.rejected, (state) => {
                state.is_loaded = false
            })
    }
})

export const selectSingleRegion = (state: RootState) => state.singleRegion

export default retrieveSingleRegionSlice.reducer