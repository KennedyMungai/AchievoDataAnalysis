import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'
import { RootState } from "../store"


export const getAuthToken = createAsyncThunk("auth/login", async (values: ICredentials) => {
    const response = await axios.post("http://localhost:8000/auth/login", values)
    const data = response.data

    return data
})


const initialState: IToken = {
    token_type: "",
    access_token: "",
    is_loaded: false
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAuthToken.fulfilled, (state, action) => {
                state.is_loaded = true
                state.token_type = action.payload.token_type
                state.access_token = action.payload.access_token
            })
            .addCase(getAuthToken.rejected, (state, action) => {
                state.is_loaded = false
                state.token_type = ""
                state.access_token = ""
            })
            .addCase(getAuthToken.pending, (state, action) => {
                state.is_loaded = false
                state.token_type = ""
                state.access_token = ""
            })
    }
})

export const selectAuthStateData = (state: RootState) => state.authState

export default authSlice.reducer