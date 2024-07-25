import { createSlice } from "@reduxjs/toolkit";
import { DataService } from "../helpers/dataService/dataService";

export const dronSlide = createSlice({
  name: "dron",
  initialState: {
    data: null,
    line: null,
    open: false,
  },
  reducers: {
    getdata: (state, action) => {
      state.data = action.payload;
    },
    getline: (state, action) => {
      state.line = action.payload;
    },
    setOpen: (state, action) => {
      state.open = action.payload;
    },
  },
});
export const getdronAsync = (data) => async (dispatch) => {
  try {
    const datas = await DataService.get(data);
    dispatch(getdata(datas[0]));
  } catch (error) {
    // //throw new Error(err);
  }
};
export const getlineAsync = (data) => async (dispatch) => {
  try {
    const datas = await DataService.get(data);
    dispatch(getline(datas));
  } catch (error) {
    // //throw new Error(err);
  }
};
export const { getdata, getline, setOpen } = dronSlide.actions;
export default dronSlide.reducer;
