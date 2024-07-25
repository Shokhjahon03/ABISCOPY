import { createSlice } from "@reduxjs/toolkit";
import { APIClient } from "../helpers/api_helper";
import { DataService } from "../helpers/dataService/dataService";

export const sensorTypeSlide = createSlice({
  name: "sensorType",
  initialState: {
    data: null,
    error: null,
    current: null,
    item: [],
  },
  reducers: {
    getsensorType: (state, action) => {
      state.data = action.payload;
    },
    editsensorType: (state, action) => {
      state.item = action.payload;
    },
  },
});
export const addsensorTypeAsync = async (url, data) => {
  try {
    const datas = await DataService.post(url, data);
    return datas;
  } catch (error) {
    return error;
  }
};
export const getsensorTypeAsync = (data) => async (dispatch) => {
  try {
    const datas = await DataService.get(data);
    dispatch(getsensorType(datas));
  } catch (error) {
    // //throw new Error(err);
  }
};
export const editsensorTypeAsync = async (url, data) => {
  try {
    const datas = await DataService.put(url, data);
    return datas;
  } catch (error) {
    return error;
  }
};
export const deletesensorType = async (data) => {
  try {
    const datas = await DataService.delete(data);
    return datas;
  } catch (error) {
    return error;
  }
};

export const { getsensorType, editsensorType } = sensorTypeSlide.actions;
export default sensorTypeSlide.reducer;
