import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";


export const retrieveAllEmployees = createAsyncThunk("employees/allEmployees", async () => {
    const response = await axios.get("http://localhost:8000/employees")

    const employees = response.data

    return employees
})


const initialState: IEmployeesData = {
    employees: [],
    is_loaded: false
}


const retrieveAllEmployeesSlice = createSlice({
    name: "employees/allEmployees",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(retrieveAllEmployees.pending, (state) => {
                state.is_loaded = false
            })
            .addCase(retrieveAllEmployees.fulfilled, (state, action: PayloadAction<IEmployee[]>) => {
                state.is_loaded = true
                state.employees = action.payload
            })
            .addCase(retrieveAllEmployees.rejected, (state) => {
                state.is_loaded = false
            })
    }
})

export const selectAllEmployees = (state: RootState) => state.allEmployees.employees

export default retrieveAllEmployeesSlice.reducer