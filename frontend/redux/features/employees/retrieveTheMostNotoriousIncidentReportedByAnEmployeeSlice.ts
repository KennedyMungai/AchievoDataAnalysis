import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from "../store"


export const retrieveTheMostNotoriousIncidentReportedByAnEmployee = createAsyncThunk("employees/mostNotorious", async (employeeId: number) => {
    const response = await axios.get(`http://localhost:8000/incidents/employee/max/${employeeId}`)
    const data = response.data
    return data
})


const initialState: IIncidentData = {
    is_loaded: false,
    incident_description: "",
    product_name: "",
    product_code: "",
    product_quantity: "",
    product_price: "",
    total_value: "",
    is_resolved: false,
    store_section_id: 0,
    employee_id: 0,
    store_id: 0,
    region_id: 0,
    incident_id: 0,
    created_at: new Date()
}


export const retrieveTheMostNotoriousIncidentReportedByAnEmployeeSlice = createSlice({
    name: "employees/mostNotorious",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(retrieveTheMostNotoriousIncidentReportedByAnEmployee.pending, (state) => {
                state.is_loaded = false
            })
            .addCase(retrieveTheMostNotoriousIncidentReportedByAnEmployee.fulfilled, (state, action: PayloadAction<IIncident>) => {
                state.is_loaded = true
                state.incident_description = action.payload.incident_description
                state.product_name = action.payload.product_name
                state.product_code = action.payload.product_code
                state.product_quantity = action.payload.product_quantity
                state.product_price = action.payload.product_price
                state.total_value = action.payload.total_value
                state.is_resolved = action.payload.is_resolved
                state.store_section_id = action.payload.store_section_id
                state.employee_id = action.payload.employee_id
                state.store_id = action.payload.store_id
                state.region_id = action.payload.region_id
                state.incident_id = action.payload.incident_id
                state.created_at = action.payload.created_at
            })
            .addCase(retrieveTheMostNotoriousIncidentReportedByAnEmployee.rejected, (state) => {
                state.is_loaded = false
            })
    }
})

export const selectTheMostNotoriousIncidentReportedByAnEmployee = (state: RootState) => state.theMostNotoriousIncidentReportedByAnEmployee

export default retrieveTheMostNotoriousIncidentReportedByAnEmployeeSlice.reducer