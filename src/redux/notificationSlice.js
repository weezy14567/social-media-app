import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notification: [],
  loading: false,
  error: false,
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchnotificationSuccess: (state, action) => {
      state.loading = false;
      state.notification = action.payload;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },

    markNotificationAsRead: (state, action) => {
      const notificationIndex = state.notification.findIndex(
        (notice) => notice.notification._id === action.payload
      );

      if (notificationIndex !== -1) {
        state.notification[notificationIndex].notification.isRead = true;
      }
    },
    markAllNotificationsAsViewed: (state, action) => {
      const id = action.payload;

      state.notification.forEach((notice) => {
        if (!notice.notification.isViewed.includes(id)) {
          notice.notification.isViewed.push(id);
        }
      });
    },

    markFriendRequestAsRead: (state, action) => {
      const { id, isReadId } = action.payload;
      const notificationIndex = state.notification.findIndex(
        (notice) => notice.notification._id === id
      );

      if (notificationIndex !== -1) {
        const updatedNotification = {
          ...state.notification[notificationIndex].notification,
        };

        if (updatedNotification.senderId === isReadId) {
          updatedNotification.isReadBySender = true;
        } else {
          updatedNotification.isReadByReceiver = true;
        }

        state.notification[notificationIndex].notification =
          updatedNotification;
      }
    },

    
  },
});

export const {
  markAllNotificationsAsViewed,
  markFriendRequestAsRead,
  fetchnotificationSuccess,
  markNotificationAsRead,
} = notificationSlice.actions;

export default notificationSlice.reducer;
