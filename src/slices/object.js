import { createSlice } from "@reduxjs/toolkit";
import { APIClient } from "../helpers/api_helper";
import { DataService } from "../helpers/dataService/dataService";

export const objectSlide = createSlice({
  name: "object",
  initialState: {
    data: null,
    error: null,
    current: null,
    item: [],
  },
  reducers: {
    getobject: (state, action) => {
      state.data = action.payload;
    },
    getCurrentObject: (state, action) => {
      state.current = action.payload;
    },
    editobject: (state, action) => {
      state.item = action.payload;
    },
  },
});
export const addobjectAsync = async (url, data) => {
  try {
    const datas = await DataService.post(url, data);
    return datas;
  } catch (error) {
    return error;
  }
};
export const getobjectAsync = (data) => async (dispatch) => {
  try {
    const datas = await DataService.get(data);
    dispatch(getobject(datas));
  } catch (error) {
    // //throw new Error(err);
  }
};
export const editobjectAsync = async (url, data) => {
  try {
    const datas = await DataService.put(url, data);
    return datas;
  } catch (error) {
    return error;
  }
};
export const deleteobject = async (data) => {
  try {
    const datas = await DataService.delete(data);
    return datas;
  } catch (error) {
    return error;
  }
};
export const deleteobjectAll = async (url, data) => {
  try {
    const datas = await DataService.delete(url, data);
    return datas;
  } catch (error) {
    return error;
  }
};
export const { getobject, editobject,getCurrentObject } = objectSlide.actions;
export default objectSlide.reducer;
