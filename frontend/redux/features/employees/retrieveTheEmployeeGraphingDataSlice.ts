import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from "../store"


export const retrieveTheEmployeeGraphingData = createAsyncThunk("employee/graphingData", async (employeeId: number) => {
    const response = await axios.get(`http://localhost:8000/incidents/incidents/employee/graphing_data/${employeeId}`)
    return response.data
})


const initialState: IGraphData = {
    is_loaded: false,
    labels: [],
    data: []
}


export const retrieveTheEmployeeGraphingDataSlice = createSlice({
    name: "employee/graphingData",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(retrieveTheEmployeeGraphingData.pending, (state) => {
                state.is_loaded = false
            })
            .addCase(retrieveTheEmployeeGraphingData.fulfilled, (state, action: PayloadAction<IGraph>) => {
                state.is_loaded = true
                state.labels = action.payload.labels
                state.data = action.payload.data
            })
            .addCase(retrieveTheEmployeeGraphingData.rejected, (state) => {
                state.is_loaded = false
            })
    }
})

export const selectTheEmployeeGraphingDataLabels = (state: RootState) => state.theEmployeeGraphingData.labels
export const selectTheEmployeeGraphingData = (state: RootState) => state.theEmployeeGraphingData.data

export default retrieveTheEmployeeGraphingDataSlice.reducer