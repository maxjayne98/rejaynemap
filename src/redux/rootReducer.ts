import { combineReducers } from "redux";
import sharedSlice from "./shared/slice";
import themeSlice from "./theme/slice";
import airQualitySensorSlice from "redux/airQualitySensor/slice";
const reducers = combineReducers({
  shared: sharedSlice,
  airQualitySensor: airQualitySensorSlice,
  globalTheme: themeSlice,
});

export default reducers;
