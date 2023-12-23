import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import {
  fetchnotificationSuccess,
  markFriendRequestAsRead,
  markNotificationAsRead,
} from '../redux/notificationSlice';
import { format } from 'timeago.js';

function Notification(props) {
  const { notification } = useSelector((state) => state.notify);
  const { userInfo } = useSelector((state) => state.user);

  const { setNotifyOpen } = props;

  const dispatch = useDispatch();

  const handleViewdNotification = async (id) => {
    try {
      await axios.put(`http://localhost:4000/api/notifications/isread/${id}`);
      setNotifyOpen(false);

      dispatch(markNotificationAsRead(id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewFriendRequest = async (id, isReadId) => {
    try {
      await axios.put(
        `http://localhost:4000/api/notifications/friendRequestisread/${id}/${isReadId}`
      );

      dispatch(markFriendRequestAsRead({ id, isReadId }));
      dispatch(markNotificationAsRead(id));
      setNotifyOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const updatedDetailsOfNotifications = notification?.map((notify) => {
    const senderId = notify?.senderId;
    const receiverId = notify?.receiverId;
    const senderImgUrl = notify?.senderImgUrl;
    const createdAt = notify?.notification?.createdAt;
    const isRead = notify?.notification?.isRead;
    const isReadByReceiver = notify?.notification?.isReadByReceiver;
    const postImgUrl = notify?.notification?.postImgUrl;
    const notificationType = notify?.notification?.notificationType;
    const postId = notify?.notification?.postId;
    const requestSenders = notify?.notification?.requestSenders;
    const isViewed = notify?.notification?.isViewed;
    const isReadBySender = notify?.notification?.isReadBySender;
    const senderName = notify?.notification?.senderName;
    const notificationId = notify?.notification?._id;
    const receiverImgUrl = notify?.receiverImgUrl;
    const receiverName = notify?.receiverName;

    return {
      senderId,
      receiverId,
      postId,
      postImgUrl,
      senderName,
      notificationId,
      receiverImgUrl,
      isRead,
      isReadByReceiver,
      isReadBySender,
      isViewed,
      requestSenders,
      notificationType,
      createdAt,
      senderImgUrl,
      receiverName,
    };
  });

  console.log('notcationlength', notification.length);

  return (
    <div style={{ height: '100vh' }}>
      <Card style={{ height: '100%', minWidth: '300px' }}>
        <div className=" my-3 ">
          <h4 className="text-center mb-3">Notifications</h4>
          {notification?.length === 0 ? (
            <div className="p-5">No notification</div>
          ) : (
            <div className="">
              {' '}
              {updatedDetailsOfNotifications.map((notify) => (
                <div key={notify?.notificationId}>
                  {notify.notificationType === 'like' ? (
                    <div>
                      <Link
                        to={`/video/${notify?.postId}`}
                        className={
                          notify.isRead === false
                            ? ' px-4 pb-2 justify-content-between text-decoration-none text-black d-flex unread align-items-center gap-3 '
                            : 'px-4 pb-2 justify-content-between d-flex align-items-center gap-3  text-decoration-none text-black '
                        }
                        onClick={() =>
                          handleViewdNotification(notify.notificationId)
                        }
                      >
                        <div className="d-flex align-content-center gap-3">
                          {' '}
                          <div>
                            {' '}
                            {notify?.isRead === false && (
                              <FiberManualRecordIcon
                                style={{
                                  width: '12px',
                                  height: '12px',
                                  color: 'rgba(68, 68, 232, 0.813)',
                                }}
                              />
                            )}
                            <img
                              src={`http://localhost:4000/${notify?.senderImgUrl}`}
                              alt=""
                              style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                              }}
                            />
                          </div>
                          <span className="d-flex flex-column">
                            <span
                              className="d-flex align-items-center gap-2 "
                              style={{ opacity: '0.7', width: '100%' }}
                            >
                              <Link
                                to={`/user/${notify?.senderId}`}
                                className="text-decoration-none  text-black"
                              >
                                <strong>{notify?.senderName}</strong>
                              </Link>{' '}
                              likes your post
                            </span>

                            <span
                              className="text-start"
                              style={{ fontSize: '13px', opacity: '0.6' }}
                            >
                              {format(notify?.createdAt)}
                            </span>
                          </span>
                        </div>

                        {notify?.postImgUrl && (
                          <img
                            src={`http://localhost:4000/${notify?.postImgUrl}`}
                            alt=""
                            style={{
                              width: '40px',
                              height: '40px',
                              borderRadius: '5px',
                            }}
                          />
                        )}
                      </Link>
                    </div>
                  ) : (
                    <div>
                      {notify?.senderId !== userInfo?._id && (
                        <Link
                          to={`/user/${notify?.senderId}`}
                          className={
                            notify.isReadByReceiver === false
                              ? 'px-4 pb-2  text-decoration-none text-black d-flex unread align-items-center gap-3 '
                              : 'px-4 pb-2  d-flex align-items-center   gap-3  text-decoration-none text-black '
                          }
                          key={notify.notificationId}
                          onClick={() =>
                            handleViewFriendRequest(
                              notify.notificationId,
                              userInfo?._id
                            )
                          }
                        >
                          <div>
                            {' '}
                            {notify?.isReadByReceiver === false && (
                              <FiberManualRecordIcon
                                style={{
                                  width: '12px',
                                  height: '12px',
                                  color: 'rgba(68, 68, 232, 0.813)',
                                }}
                              />
                            )}
                            <img
                              src={`http://localhost:4000/${notify?.senderImgUrl}`}
                              alt=""
                              style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                              }}
                            />
                          </div>

                          <span className="d-flex flex-column">
                            <Link
                              to={`/user/${notify?.senderId}`}
                              className="text-decoration-none d-flex gap-2 align-items-center text-black"
                              style={{ opacity: '0.7' }}
                            >
                              you and <strong>{notify?.senderName}</strong>
                              are now friends
                            </Link>{' '}
                            <span
                              className="text-start"
                              style={{ fontSize: '13px', opacity: '0.6' }}
                            >
                              {format(notify?.createdAt)}
                            </span>
                          </span>
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

export default Notification;
