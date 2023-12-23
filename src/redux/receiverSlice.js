import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  receiverId: '',
  conversationId:''
};

export const receiverSlice = createSlice({
  name: 'receiverId',
  initialState,
  reducers: {
    setReceiverId: (state, action) => {
      state.receiverId = action.payload;
    },
    setConversationId: (state, action) => {
      state.conversationId = action.payload;
    },
  },
});



export const { setReceiverId, setConversationId } = receiverSlice.actions;

export default receiverSlice.reducer;
