import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  friendsList: [],
  loading: false,
  error: false,
};

export const friendSlice = createSlice({
  name: 'friendsList',
  initialState,
  reducers: {
    friendsFetchStart: (state) => {
      state.loading = true;
    },
    friendsFetchSuccess: (state, action) => {
      state.loading = false;
      state.friendsList = action.payload;
    },
    friendsFetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },

    friendListCount: (state, action) => {
      if (
        state.friendsList.friends.find((friendId) => friendId === action.payload)
      ) {
        state.friendsList.friends = state.friendsList.friends.filter(
          (friend) => friend !== action.payload
        );
      } else {
        state.friendsList.friends.push(action.payload);
      }
    },

  friendLogout: initialState
  },
});

export const {
  friendsFetchFail,
  friendsFetchSuccess,
  friendsFetchStart,
  friendsbeCount,
  friendListCount,
} = friendSlice.actions;

export default friendSlice.reducer;
