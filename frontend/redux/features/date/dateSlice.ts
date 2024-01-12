import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"

const initialState = {
    date: Date
}

export const dateSlice = createSlice({
    name: 'date',
    initialState,
    reducers: {
        setGlobalDate: (state, action) => {
            state.date = action.payload
        }
    }
})

export const {setGlobalDate} = dateSlice.actions

export const selectGlobalDate = (state: RootState) => state.dateState.date

export default dateSlice.reducer