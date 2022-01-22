import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {api} from "../api";

export const getList = createAsyncThunk("todo/list", async (req) => {
  const response = await api().get("/lists");

  return response.data;
});


export const deleteAll = createAsyncThunk("todo/deleteAll", async (req) => {
  const response = await api().delete("/delete/all");

  return response.data;
});


export const todo = createSlice({
  name: "todo",
  initialState: {
    list: [],
    listLoading: false,
    listError: false,

    deleteAllStatus: false
  },
  reducers: {
      // clearState: (state) => {
      //     state.list = []
      // }
  },
  extraReducers: {
    [getList.pending]: (state) => {
      state.listLoading = true;
    },
    [getList.fulfilled]: (state, action) => {
        

        if(action.payload) {
            state.listLoading = false;
            state.list = action.payload
        }else{
            state.listError = true
        }
    },
    [getList.rejected]: (state) => {
        state.listError = true;
    },
    [deleteAll.fulfilled]: (state, action) => {

      const {
        payload 
      } = action;

      if(payload) {
        state.deleteAllStatus = true;
      }

    },
    [deleteAll.rejected]: (state) => {
      state.deleteAllStatus = false;
    }

    
  },
});


export const {
    clearState 
} = todo.actions;

export default todo.reducer;