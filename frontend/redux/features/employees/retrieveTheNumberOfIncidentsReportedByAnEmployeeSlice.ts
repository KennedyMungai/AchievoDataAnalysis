import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from "../store"


export const retrieveTheNumberOfIncidentsReportedByAnEmployee = createAsyncThunk("employees/incidentsCount", async (employeeId: number) => {
    const response = await axios.get(`http://localhost:8000/incidents/employee/count/${employeeId}`)
    const data = response.data
    return data
})


const initialState: ICountData = {
    is_loaded: false,
    count: 0
}


export const retrieveTheNumberOfIncidentsReportedByAnEmployeeSlice = createSlice({
    name:"employees/incidentCount",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(retrieveTheNumberOfIncidentsReportedByAnEmployee.pending, (state) => {
                state.is_loaded = false
            })
            .addCase(retrieveTheNumberOfIncidentsReportedByAnEmployee.fulfilled, (state, action: PayloadAction<ICount>) => {
                state.is_loaded = true
                state.count = action.payload.count
            })
            .addCase(retrieveTheNumberOfIncidentsReportedByAnEmployee.rejected, (state) => {
                state.is_loaded = false
            })
    }
})

export const selectTheNumberOfIncidentsReportedByAnEmployee = (state: RootState) => state.numberOfIncidentsReportedByAnEmployee.count

export default retrieveTheNumberOfIncidentsReportedByAnEmployeeSlice.reducer