import { createSlice } from "@reduxjs/toolkit";

interface State {}

const initialState: State = {};

export const homePageName = "homePage";

const slice = createSlice({
  name: homePageName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const {} = slice.actions;

export const homePageReducer = slice.reducer;
