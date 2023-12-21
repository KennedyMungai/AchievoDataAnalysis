import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from "../store"


export const retrieveSingleEmployee = createAsyncThunk("employees/oneEmployee", async (employeeId: number) => {
    const response = await axios.get(`http://localhost:8000/employees/${employeeId}`)
    const data = response.data
    return data
})


const initialState: IEmployeeData = {
    is_loaded: false,
    employee_id: 0,
    employee_phone_number: "",
    employee_password: "",
    region_id: 1,
    employee_name: "",
    employee_email: "",
    employee_job_title: "",
    created_at: new Date(),
    store_id: 1
}


export const retrieveSingleEmployeeSlice = createSlice({
    name: "employees/singleEmployee",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(retrieveSingleEmployee.pending, (state) => {
                state.is_loaded = false
            })
            .addCase(retrieveSingleEmployee.fulfilled, (state, action: PayloadAction<IEmployee>) => {
                state.is_loaded = true
                state.employee_id = action.payload.employee_id
                state.employee_phone_number = action.payload.employee_phone_number
                state.employee_password = action.payload.employee_password
                state.region_id = action.payload.region_id
                state.employee_name = action.payload.employee_name
                state.employee_email = action.payload.employee_email
                state.employee_job_title = action.payload.employee_job_title
                state.created_at = action.payload.created_at
                state.store_id = action.payload.store_id
            })
            .addCase(retrieveSingleEmployee.rejected, (state) => {
                state.is_loaded = false
            })
    }
})

export const selectSingleEmployee = (state: RootState) => state.singleEmployee

export default retrieveSingleEmployeeSlice.reducer