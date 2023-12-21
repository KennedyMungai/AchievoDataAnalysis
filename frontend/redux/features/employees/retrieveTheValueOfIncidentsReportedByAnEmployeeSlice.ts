import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from "../store"


export const retrieveTheValueOfIncidentsReportedByAnEmployee = createAsyncThunk("employees/incidentsValue", async (employeeId: number) => {
    const response = await axios.get(`http://localhost:8000/incidents/employee/value/${employeeId}`)
    const data = response.data
    return data
})


const initialState: ITotalData = {
    is_loaded: false,
    total_values: 0
}


export const retrieveTheValueOfIncidentsReportedByAnEmployeeSlice = createSlice({
    name: "employees/incidentsValue",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(retrieveTheValueOfIncidentsReportedByAnEmployee.pending, (state) => {
                state.is_loaded = false
            })
            .addCase(retrieveTheValueOfIncidentsReportedByAnEmployee.fulfilled, (state, action: PayloadAction<ITotal>) => {
                state.is_loaded = true
                state.total_values = action.payload.total_values
            })
            .addCase(retrieveTheValueOfIncidentsReportedByAnEmployee.rejected, (state) => {
                state.is_loaded = false
            })
    }
})

export const selectTheValueOfIncidentsReportedByAnEmployee = (state: RootState) => state.valueOfIncidentsReportedByAnEmployee.total_values

export default retrieveTheValueOfIncidentsReportedByAnEmployeeSlice.reducer