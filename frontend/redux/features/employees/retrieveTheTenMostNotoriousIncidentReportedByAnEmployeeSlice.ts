import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from "../store"


export const retrieveTheTenMostNotoriousIncidentsReportedByAnEmployee = createAsyncThunk("employees/tenCostliestIncidents", async (employeeId: number) => {
    const response = await axios.get(`http://localhost:8000/incidents/employee/top_ten/${employeeId}`)
    const data = response.data
    return data
})


const initialState: IIncidentsData = {
    incidents: [],
    is_loaded: false
}


export const retrieveTheTenMostNotoriousIncidentReportedByAnEmployeeSlice = createSlice({
    name: "tenCostliestIncidents",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(retrieveTheTenMostNotoriousIncidentsReportedByAnEmployee.pending, (state) => {
                state.is_loaded = false
            })
            .addCase(retrieveTheTenMostNotoriousIncidentsReportedByAnEmployee.fulfilled, (state, action: PayloadAction<IIncident[]>) => {
                state.is_loaded = true
                state.incidents = action.payload
            })
            .addCase(retrieveTheTenMostNotoriousIncidentsReportedByAnEmployee.rejected, (state) => {
                state.is_loaded = false
            })
    }
})

export const selectTheTenMostNotoriousIncidentsReportedByAnEmployee = (state: RootState) => state.theTenMostNotoriousIncidentsReportedByAnEmployee.incidents

export default retrieveTheTenMostNotoriousIncidentReportedByAnEmployeeSlice.reducer