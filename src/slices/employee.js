import { createSlice } from "@reduxjs/toolkit";
import { APIClient } from "../helpers/api_helper";
import { DataService } from "../helpers/dataService/dataService";

export const employeeSlide = createSlice({
  name: "employee",
  initialState: {
    data: null,
    error: null,
    current: null,
    item: [],
  },
  reducers: {
    getemployee: (state, action) => {
      state.data = action.payload;
    },
    editemployee: (state, action) => {
      state.item = action.payload;
    },
  },
});
export const addemployeeAsync = async (url, data) => {
  try {
    const datas = await DataService.post(url, data);
    return datas;
  } catch (error) {
    return error;
  }
};
export const getemployeeAsync = (data) => async (dispatch) => {
  try {
    const datas = await DataService.get(data);
    dispatch(getemployee(datas));
  } catch (error) {
    // //throw new Error(err);
  }
};
export const editemployeeAsync = async (url, data) => {
  try {
    const datas = await DataService.put(url, data);
    return datas;
  } catch (error) {
    return error;
  }
};
export const deleteemployee = async (data) => {
  try {
    const datas = await DataService.delete(data);
    return datas;
  } catch (error) {
    return error;
  }
};

export const deleteemployeeAll = async (url, data) => {
  try {
    const datas = await DataService.delete(url, data);
    return datas;
  } catch (error) {
    return error;
  }
};

export const { getemployee, editemployee } = employeeSlide.actions;
export default employeeSlide.reducer;
