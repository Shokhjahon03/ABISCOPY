import { createSlice } from "@reduxjs/toolkit";
import { APIClient } from "../helpers/api_helper";
import { DataService } from "../helpers/dataService/dataService";

export const manufacturerSlide = createSlice({
  name: "manufacturer",
  initialState: {
    data: null,
    error: null,
    current: null,
    item: [],
  },
  reducers: {
    getmanufacturer: (state, action) => {
      state.data = action.payload;
    },
    editmanufacturer: (state, action) => {
      state.item = action.payload;
    },
  },
});
export const addmanufacturerAsync = async (url, data) => {
  try {
    const datas = await DataService.post(url, data);
    return datas;
  } catch (error) {
    return error;
  }
};
export const getmanufacturerAsync = (data) => async (dispatch) => {
  try {
    const datas = await DataService.get(data);
    dispatch(getmanufacturer(datas));
  } catch (error) {
    // //throw new Error(err);
  }
};
export const editmanufacturerAsync = async (url, data) => {
  try {
    const datas = await DataService.put(url, data);
    return datas;
  } catch (error) {
    return error;
  }
};
export const deletemanufacturer = async (data) => {
  try {
    const datas = await DataService.delete(data);
    return datas;
  } catch (error) {
    return error;
  }
};

export const { getmanufacturer, editmanufacturer } = manufacturerSlide.actions;
export default manufacturerSlide.reducer;
