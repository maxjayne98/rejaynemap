import { combineReducers } from "redux";
import sharedSlice from "./shared/slice";
import themeSlice from "./theme/slice";

const reducers = combineReducers({
  shared: sharedSlice,
  globalTheme: themeSlice,
});

export default reducers;
