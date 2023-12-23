import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  videoLike: {},
  loading: false,
  error: false,

};

export const videoLikeSlice = createSlice({
  name: 'videoLike',
  initialState,
  reducers: {
    videofetchStart: (state) => {
      state.loading = true;
    },
    videofetchSuccess: (state, action) => {
      state.loading = false;
      state.videoLike = action.payload;
    },
    videofetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  
    
    videoCountLike: (state, action) => {
        if (state.videoLike.like.includes(action.payload)) {
            state.videoLike.like.splice(
              state.videoLike.like.findIndex(
                (like) => like === action.payload
              ),
              1
            );
          } else {
            state.videoLike.like.push(action.payload);
          }
        },
  },
});


export const { videofetchStart, videofetchSuccess, videofetchFail, videoCountLike } =
videoLikeSlice.actions;

export default videoLikeSlice.reducer;