import {
  Action,
  configureStore,
  ThunkAction,
  MiddlewareArray,
} from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});
export default store;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
