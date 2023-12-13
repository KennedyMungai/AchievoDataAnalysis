import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";


export const retrieveSingleStoreSection = createAsyncThunk("storeSections/retrieveStoreSections", async (storeSectionId: number) => {
    const response = await axios.get(`http://localhost:8000/store-sections/${storeSectionId}`)
    const data = await response.data
    return data
})


const initialState: IStoreSectionData = {
    is_loaded: false,
    store_section_id: 0,
    created_at: new Date,
    store_section_name: "",
    store_id: 0
}


const retrieveSingleStoreSectionSlice = createSlice({
    name: "storeSections/singleStoreSection",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(retrieveSingleStoreSection.pending, (state) => {
                state.is_loaded = false
            })
            .addCase(retrieveSingleStoreSection.fulfilled, (state, action: PayloadAction<IStoreSection>) => {
                state.is_loaded = true
                state.created_at = action.payload.created_at
                state.store_id = action.payload.store_id
                state.store_section_id = action.payload.store_section_id
                state.store_section_name = action.payload.store_section_name
            })
            .addCase(retrieveSingleStoreSection.rejected, (state) => {
                state.is_loaded = false
            })
    }
})


export const selectSingleStoreSection = (state: RootState) => state.singleStoreSection

export default retrieveSingleStoreSectionSlice.reducer