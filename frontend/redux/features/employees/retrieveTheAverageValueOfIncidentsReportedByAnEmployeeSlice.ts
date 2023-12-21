import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from "../store"


export const retrieveTheAverageValueOfIncidentsReportedByAnEmployee = createAsyncThunk("employee/avgValueOfIncidents", async (employeeId: number) => {
    const response = await axios.get(`http://localhost:8000/incidents/employee/average/${employeeId}`)
    const data = response.data
    return data
})


const initialState: IAverageData = {
    is_loaded: false,
    average_value: 0
}


export const retrieveTheAverageValueOfIncidentsReportedByAnEmployeeSlice = createSlice({
    name: "employee/avgValueOfIncidents",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(retrieveTheAverageValueOfIncidentsReportedByAnEmployee.pending, (state) => {
                state.is_loaded = false
            })
            .addCase(retrieveTheAverageValueOfIncidentsReportedByAnEmployee.fulfilled, (state, action: PayloadAction<IAverage>) => {
                state.is_loaded = true
                state.average_value = action.payload.average_value
            })
            .addCase(retrieveTheAverageValueOfIncidentsReportedByAnEmployee.rejected, (state) => {
                state.is_loaded = false
            })
    }
})

export const selectTheAverageValueOfIncidentsReportedByAnEmployee = (state: RootState) => state.avgValueOfIncidentsReportedByAnEmployee.average_value

export default retrieveTheAverageValueOfIncidentsReportedByAnEmployeeSlice.reducer