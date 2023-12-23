import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  singleVideo: {},
  loading: false,
  error: false,

};

export const singleVideoSlice = createSlice({
  name: 'singleVideo',
  initialState,
  reducers: {
    singlefetchStart: (state) => {
      state.loading = true;
    },
    singlefetchSuccess: (state, action) => {
      state.loading = false;
      state.singleVideo = action.payload;
    },
    singlefetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  
    
   singleVideolike: (state, action) => {
        if (state.singleVideo.video.like.includes(action.payload)) {
          state.singleVideo.video.like.splice(
            state.singleVideo.video.like.findIndex(
              (like) => like === action.payload
            ),
            1
          );
        } else {
          state.singleVideo.video.like.push(action.payload);
        }
      },
  },
});


export const { singlefetchStart, singlefetchSuccess, singlefetchFail, singleVideolike } =
  singleVideoSlice.actions;

export default singleVideoSlice.reducer;