import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentVideo: [],
  loading: false,
  error: false,
};

export const videoSlice = createSlice({
  name: 'currentVideo',
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchvideoSuccess: (state, action) => {
      state.loading = false;
      state.currentVideo = action.payload;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },

   
    videoLike: (state, action) => {
      state.currentVideo = state.currentVideo.map((video) => {
       if(video.video.feed.like){
        if (video.video.feed.like?.find((like)=>like === action.payload)) {
          video.video.feed.like = video.video.feed.like.filter((like) => like !== action.payload); 
        } else {
          video.video.feed.like.push(action.payload);
        }
       }
        return video;
      });
    },
  },
});

export const {videoLike, fetchStart, fetchvideoSuccess, fetchFail, likeCount } =
  videoSlice.actions;

export default videoSlice.reducer;
