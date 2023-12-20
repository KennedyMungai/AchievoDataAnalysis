import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from "../store"


export const retrieveTheMostNotoriousStoreInARegion = createAsyncThunk("region/mostNotoriousStore", async (regionId: number) => {
    const response = await axios.get(`http://localhost:8000/incidents/region/max/store/${regionId}`)
    const data = response.data
    return data
})

const initialState: INotoriousStoreData = {
    is_loaded: false,
    store_name: "",
    max_value: 0
}


export const retrieveTheMostNotoriousStoreInARegionSlice = createSlice({
    name: "region/mostNotoriousStore",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(retrieveTheMostNotoriousStoreInARegion.pending, (state) => {
                state.is_loaded = false
            })
            .addCase(retrieveTheMostNotoriousStoreInARegion.fulfilled, (state, action: PayloadAction<INotoriousStore>) => {
                state.is_loaded = true
                state.store_name = action.payload.store_name
                state.max_value = action.payload.max_value
            })
            .addCase(retrieveTheMostNotoriousStoreInARegion.rejected, (state) => {
                state.is_loaded = false
            })
    }
})

export const selectTheMostNotoriousStoreInARegion = (state: RootState) => state.theMostNotoriousStoreInARegion

export default retrieveTheMostNotoriousStoreInARegionSlice.reducer