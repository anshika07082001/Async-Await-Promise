import { createSlice } from "@reduxjs/toolkit";

const initialState={
    tableArr:[]
}

const SelectSlice=createSlice({
    name:'select',
    initialState,
    reducers:{
        btnHandle(state,action){
            state.tableArr.push(action.payload)
        },
        showTable(state,action){
            state.tableArr=action.payload
        }
    },

})

export const {btnHandle,showTable} = SelectSlice.actions

export default SelectSlice.reducer