import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'
import { RootState } from "../store"

const initialState: IToken = {
    token_type: "",
    access_token: "",
    is_loaded: false,
    is_logged_in: false,
    employee_id: 0,
    employee_name: "",
    employee_job_title: ""
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logIn: (state) => {
            state.is_logged_in = true
        },
        logOut: (state) => {
            state.is_logged_in = false
            state.access_token = ""
            state.employee_id = 0
        }
    }
})


export const { logIn, logOut } = authSlice.actions

export const selectAuthStateData = (state: RootState) => state.authState

export default authSlice.reducer