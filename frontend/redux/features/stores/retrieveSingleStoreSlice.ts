import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from "../store"


export const retrieveSingleStore = createAsyncThunk("stores/singleStore", async (storeId: number) => {
    const response = await axios.get(`http://localhost:8000/stores/${storeId}`)
    const data = response.data
    return data
})


const initialState: IStoreData = {
    is_loaded: false,
    store_name: "",
    store_location: "",
    created_at: new Date,
    region_id: 0,
    store_id: 0
}


const retrieveSingleStoreSlice = createSlice({
    name: "stores/singleStore",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(retrieveSingleStore.pending, (state) => {
                state.is_loaded = false
            })
            .addCase(retrieveSingleStore.fulfilled, (state, action: PayloadAction<IStoreData>) => {
                state.is_loaded
                state.store_name = action.payload.store_name
                state.store_location = action.payload.store_location
                state.created_at = action.payload.created_at
                state.region_id = action.payload.region_id
                state.store_id = action.payload.store_id
            })
            .addCase(retrieveSingleStore.rejected, (state) => {
                state.is_loaded = false
            })
    }
})


export const selectSingleStore = (state: RootState) => state.singleStore

export default retrieveSingleStoreSlice.reducer