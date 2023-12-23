import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: null,
  loading: false,
  error: false,
};

export const userSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    },
    loginFail: (state) => {
      state.loading = false;
      state.error = true;
    },
    logOut: () => initialState,
    postLike: (state, action) => {
      if (state.userInfo.likes?.find((like) => like === action.payload)) {
        state.userInfo.likes?.splice(
          state.userInfo.likes?.findIndex((like) => like === action.payload),
          1
        );
      } else {
        state.userInfo.likes?.push(action.payload);
      }
    },
    befriends: (state, action) => {
      if (state.userInfo.friends.includes(action.payload)) {
        state.userInfo.friends.splice(
          state.userInfo.friends.findIndex(
            (friend) => friend === action.payload
          ),
          1
        );
      } else {
        state.userInfo.friends.push(action.payload);
      }
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFail,
  logOut,
  befriends,
  postLike,
} = userSlice.actions;

export default userSlice.reducer;
