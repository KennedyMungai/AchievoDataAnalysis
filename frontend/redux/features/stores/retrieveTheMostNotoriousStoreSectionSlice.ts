import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from "../store"


export const retrieveTheMostNotoriousStoreSection = createAsyncThunk("stores/mostNotoriousSection", async (storeId: number) => {
    const response = await axios.get(`http://localhost:8000/incidents/store/max/store_sections/${storeId}`)
    const data = response.data
    return data
})


const initialState: IMaxValueData = {
    is_loaded: false,
    store_section_name: "",
    max_value: 0
}


export const retrieveTheMostNotoriousStoreSectionSlice = createSlice({
    name: "stores/mostNotoriousSection",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(retrieveTheMostNotoriousStoreSection.pending, (state) => {
                state.is_loaded = false
            })
            .addCase(retrieveTheMostNotoriousStoreSection.fulfilled, (state, action: PayloadAction<IMaxValue>) => {
                state.is_loaded = true
                state.store_section_name = action.payload.store_section_name
                state.max_value = action.payload.max_value
            })
            .addCase(retrieveTheMostNotoriousStoreSection.rejected, (state) => {
                state.is_loaded = false
            })
    }
})

export const selectMostNotoriousSectionData = (state: RootState) => state.theMostNotoriousStoreSection

export default retrieveTheMostNotoriousStoreSectionSlice.reducer