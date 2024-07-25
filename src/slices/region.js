import { createSlice } from "@reduxjs/toolkit";
import { APIClient } from "../helpers/api_helper";
import { DataService } from "../helpers/dataService/dataService";

export const regionSlide = createSlice({
  name: "region",
  initialState: {
    data: null,
    error: null,
    current: null,
    item: [],
  },
  reducers: {
    getregion: (state, action) => {
      state.data = action.payload;
    },
    editregion: (state, action) => {
      state.item = action.payload;
    },
  },
});
export const addregionAsync = async (url, data) => {
  try {
    const datas = await DataService.post(url, data);
    return datas;
  } catch (error) {
    return error;
  }
};
export const getregionAsync = (data) => async (dispatch) => {
  try {
    const datas = await DataService.get(data);
    dispatch(getregion(datas));
  } catch (error) {
    // //throw new Error(err);
  }
};
export const editregionAsync = async (url, data) => {
  try {
    const datas = await DataService.put(url, data);
    return datas;
  } catch (error) {
    return error;
  }
};
export const deleteregion = async (data) => {
  try {
    const datas = await DataService.delete(data);
    return datas;
  } catch (error) {
    return error;
  }
};

export const { getregion, editregion } = regionSlide.actions;
export default regionSlide.reducer;
