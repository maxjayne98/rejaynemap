import { createAsyncThunk } from "@reduxjs/toolkit";
import { sharedActions } from "./slice";
import api from "./api";
export const increaseCounter = (num) => sharedActions.increment(num);
export const decreaseCounter = (num) => sharedActions.decrement(num);
// export const fetchUser = createAsyncThunk(
//   "shared/successUsers",
//   async (dispatch) => {
//     // Fetch the backend endpoint:
//     const response = await fetch(`https://jsonplaceholder.typicode.com/todos`);

//     // Get the JSON from the response:
//     const data = await response.json();

//     // Return result:
//     return data;
//     // try {
//     //   await api
//     //     .users(1, "ir")
//     //     .then((res) => dispatch(sharedActions.successUsers(res.data.results)));
//     // } catch (e) {
//     //   console.log("error has happend!!");
//     // }
//   }
// );
