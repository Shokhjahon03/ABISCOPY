import { createSlice } from "@reduxjs/toolkit";
import { APIClient } from "../helpers/api_helper";
import { DataService } from "../helpers/dataService/dataService";

export const categorySlide = createSlice({
  name: "category",
  initialState: {
    data: null,
    error: null,
    current: null,
    item: [],
  },
  reducers: {
    getcategory: (state, action) => {
      state.data = action.payload;
    },
    editcategory: (state, action) => {
      state.item = action.payload;
    },
  },
});
export const addcategoryAsync = async (url, data) => {
  try {
    const datas = await DataService.post(url, data);
    return datas;
  } catch (error) {
    return error;
  }
};
export const getcategoryAsync = (data) => async (dispatch) => {
  try {
    const datas = await DataService.get(data);
    dispatch(getcategory(datas));
  } catch (error) {
    // //throw new Error(err);
  }
};
export const editcategoryAsync = async (url, data) => {
  try {
    const datas = await DataService.put(url, data);
    return datas;
  } catch (error) {
    return error;
  }
};
export const deletecategory = async (data) => {
  try {
    const datas = await DataService.delete(data);
    return datas;
  } catch (error) {
    return error;
  }
};

export const { getcategory, editcategory } = categorySlide.actions;
export default categorySlide.reducer;
