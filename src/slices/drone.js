import { createSlice } from "@reduxjs/toolkit";
import { APIClient } from "../helpers/api_helper";
import { DataService } from "../helpers/dataService/dataService";

export const droneSlide = createSlice({
  name: "drone",
  initialState: {
    data: null,
    error: null,
    current: null,
    item: [],
  },
  reducers: {
    getdrone: (state, action) => {
      state.data = action.payload;
    },
    editdrone: (state, action) => {
      state.item = action.payload;
    },
  },
});
export const adddroneAsync = async (url, data) => {
  try {
    const datas = await DataService.post(url, data);
    return datas;
  } catch (error) {
    return error;
  }
};
export const getdroneAsync = (data) => async (dispatch) => {
  try {
    const datas = await DataService.get(data);
    dispatch(getdrone(datas));
  } catch (error) {
    // //throw new Error(err);
  }
};
export const getdroneFilterAsync = async (data) => {
  try {
    const datas = await DataService.get(data);
    return datas;
  } catch (error) {
    return error;
  }
};
export const editdroneAsync = async (url, data) => {
  try {
    const datas = await DataService.put(url, data);
    return datas;
  } catch (error) {
    return error;
  }
};
export const deletedrone = async (data) => {
  try {
    const datas = await DataService.delete(data);
    return datas;
  } catch (error) {
    return error;
  }
};

export const deletedroneAll = async (url, data) => {
  try {
    const datas = await DataService.delete(url, data);
    return datas;
  } catch (error) {
    return error;
  }
};

export const { getdrone, editdrone } = droneSlide.actions;
export default droneSlide.reducer;
