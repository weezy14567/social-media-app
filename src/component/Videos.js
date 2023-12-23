import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

import { format } from 'timeago.js';
import Button from 'react-bootstrap/esm/Button';

import { useDispatch, useSelector } from 'react-redux';
import { fetchvideoSuccess, videoLike } from '../redux/videoSlice';
import { postLike } from '../redux/userSlice';

import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import Comment from '../pages/CommentSection/Comment';
import CommentBox from '../pages/CommentSection/CommentBox';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import CommentReplys from '../pages/CommentSection/CommentReplys';
import ReplyBox from '../pages/CommentSection/ReplyBox';
import { fetchnotificationSuccess } from '../redux/notificationSlice';

function Videos(props) {
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const scrollRef = useRef();
  const { currentVideo, socket } = props;
  const [commentOpen, setCommentOpen] = useState(false);
  const [commentOpens, setCommentOpens] = useState('');
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [commentId, setCommentId] = useState('');
  const [commenterId, setCommenterId] = useState('');
  const [replys, setReplys] = useState([]);
  const [currentComment, setCurrentComment] = useState('');
  const { notification } = useSelector((state) => state.notify);

 

  const handleLike = async (id, postId) => {
    try {
      const res = await axios.put(
        `http://localhost:4000/api/videos/${id}/${postId}`
      );
      dispatch(postLike(postId));
      dispatch(videoLike(id));
      const { data } = await axios.post(
        `http://localhost:4000/api/notifications/${postId}/${id}`
      );


    
      
    if (data && res) {
      socket?.current?.emit('like', {
        senderId: data.senderId,
        receiverId: res?.data.receiverId,
        postId: data.postId,
        postImgUrl: data.imgUrl,
        senderName: data.senderName,
        createdAt: data.createdAt,
        
        notificationType:data.notificationType,
        senderImgUrl: userInfo.imgUrl,
        receiverName: data.receiverName,
        userId: data.userId,

        isRead: data.isRead,
        isReadByReceiver: data.isReadByReceiver,
        isReadBySender: data.isReadBySender,
        isViewed: data.isViewed,
        requestSenders: data.requestSenders,
      });
    }
    } catch (error) {
      console.log(error);
    }
  };

  

  

  useEffect(() => {
    socket?.current?.on('getLikes', (data) => {
      
      dispatch(fetchnotificationSuccess([ ...notification, data ]));
    });
  }, [socket, dispatch, notification]);


  const customFormat = (timestamp) => {
    const secondsAgo = Math.floor(
      (Date.now() - new Date(timestamp).getTime()) / 1000
    );
    if (secondsAgo < 60) {
      return `${secondsAgo}s`;
    } else if (secondsAgo < 3600) {
      return `${Math.floor(secondsAgo / 60)}m`;
    } else if (secondsAgo < 86400) {
      return `${Math.floor(secondsAgo / 3600)}hr`;
    } else if (secondsAgo < 604800) {
      return `${Math.floor(secondsAgo / 86400)}w`;
    } else if (secondsAgo < 2592000) {
      return `${Math.floor(secondsAgo / 604800)}mth`;
    } else if (secondsAgo < 31536000) {
      return `${Math.floor(secondsAgo / 2592000)}yr`;
    } else {
      return format(timestamp).slice(0, 3);
    }
  };

  const handleCommentSection = (section) => {
    setCommentOpen((prevOpenSections) => {
      const updatedOpenSections = { ...prevOpenSections };
      updatedOpenSections[section] = !updatedOpenSections[section];
      Object.keys(updatedOpenSections).forEach((key) => {
        if (key !== section) {
          updatedOpenSections[key] = false;
        }
      });
      return updatedOpenSections;
    });
  };

  const handleCommentReply = async (id) => {
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/comments/getreplies/${id}`
      );
      
      setReplys(data);
      setCommentOpens(id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReplyClick = (comment) => {
    setCurrentComment(comment);
  };

  const handleCommentId = (comment) => {
    setCommentId(comment);
  };

  const handleCommenterId = (comment) => {
    setCommenterId(comment);
  };

  const handleCommentLike = async (commentId, userId) => {
    try {
      await axios.put(
        `http://localhost:4000/api/comments/likes/${commentId}/${userId}`
      );
      
    } catch (error) {
      console.log(error);
    }
  };

  const [shouldScroll, setShouldScroll] = useState(false);

  useEffect(() => {
    if (currentComment) {
      scrollRef?.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentComment]);

  return (
    <div className={'d-flex'} style={{ overflowX: 'hidden', }}>
      <div className=" align-items-center " style={{ overflow: 'auto' }}>
        {currentVideo && currentVideo?.length === 0 ? (
          <div
            className="d-flex  flex-column justify-content-center text-center my-2 text-capitalize"
            style={{ opacity: '0.3', height: '100vh' }}
          >
            <h2 className="text-center"> no post available</h2>
          </div>
        ) : (
          <div className=" align-items-center   ">
            {currentVideo?.map((item) => (
              <div key={item?.video.feed?._id} >
                {item?.video.feed?.type === 'video' ? (
                  <div style={{ textDecoration: 'none', color: 'black' }}>
                    <Card
                      style={{
                        marginBottom: '1rem',
                       
                      }}
                    >
                      <Link
                        to={`/user/${item?.video.userId}`}
                        style={{ textDecoration: 'none', color: 'black' }}
                      >
                        <div className=" d-flex px-3 py-3 gap-2 align-items-center">
                          <span  className="user-image">
                            <img
                              src={`http://localhost:4000/${item?.video?.userImg}`}
                              alt={''}
                            
                            />
                          </span>
                          <span className="d-flex flex-column">
                            <strong className="text-decoration-none text-capitalize">
                              {item?.video?.name}
                            </strong>
                            <strong
                              style={{ fontSize: '12px', opacity: '0.4' }}
                            >
                              {format(item?.video?.feed?.createdAt)}
                            </strong>
                          </span>
                        </div>
                      </Link>

                      <Card.Title></Card.Title>
                      <span className="mb-3 px-3">
                        {showFullDescription ||
                        item?.video?.feed?.title?.length < 100 ? (
                          <div
                            style={{
                              fontSize: '16px',
                              textTransform: 'capitalize',
                              opacity: '0.9',
                            }}
                          >
                            {item?.video?.feed?.title}
                          </div>
                        ) : (
                          `${item?.video?.feed?.title?.slice(0, 100)}... `
                        )}
                        {item?.video?.feed?.title?.length >= 100 && (
                          <Link
                            variant="link"
                            onClick={() =>
                              setShowFullDescription(!showFullDescription)
                            }
                            className="p-0 mx-1 fw-bold mt-1"
                          >
                            {showFullDescription ? 'See Less' : 'See More'}
                          </Link>
                        )}
                      </span>
                      <Link
                        to={`/video/${item?.video?.feed?._id}`}
                        style={{ textDecoration: 'none', color: 'black', }}
                        className="videosss"
                      >
                        <img
                          src={`http://localhost:4000/${item?.video?.feed?.imgUrl}`}
                          alt={''}
                          style={{ width: '100%', objectFit:"contain" }}
                        />
                      </Link>

                      <Card.Body className="postImg">
                        <div className="d-flex pb-2 gap-2 align-items-center border-bottom">
                          <span>
                            {' '}
                            <i
                              className="fa fa-thumbs-up p-1"
                              aria-hidden="true"
                              style={{
                                color: 'white',
                                borderRadius: '50%',
                                backgroundColor: 'rgb(0, 191, 255)',
                              }}
                            ></i>
                          
                          </span>

                          <div
                            style={{ width: '100%' }}
                            className="d-flex align-items-center justify-content-between"
                          >
                            <span>
                              {item?.video?.feed?.like?.length === 0
                                ? null
                                : userInfo?.likes?.includes(
                                    item?.video?.feed?._id
                                  )
                                ? item?.video?.feed?.like?.length === 1 &&
                                  item?.video?.feed?.like?.find(
                                    (id) => id === userInfo?._id
                                  )
                                  ? `you like this post`
                                  : `you and ${
                                      item?.video?.feed?.like?.length - 1
                                    } others like this post`
                                : item?.video?.feed?.like?.length === 1
                                ? `${item?.video?.feed?.like?.length} like`
                                : `${item?.video?.feed?.like?.length} likes`}
                            </span>

                            {item.comments.length > 0 && (
                              <span>
                                {item?.comments.length}
                                <MarkUnreadChatAltIcon
                                  style={{
                                    opacity: '0.6',
                                    color: 'rgb(0, 191, 255)',
                                  }}
                                />
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="border-bottom">
                          <div
                            className="d-flex justify-content-between p-3 align-items-center"
                            style={{ width: '80%', margin: 'auto' }}
                          >
                            <Button
                              onClick={() =>
                                handleLike(
                                  userInfo?._id,
                                  item?.video?.feed?._id
                                )
                              }
                              variant="lighter"
                              style={{}}
                            >
                              {userInfo?.likes?.find(
                                (id) => id === item?.video?.feed?._id
                              ) ? (
                                <ThumbUpAltIcon className="text-primary" />
                              ) : (
                                <ThumbUpOffAltIcon />
                              )}
                            </Button>

                            <span
                              style={{ cursor: 'pointer' }}
                              onClick={() =>
                                handleCommentSection(item.video.feed._id)
                              }
                              className="d-none d-md-flex align-items-center gap-2"
                            >
                              {' '}
                              <ChatBubbleOutlineIcon /> comment
                            </span>
                            <span className="d-md-none">
                              {' '}
                              <ChatBubbleOutlineIcon />
                            </span>

                            <span className="d-none d-md-block">
                              <i
                                className="fa fa-share fs-5"
                                aria-hidden="true"
                              >
                                {' '}
                              </i>{' '}
                              share
                            </span>
                            <span className="d-md-none">
                              <i
                                className="fa fa-share fs-5"
                                aria-hidden="true"
                              >
                                {' '}
                              </i>{' '}
                            </span>
                          </div>
                        </div>
                        <div style={{ opacity: '0.8' }}>
                          {item.comments.length > 1 && (
                            <div className="my-3">
                              {' '}
                              <div className="mb-3">
                                <Link
                                  onClick={() =>
                                    handleCommentSection(item.video.feed._id)
                                  }
                                  className="text-black  fw-bold"
                                >
                                  Read more comment
                                </Link>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="my-3">
                          {!commentOpen[item.video.feed._id] && (
                            <div>
                              {item?.comments &&
                                item?.comments?.slice(0, 1).map((comment) => (
                                  <div
                                    className="mb-3"
                                    key={comment?.comment?._id}
                                  >
                                    <div
                                      className="d-flex gap-2"
                                      style={{
                                        borderRadius: '10px',
                                        maxWidth: '100%',
                                      }}
                                    >
                                      <div
                                        style={{
                                          width: '40px',
                                          height: '40px',
                                          borderRadius: '50%',
                                          border: '1px solid black',
                                        }}
                                      >
                                        {' '}
                                        <Link
                                          style={{ color: 'inherit' }}
                                          className="text-decoration-none "
                                          to={`/user/${comment.comment.userId}`}
                                        >
                                          <img
                                            src={`http://localhost:4000/${comment.commenterImg}`}
                                            alt={''}
                                            style={{
                                              width: '40px',
                                              height: '100%',
                                              objectFit: 'cover',
                                              borderRadius: '50%',
                                            }}
                                          />
                                        </Link>
                                      </div>
                                      <div
                                        style={{
                                          width: '100%',
                                        }}
                                      >
                                        <div
                                          className="d-flex commentBG flex-column py-1 px-2"
                                          style={{
                                            borderRadius: '10px',
                                            maxWidth: '80%',
                                            width: 'fit-content',
                                            position: 'relative',
                                          }}
                                        >
                                          <Link
                                            style={{ color: 'inherit' }}
                                            className="text-decoration-none "
                                            to={`/user/${comment.comment.userId}`}
                                          >
                                            <strong
                                              className="text-capitalize"
                                              style={{ opacity: '0.8' }}
                                            >
                                              {comment.commenterName}
                                            </strong>
                                          </Link>
                                          <span>{comment?.comment?.desc}</span>
                                          {comment?.comment?.likes.length >=
                                            1 && (
                                            <span
                                              style={{
                                                position: 'absolute',
                                                bottom: -4,
                                                right: -21,
                                              }}
                                            >
                                              <ThumbUpAltIcon
                                                style={{
                                                  width: '21px',
                                                  height: '21px',
                                                  borderRadius: '10px',
                                                  border: '2px solid white',
                                                }}
                                                className="bg-primary text-white"
                                              />
                                              {comment?.comment?.likes?.length}
                                            </span>
                                          )}
                                        </div>

                                        <div
                                          style={{ opacity: '0.7' }}
                                          className="d-flex text-capitalize mt-1 align-items-center  gap-3"
                                        >
                                          <span>
                                            {customFormat(
                                              comment?.comment.createdAt
                                            )}
                                          </span>

                                          <strong style={{ fontSize: '13px' }}>
                                            <Link
                                              onClick={() => {
                                                handleCommentId(
                                                  comment?.comment._id
                                                );
                                                handleReplyClick(
                                                  comment?.comment.postId
                                                );
                                                handleCommenterId(
                                                  comment?.comment.userId
                                                );
                                              }}
                                              style={{ opacity: '0.7' }}
                                              className="text-black"
                                            >
                                              reply
                                            </Link>
                                          </strong>
                                          <strong style={{ fontSize: '13px' }}>
                                            <Link
                                              style={{ opacity: '0.7' }}
                                              className="text-black"
                                              onClick={() =>
                                                handleCommentLike(
                                                  comment.comment?._id,
                                                  userInfo?._id
                                                )
                                              }
                                            >
                                              like
                                            </Link>
                                          </strong>
                                          <strong style={{ fontSize: '13px' }}>
                                            <Link
                                              style={{ opacity: '0.7' }}
                                              className="text-black"
                                            >
                                              share
                                            </Link>
                                          </strong>
                                        </div>
                                        {comment?.comment.CommentReplys
                                          ?.length > 0 && (
                                          <div>
                                            <Link
                                              onClick={() =>
                                                handleCommentReply(
                                                  comment?.comment?._id
                                                )
                                              }
                                              style={{ opacity: '0.6' }}
                                              className="d-flex align-items-center gap-2 text-decoration-none text-black"
                                            >
                                              <SubdirectoryArrowRightIcon />
                                              <strong>
                                                view all replies{' '}
                                                {
                                                  comment?.comment
                                                    ?.CommentReplys.length
                                                }
                                              </strong>
                                            </Link>

                                            {commentOpens ===
                                              comment?.comment?._id && (
                                              <CommentReplys
                                                commentOpens={commentOpens}
                                                handleCommentReply={
                                                  handleCommentReply
                                                }
                                                comments={replys}
                                                handleReplyClick={
                                                  handleReplyClick
                                                }
                                                setCommentId={setCommentId}
                                                setCommenterId={setCommenterId}
                                                setShouldScroll={
                                                  setShouldScroll
                                                }
                                              />
                                            )}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          )}

                          {commentOpen[item.video.feed._id] && (
                            <div>
                              <Comment
                                commentOpens={commentOpens}
                                handleCommentReply={handleCommentReply}
                                replys={replys}
                                comments={item?.comments}
                                setCommentId={setCommentId}
                                setCommenterId={setCommenterId}
                                handleReplyClick={handleReplyClick}
                                handleCommentLike={handleCommentLike}
                                setShouldScroll={setShouldScroll}
                              />
                            </div>
                          )}

                          {item?.video?.feed?._id !== currentComment && (
                            <CommentBox socket={socket} userId={item?.video?.feed?.userId} postId={item?.video?.feed?._id} />
                          )}

                          {item.video.feed._id === currentComment && (
                            <div ref={scrollRef}>
                              <ReplyBox
                                setCurrentComment={setCurrentComment}
                                commentId={commentId}
                                commenterId={commenterId}
                                socket={socket}
                              />
                            </div>
                          )}
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                ) : (
                  ''
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Videos;
