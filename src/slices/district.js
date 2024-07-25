import { createSlice } from "@reduxjs/toolkit";
import { APIClient } from "../helpers/api_helper";
import { DataService } from "../helpers/dataService/dataService";

export const districtSlide = createSlice({
  name: "district",
  initialState: {
    data: null,
    error: null,
    current: null,
    item: [],
  },
  reducers: {
    getdistrict: (state, action) => {
      state.data = action.payload;
    },
    editdistrict: (state, action) => {
      state.item = action.payload;
    },
  },
});
export const adddistrictAsync = async (url, data) => {
  try {
    const datas = await DataService.post(url, data);
    return datas;
  } catch (error) {
    return error;
  }
};
export const getdistrictAsync = (data) => async (dispatch) => {
  try {
    const datas = await DataService.get(data);
    dispatch(getdistrict(datas));
  } catch (error) {
    // //throw new Error(err);
  }
};
export const editdistrictAsync = async (url, data) => {
  try {
    const datas = await DataService.put(url, data);
    return datas;
  } catch (error) {
    return error;
  }
};
export const deletedistrict = async (data) => {
  try {
    const datas = await DataService.delete(data);
    return datas;
  } catch (error) {
    return error;
  }
};

export const { getdistrict, editdistrict } = districtSlide.actions;
export default districtSlide.reducer;
