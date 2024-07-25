import { createSlice } from "@reduxjs/toolkit";
import { APIClient } from "../helpers/api_helper";
import { DataService } from "../helpers/dataService/dataService";

export const brandSlide = createSlice({
  name: "brand",
  initialState: {
    data: null,
    error: null,
    current: null,
    item: [],
  },
  reducers: {
    getbrand: (state, action) => {
      state.data = action.payload;
    },
    editbrand: (state, action) => {
      state.item = action.payload;
    },
  },
});
export const addbrandAsync = async (url, data) => {
  try {
    const datas = await DataService.post(url, data);
    return datas;
  } catch (error) {
    return error;
  }
};
export const getbrandAsync = (data) => async (dispatch) => {
  try {
    const datas = await DataService.get(data);
    dispatch(getbrand(datas));
  } catch (error) {
    // //throw new Error(err);
  }
};
export const editbrandAsync = async (url, data) => {
  try {
    const datas = await DataService.put(url, data);
    return datas;
  } catch (error) {
    return error;
  }
};
export const deletebrand = async (data) => {
  try {
    const datas = await DataService.delete(data);
    return datas;
  } catch (error) {
    return error;
  }
};

export const { getbrand, editbrand } = brandSlide.actions;
export default brandSlide.reducer;
