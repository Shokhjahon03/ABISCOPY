import { createSlice } from "@reduxjs/toolkit";
import { APIClient } from "../helpers/api_helper";
import { DataService } from "../helpers/dataService/dataService";

export const sensorSlide = createSlice({
  name: "sensor",
  initialState: {
    data: null,
    error: null,
    current: null,
    item: [],
  },
  reducers: {
    getsensor: (state, action) => {
      state.data = action.payload;
    },
    editsensor: (state, action) => {
      state.item = action.payload;
    },
  },
});
export const addsensorAsync = async (url, data) => {
  try {
    const datas = await DataService.post(url, data);
    return datas;
  } catch (error) {
    return error;
  }
};
export const getsensorAsync = (data) => async (dispatch) => {
  try {
    const datas = await DataService.get(data);
    dispatch(getsensor(datas));
  } catch (error) {
    // //throw new Error(err);
  }
};
export const editsensorAsync = async (url, data) => {
  try {
    const datas = await DataService.put(url, data);
    return datas;
  } catch (error) {
    return error;
  }
};
export const deletesensor = async (data) => {
  try {
    const datas = await DataService.delete(data);
    return datas;
  } catch (error) {
    return error;
  }
};

export const deletesensorAll = async (url, data) => {
  try {
    const datas = await DataService.delete(url, data);
    return datas;
  } catch (error) {
    return error;
  }
};

export const { getsensor, editsensor } = sensorSlide.actions;
export default sensorSlide.reducer;
