import { createSlice } from "@reduxjs/toolkit";
import { APIClient } from "../helpers/api_helper";
import { DataService } from "../helpers/dataService/dataService";

export const positionSlide = createSlice({
  name: "position",
  initialState: {
    data: null,
    error: null,
    current: null,
    item: [],
  },
  reducers: {
    getposition: (state, action) => {
      state.data = action.payload;
    },
    editposition: (state, action) => {
      state.item = action.payload;
    },
  },
});
export const addpositionAsync = async (url, data) => {
  try {
    const datas = await DataService.post(url, data);
    return datas;
  } catch (error) {
    return error;
  }
};
export const getpositionAsync = (data) => async (dispatch) => {
  try {
    const datas = await DataService.get(data);
    dispatch(getposition(datas));
  } catch (error) {
    // //throw new Error(err);
  }
};
export const editpositionAsync = async (url, data) => {
  try {
    const datas = await DataService.put(url, data);
    return datas;
  } catch (error) {
    return error;
  }
};
export const deleteposition = async (data) => {
  try {
    const datas = await DataService.delete(data);
    return datas;
  } catch (error) {
    return error;
  }
};

export const { getposition, editposition } = positionSlide.actions;
export default positionSlide.reducer;
