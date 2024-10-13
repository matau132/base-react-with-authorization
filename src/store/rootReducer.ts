import { homePageName, homePageReducer } from "app/pages/HomePage/slice/slice";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  [homePageName]: homePageReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
