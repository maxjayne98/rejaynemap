import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
  counter: 0,
  loading: false,
  users: [],
  error: {},
};
export const fetchUser = createAsyncThunk("todos/fetch", async () => {
  // Fetch the backend endpoint:
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos`);

  // Get the JSON from the response:
  const data = await response.json();

  // Return result:
  return data;
});

const sharedSlice = createSlice({
  name: "shared",
  initialState: initialState,
  reducers: {
    increment: (state, action) => {
      state.counter += action.payload;
    },
    decrement: (state, action) => {
      state.counter -= action.payload;
    },
    successUsers: (state, action) => {
      state.users = [...action.payload, ...state.users];
    },
  },
  extraReducers: {
    [fetchUser.pending]: (state, action) => {
      state.loading = "loading";
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.status = "succeeded";
      // Add any fetched posts to the array
      // state.posts = state.posts.concat(action.payload);
    },
    [fetchUser.rejected]: (state, action) => {
      state.status = "failed";
      // state.error = action.error.message;
    },
  },
});

export const sharedActions = sharedSlice.actions;

export default sharedSlice.reducer;
