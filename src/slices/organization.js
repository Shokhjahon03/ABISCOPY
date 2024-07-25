import { createSlice } from "@reduxjs/toolkit";
import { APIClient } from "../helpers/api_helper";
import { DataService } from "../helpers/dataService/dataService";

export const organizationSlide = createSlice({
  name: "organization",
  initialState: {
    data: null,
    error: null,
    current: null,
    item: [],
  },
  reducers: {
    getorganization: (state, action) => {
      state.data = action.payload;
    },
    editorganization: (state, action) => {
      state.item = action.payload;
    },
  },
});
export const addorganizationAsync = async (url, data) => {
  try {
    const datas = await DataService.post(url, data);
    return datas;
  } catch (error) {
    return error;
  }
};
export const getorganizationAsync = (data) => async (dispatch) => {
  try {
    const datas = await DataService.get(data);
    dispatch(getorganization(datas));
  } catch (error) {
    // //throw new Error(err);
  }
};
export const editorganizationAsync = async (url, data) => {
  try {
    const datas = await DataService.put(url, data);
    return datas;
  } catch (error) {
    return error;
  }
};
export const deleteorganization = async (data) => {
  try {
    const datas = await DataService.delete(data);
    return datas;
  } catch (error) {
    return error;
  }
};

export const deleteorganizationAll = async (url, data) => {
  try {
    const datas = await DataService.delete(url, data);
    return datas;
  } catch (error) {
    return error;
  }
};

export const { getorganization, editorganization } = organizationSlide.actions;
export default organizationSlide.reducer;
