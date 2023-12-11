import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from "../store"


export const retrieveRegionStores = createAsyncThunk('stores/regionStores', async (regionId: number) => {
    const response = await axios.get(`http://localhost:8000/stores/${regionId}`)

    const storesData = response.data

    return storesData
})


const initialState: IStoresData = {
    stores: [],
    is_loaded: false
}


const retrieveAllRegionStoresSlice = createSlice({
    name: 'stores/allRegionStores',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(retrieveRegionStores.pending, (state) => {
                state.is_loaded = false
            })
            .addCase(retrieveRegionStores.fulfilled, (state, action: PayloadAction<IStore[]>) => {
                state.is_loaded = true
                state.stores = action.payload
            })
            .addCase(retrieveRegionStores.rejected, (state) => {
                state.is_loaded = false
                state.stores = []
            })
    }
})


export const selectAllRegionStores = (state: RootState) => state.allRegionStores.stores

export default retrieveAllRegionStoresSlice.reducer