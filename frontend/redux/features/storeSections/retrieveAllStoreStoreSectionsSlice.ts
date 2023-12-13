import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from "../store"


export const retrieveAllOfAStoresStoreSections = createAsyncThunk("storeSections/retrieveAllStoreSections", async (storeId: number) => {
    const response = await axios.get(`http://localhost:8000/store-sections/${storeId}`)
    const data = response.data
    return data
})


const initialState: IStoreSectionsData = {
    store_sections: [],
    is_loaded: false
}


const retrieveAllStoreSectionsSlice = createSlice({
    name: "storeSections/allStoreSections",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(retrieveAllOfAStoresStoreSections.pending, (state) => {
                state.is_loaded = false
            })
            .addCase(retrieveAllOfAStoresStoreSections.fulfilled, (state, action:PayloadAction<IStoreSection[]>) => {
                state.is_loaded = true
                state.store_sections = action.payload
            })
            .addCase(retrieveAllOfAStoresStoreSections.rejected, (state) => {
                state.is_loaded = false
            })
    }
})


export const selectAllStoreSections = (state: RootState) => state.allStoreStoreSections.store_sections

export default retrieveAllStoreSectionsSlice.reducer