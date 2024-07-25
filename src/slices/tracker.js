import { createSlice } from "@reduxjs/toolkit";
import { APIClient } from "../helpers/api_helper";
import { DataService } from "../helpers/dataService/dataService";

export const trackerSlide = createSlice({
  name: "tracker",
  initialState: {
    data: null,
    error: null,
    current: null,
    item: [],
  },
  reducers: {
    gettracker: (state, action) => {
      state.data = action.payload;
    },
    edittracker: (state, action) => {
      state.item = action.payload;
    },
  },
});
export const addtrackerAsync = async (url, data) => {
  try {
    const datas = await DataService.post(url, data);
    return datas;
  } catch (error) {
    return error;
  }
};
export const gettrackerAsync = (data) => async (dispatch) => {
  try {
    const datas = await DataService.get(data);
    dispatch(gettracker(datas));
  } catch (error) {
    // //throw new Error(err);
  }
};
export const edittrackerAsync = async (url, data) => {
  try {
    const datas = await DataService.put(url, data);
    return datas;
  } catch (error) {
    return error;
  }
};
export const deletetracker = async (data) => {
  try {
    const datas = await DataService.delete(data);
    return datas;
  } catch (error) {
    return error;
  }
};

export const { gettracker, edittracker } = trackerSlide.actions;
export default trackerSlide.reducer;
