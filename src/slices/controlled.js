import { createSlice } from "@reduxjs/toolkit";

export const controlledSlide = createSlice({
  name: "controlled",
  initialState: {
    zoom: 6,
    mouse: [],
  },
  reducers: {
    getzoom: (state, action) => {
      state.zoom = action.payload;
    },
    getmouse: (state, action) => {
      state.mouse = action.payload;
    },
  },
});

export const { getzoom, getmouse } = controlledSlide.actions;
export default controlledSlide.reducer;
