import { createSlice } from "@reduxjs/toolkit";
import { APIClient } from "../helpers/api_helper";
import { DataService } from "../helpers/dataService/dataService";

export const countryOriginSlide = createSlice({
  name: "countryOrigin",
  initialState: {
    data: null,
    error: null,
    current: null,
    item: [],
  },
  reducers: {
    getcountryOrigin: (state, action) => {
      state.data = action.payload;
    },
    editcountryOrigin: (state, action) => {
      state.item = action.payload;
    },
  },
});
export const addcountryOriginAsync = async (url, data) => {
  try {
    const datas = await DataService.post(url, data);
    return datas;
  } catch (error) {
    return error;
  }
};
export const getcountryOriginAsync = (data) => async (dispatch) => {
  try {
    const datas = await DataService.get(data);
    dispatch(getcountryOrigin(datas));
  } catch (error) {
    // //throw new Error(err);
  }
};
export const editcountryOriginAsync = async (url, data) => {
  try {
    const datas = await DataService.put(url, data);
    return datas;
  } catch (error) {
    return error;
  }
};
export const deletecountryOrigin = async (data) => {
  try {
    const datas = await DataService.delete(data);
    return datas;
  } catch (error) {
    return error;
  }
};

export const { getcountryOrigin, editcountryOrigin } = countryOriginSlide.actions;
export default countryOriginSlide.reducer;
