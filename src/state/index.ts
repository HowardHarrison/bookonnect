import { createSlice } from "@reduxjs/toolkit";
import { User } from "types/User";

interface AuthState {
  // mode: "light" | "dark";
  user: User | null;
  token: string | null;
  posts: any[]; // You can replace `any` with a proper Post type
}

const initialState:AuthState = {
    // mode: "light",
    user:  null,
    token: null,
    posts: [],
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      // setMode: (state) => {
      //   state.mode = state.mode === "light" ? "dark" : "light";
      // },
      setLogin: (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
      },
      setLogout: (state) => {
        state.user = null;
        state.token = null;
      },
    }
})

export const {setLogin, setLogout} = authSlice.actions;
export default authSlice.reducer;