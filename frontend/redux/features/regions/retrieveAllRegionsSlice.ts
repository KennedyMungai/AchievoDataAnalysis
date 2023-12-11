import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

export const retrieveAllRegions = createAsyncThunk("regions/allRegions", async () => {
    const response = await axios.get("http://localhost:8000/regions")

    const regions = response.data

    return regions
})

const initialState: IRegionsData = {
    regions: [],
    is_loaded: false
}


const retrieveRegionsSlice = createSlice({
    name: 'Retrieve All Regions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(retrieveAllRegions.pending, (state) => {
                state.is_loaded = false
                state.regions = []
            })
            .addCase(retrieveAllRegions.fulfilled, (state, action: PayloadAction<IRegion[]>) => {
                state.regions = action.payload
            })
            .addCase(retrieveAllRegions.rejected, (state) => {
                state.is_loaded = false
                state.regions = []
            })
    }
})

export const selectAllRegions = (state: RootState) => state.allRegions

export default retrieveRegionsSlice.reducer