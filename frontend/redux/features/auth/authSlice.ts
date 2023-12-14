import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'
import { RootState } from "../store"


export const getAuthToken = createAsyncThunk("auth/login", async (values: ICredentials) => {
    const credentialsForm = new FormData()
    credentialsForm.append("username", values.employee_email)
    credentialsForm.append("password", values.employee_password)

    const response = await axios.post("http://localhost:8000/auth/login", credentialsForm)
    const data = response.data

    return data
})


const initialState: IToken = {
    token_type: "",
    access_token: "",
    is_loaded: false,
    is_logged_in: false,
    employee_id: 0
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
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAuthToken.fulfilled, (state, action) => {
                state.is_loaded = true
                state.token_type = action.payload.token_type
                state.access_token = action.payload.access_token
                state.employee_id = action.payload.employee_id
            })
            .addCase(getAuthToken.rejected, (state) => {
                state.is_loaded = false
                state.token_type = ""
                state.access_token = ""
            })
            .addCase(getAuthToken.pending, (state) => {
                state.is_loaded = false
                state.token_type = ""
                state.access_token = ""
            })
    }
})


export const { logIn, logOut } = authSlice.actions

export const selectAuthStateData = (state: RootState) => state.authState

export default authSlice.reducer