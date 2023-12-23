import axios from 'axios';
import React, { useEffect, useReducer, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import Form from 'react-bootstrap/Form';

import Friends from './Friends';
import UserPosts from './UserPosts';
import UserPhotos from './UserPhotos';
import UserVideo from './UserVideo';
import UserEvent from './UserEvent';
import About from './About';

import FormGroup from 'react-bootstrap/FormGroup';
import { useDispatch, useSelector } from 'react-redux';
import { befriends, loginSuccess } from '../redux/userSlice';
import { friendListCount, friendsFetchSuccess } from '../redux/friendsSlice';
import { fetchvideoSuccess } from '../redux/videoSlice';
import { fetchnotificationSuccess } from '../redux/notificationSlice';
import { setConversationId } from '../redux/receiverSlice';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return { ...state, user: action.payload.user, feed: action.payload.feed };
    default:
      return state;
  }
}

function UserAndDetails(props) {
  const ctxDispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const { friendsList } = useSelector((state) => state.friends);
  const { currentVideo } = useSelector((state) => state.video);
  const [{ user, feed }, dispatch] = useReducer(reducer, {
    user: {},
    feed: [],
  });
  const { socket } = props;
  const params = useParams();
  const { userId } = params;
  const [friends, setFriends] = useState([]);
  const [userData, setUserData] = useState([]);
  const [imgUrl, setNewImgUrl] = useState(null);
  const profileInputRef = useRef(null);

  const initialSelectedSection =
    localStorage.getItem('selectedSection') || 'Post';
  const [selectedSection, setSelectedSection] = useState(
    initialSelectedSection
  );

  const handleSelections = (section) => {
    setSelectedSection(section);
    localStorage.setItem('selectedSection', section);
  };

  const addFriends = async (id, friendId) => {
    try {
      await axios.put(`http://localhost:4000/api/users/${id}/${friendId}`);

      ctxDispatch(befriends(friendId));
      ctxDispatch(friendListCount(id));

      const { data } = await axios.post(
        `http://localhost:4000/api/notifications/friendrequest/${id}/${friendId}`
      );

      const addFriendsData = {
        senderId: data?.senderId,
        receiverId: data?.receiverId,
        senderName: data?.senderName,
        notificationId: data?._id,

        isRead: data?.isRead,
        isReadByReceiver: data?.isReadByReceiver,
        isViewed: data?.isViewed,
        requestSenders: data?.requestSenders,
        notificationType: data?.notificationType,
        createdAt: data?.createdAt,
        senderImgUrl: userInfo?.imgUrl,
      };

      if (addFriendsData) {
        socket?.current?.emit('addfriends', { addFriendsData });
        console.log(addFriendsData);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const { notification } = useSelector((state) => state.notify);
  const {conversationId} =useSelector((state)=> state.receiver)


  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/users/${userId}`
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
        ctxDispatch(friendsFetchSuccess(data.user));

        setUserData(data.feed);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [userId, ctxDispatch]);

  useEffect(() => {
    const handleCommentsAndHomeVideo = async () => {
      try {
        const videosWithComments = [];
        for (const video of userData) {
          const { data } = await axios.get(
            `http://localhost:4000/api/comments/postcomments/${video?.feed?._id}`
          );
          const comment = data.filter(
            (comment) => comment?.comment?.postId === video?.feed?._id
          );

          const videoAndComment = {
            video: video,
            comments: comment,
          };
          videosWithComments.push(videoAndComment);
        }
        ctxDispatch(fetchvideoSuccess(videosWithComments));
      } catch (error) {
        console.log(error);
      }
    };
    handleCommentsAndHomeVideo();
  }, [userData, ctxDispatch]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/users/friends/${userId}`
        );

        setFriends(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFriends();
  }, [userId, ctxDispatch]);

  const handleProfileUpDate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('imgUrl', imgUrl);
      const { data } = await axios.put(
        `http://localhost:4000/api/users/${userId}`,
        formData
      );
      ctxDispatch(loginSuccess(data));
      setNewImgUrl(null);
      setProfileToggle(false);
    } catch (error) {
      console.error(error);
    }
  };

  const [profileToggle, setProfileToggle] = useState(null);

  const profileUploadToggle = (link) => {
    setProfileToggle(link);
  };
const navigate=useNavigate()
const [currentUserConversation, setCurrentUserConversation]= useState({})

  const handleConversation = async (senderId, receiverId) => {
    try {
      const { data } = await axios.post(
        `http://localhost:4000/api/conversations/create/${senderId}/${receiverId}`
      );
      console.log('created conversation', data?._id);
      setCurrentUserConversation(data)
   
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (currentUserConversation[0]){
      navigate('/messages');
      
      ctxDispatch(setConversationId(currentUserConversation[0]));
    }
  }, [currentUserConversation, ctxDispatch, navigate]);
  
  console.log("converse", currentUserConversation[0]);

  

  return (
    <div>
      <div>
        <div className="bg-light ">
          <div
            className="coverContainer"
            style={{
              margin: 'auto',
              width: '70vw',
              minHeight: '90vh',
            }}
          >
            <div
              className="userCoverPhoto mt-1"
              style={{
                minWidth: '100%',
                minHeight: '55vh',
                borderRadius: '10px',

                position: 'relative',
              }}
            >
              <img
                src="https://cdn.shipsticks.com/blog/wp-content/uploads/2019/09/national-golf-lovers-day-why-golfers-love-the-game-twitter.jpg"
                alt={user?.name}
                style={{
                  minWidth: '100%',
                  minHeight: '55vh',
                  maxWidth: '100%',
                  maxHeight: '55vh',
                }}
              />

              <div
                className="d-none d-md-flex gap-3 mt-3 align-items-center"
                style={{ position: 'absolute', bottom: -200, left: 30 }}
              >
                <Link
                  onClick={() => profileUploadToggle('picture')}
                  style={{
                    cursor: 'pointer',
                    width: '250px',
                    height: '250px',
                    borderRadius: '50%',
                    border: '3px solid white',
                  }}
                  variant="lighter"
                  className="d-none d-md-block"
                >
                  {userInfo?._id === params.userId ? (
                    <img
                      src={`http://localhost:4000/${userInfo?.imgUrl}`}
                      alt={user?.name}
                      style={{
                        borderRadius: '50%',
                        width: '100%',
                        height: '100%',
                      }}
                    />
                  ) : (
                    <img
                      src={`http://localhost:4000/${user?.imgUrl}`}
                      alt={user?.name}
                      style={{
                        borderRadius: '50%',
                        width: '100%',
                        height: '100%',
                      }}
                    />
                  )}
                </Link>

                {userInfo?._id === params?.userId ? (
                  <div
                    style={{
                      width: '500px',
                      height: '200px',
                      backgroundColor: 'white',
                      margin: 'auto',
                      marginTop: '8%',
                      zIndex: '1',
                      position: 'absolute',
                      border: '1px solid black',
                      borderRadius: '10px',
                    }}
                    className={
                      profileToggle
                        ? 'd-flex flex-column justify-content-center align-items-center'
                        : 'd-none'
                    }
                  >
                    <Form
                      onSubmit={handleProfileUpDate}
                      encType="multipart/form-data"
                      style={{ position: 'relative' }}
                    >
                      <div
                        className="d-flex flex-column gap-3 text-black text-start"
                        style={{ opacity: '0.7' }}
                      >
                        {' '}
                        <strong className="text-center fs-5">
                          Update profile
                        </strong>
                        <FormGroup>
                          <Form.Control
                            ref={profileInputRef}
                            label="Update Profile"
                            type="file"
                            onChange={(e) => setNewImgUrl(e.target.files[0])}
                          />
                        </FormGroup>
                        <Button disabled={imgUrl === null} type="submit">
                          upload
                        </Button>
                      </div>
                      <strong
                        onClick={() => setProfileToggle(false)}
                        className=" text-black"
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          cursor: 'pointer',
                        }}
                      >
                        <i class="fa fa-arrow-left" aria-hidden="true"></i>
                      </strong>
                    </Form>
                  </div>
                ) : (
                  ''
                )}
                <div className="d-flex flex-column  profilenameset ">
                  <span className="text-capitalize  fw-bolder">
                    <h2>{user?.name}</h2>
                  </span>
                  <span style={{ opacity: '0.7' }} className="">
                    {userInfo?._id === params.userId ? (
                      <h6> {userInfo?.friends?.length} Friends</h6>
                    ) : (
                      <h6> {friendsList?.friends?.length} Friends</h6>
                    )}
                  </span>
                  <div
                    className="d-flex   align-items-center gap-5"
                    style={{ width: '100%' }}
                  >
                    <div className="d-none d-lg-flex">friends pictures</div>
                    {userInfo?._id === params.userId ? (
                      <div className="d-flex align-items-center profileStorybutton gap-3 ">
                        <Button>+ Add Story</Button>
                        <Button
                          variant="light"
                          style={{
                            backgroundColor: 'rgba(128, 118, 128, 0.5)',
                            color: 'black',
                          }}
                          onClick={() => handleSelections('About')}
                        >
                          Edit Profile
                        </Button>
                        <Button variant="light">
                          <i
                            className="fa fa-caret-down fw-bold"
                            aria-hidden="true"
                          ></i>
                        </Button>
                      </div>
                    ) : (
                      <div className="d-flex align-items-center gap-3 profileStorybutton">
                        <div
                          onClick={() => addFriends(userInfo?._id, user?._id)}
                          variant="lighter"
                          className="d-flex"
                        >
                          {userInfo?.friends?.find(
                            (userId) => userId === user?._id
                          ) ? (
                            <Button
                              variant="light"
                              style={{
                                backgroundColor: 'rgba(128, 118, 128, 0.5)',
                                color: 'black',
                                fontWeight: 'bold',
                                opacity: '0.8',
                              }}
                              className="buttonWidth"
                            >
                              Friends
                            </Button>
                          ) : (
                            <Button
                              style={{
                                fontWeight: 'bold',
                              }}
                              className="buttonWidth"
                            >
                              Follow
                            </Button>
                          )}
                        </div>

                        <Button
                          style={{
                            fontWeight: 'bold',
                          }}
                          className="buttonWidth"
                          onClick={() =>
                            handleConversation(userInfo?._id, user._id)
                          }
                        >
                          Message
                        </Button>
                        <Button variant="light">
                          <i
                            className="fa fa-caret-down fw-bold"
                            aria-hidden="true"
                          ></i>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* MOBILE SECTION START   */}

              <div
                className=" d-md-none d-flex gap- mt-3 align-items-center"
                style={{
                  position: 'absolute',
                  bottom: 120,
                  left: 2,
                  width: '100vw',
                }}
              >
                <Link
                  onClick={() => profileUploadToggle('picture')}
                  style={{
                    cursor: 'pointer',
                    width: '180px',
                    height: '180px',
                    borderRadius: '50%',
                    border: '3px solid white',
                  }}
                  variant="lighter"
                  className=" d-md-none"
                >
                  <img
                    src={`http://localhost:4000/${user?.imgUrl}`}
                    alt={userInfo?.name}
                    style={{
                      borderRadius: '50%',
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </Link>

                {userInfo?._id === params?.userId ? (
                  <div
                    style={{
                      width: '500px',
                      height: '200px',
                      backgroundColor: 'white',
                      margin: 'auto',
                      marginTop: '8%',
                      zIndex: '1',
                      position: 'absolute',
                      border: '1px solid black',
                      borderRadius: '10px',
                    }}
                    className={
                      profileToggle
                        ? 'd-flex flex-column justify-content-center align-items-center'
                        : 'd-none'
                    }
                  >
                    <Form
                      onSubmit={handleProfileUpDate}
                      encType="multipart/form-data"
                      style={{ position: 'relative' }}
                    >
                      <div
                        className="d-flex flex-column gap-3 text-black text-start"
                        style={{ opacity: '0.7' }}
                      >
                        {' '}
                        <strong className="text-center fs-5">
                          Update profile
                        </strong>
                        <FormGroup>
                          <Form.Control
                            ref={profileInputRef}
                            label="Update Profile"
                            type="file"
                            onChange={(e) => setNewImgUrl(e.target.files[0])}
                          />
                        </FormGroup>
                        <Button disabled={imgUrl === null} type="submit">
                          upload
                        </Button>
                      </div>
                      <strong
                        onClick={() => setProfileToggle(false)}
                        className=" text-black"
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          cursor: 'pointer',
                        }}
                      >
                        <i class="fa fa-arrow-left" aria-hidden="true"></i>
                      </strong>
                    </Form>
                  </div>
                ) : (
                  ''
                )}
              </div>

              <div className="d-md-none mx-3 d-flex flex-column  profilenameset ">
                <span className="text-capitalize  fw-bolder">
                  <h2>{user?.name}</h2>
                </span>
                <span style={{ opacity: '0.7' }} className="">
                  {userInfo?._id === params.userId ? (
                    <h6> {userInfo?.friends?.length} Friends</h6>
                  ) : (
                    <h6> {friendsList?.friends?.length} Friends</h6>
                  )}
                </span>
                <div
                  className="d-flex   align-items-center gap-2"
                  style={{ width: '100%' }}
                >
                  <div className="d-none d-lg-flex">friends pictures</div>
                  {userInfo?._id === params.userId ? (
                    <div className="d-flex align-items-center profileStorybutton gap-3 ">
                      <Button>+ Add Story</Button>
                      <Button
                        variant="light"
                        style={{
                          backgroundColor: 'rgba(128, 118, 128, 0.5)',
                          color: 'black',
                        }}
                        onClick={() => handleSelections('About')}
                      >
                        Edit Profile
                      </Button>
                      <Button variant="light">
                        <i
                          className="fa fa-caret-down fw-bold"
                          aria-hidden="true"
                        ></i>
                      </Button>
                    </div>
                  ) : (
                    <div className="d-flex align-items-center gap-3 profileStorybutton">
                      <div
                        onClick={() => addFriends(userInfo?._id, user?._id)}
                        variant="lighter"
                        className="d-flex"
                      >
                        {userInfo?.friends?.find(
                          (userId) => userId === user?._id
                        ) ? (
                          <Button
                            variant="light"
                            style={{
                              backgroundColor: 'rgba(128, 118, 128, 0.5)',
                              color: 'black',
                              fontWeight: 'bold',
                              opacity: '0.8',
                            }}
                            className="buttonWidth"
                          >
                            Friends
                          </Button>
                        ) : (
                          <Button
                            style={{
                              fontWeight: 'bold',
                            }}
                            className="buttonWidth"
                          >
                            Add Friends
                          </Button>
                        )}
                      </div>

                      <Button
                        style={{
                          fontWeight: 'bold',
                        }}
                        className="buttonWidth"
                        onClick={() =>
                          handleConversation(userInfo?._id, user._id)
                        }
                      >
                        Message
                      </Button>
                      <Button variant="light">
                        <i
                          className="fa fa-caret-down fw-bold"
                          aria-hidden="true"
                        ></i>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div
            className="d-none d-md-flex mb-4 justify-content-between align-items-center "
            style={{ opacity: '0.6', width: '70vw', margin: 'auto' }}
          >
            <div
              className="d-flex align-items-center justify-content-between"
              style={{ width: '80%' }}
            >
              <Button
                onClick={() => handleSelections('Post')}
                className={
                  selectedSection === 'Post' ? 'activee fw-bold' : 'fw-bold'
                }
                variant="light"
              >
                Post
              </Button>
              <Button
                className={
                  selectedSection === 'About' ? 'activee fw-bold' : 'fw-bold'
                }
                variant="light"
                onClick={() => handleSelections('About')}
              >
                About
              </Button>
              <Button
                onClick={() => handleSelections('Friends')}
                className={
                  selectedSection === 'Friends' ? 'activee fw-bold' : 'fw-bold'
                }
                variant="light"
              >
                Friends
              </Button>
              <Button
                className={
                  selectedSection === 'Photos' ? 'activee fw-bold' : 'fw-bold'
                }
                variant="light"
                onClick={() => handleSelections('Photos')}
              >
                Photos
              </Button>
              <Button
                className={
                  selectedSection === 'Videos' ? 'activee fw-bold' : 'fw-bold'
                }
                variant="light"
                onClick={() => handleSelections('Videos')}
              >
                Videos
              </Button>
              <Button
                className={
                  selectedSection === 'Event' ? 'activee fw-bold' : 'fw-bold'
                }
                variant="light"
                onClick={() => handleSelections('Event')}
              >
                Event
              </Button>
              <Button className="fw-bold " variant="light">
                More
              </Button>
            </div>
            <div style={{ opacity: '0.4', color: 'black' }}>
              <Button className="fw-bold " variant="secondary">
                <i
                  className="fa fa-ellipsis-h"
                  aria-hidden="true"
                  style={{ color: 'black' }}
                ></i>
              </Button>
            </div>
          </div>
        </div>

        <Container
          style={{
            marginTop: '1rem',
          }}
        >
          <div
            className=""
            style={{
              width: '100%',
              overflow: 'hidden',
              margin: 'auto',
            }}
          >
            <div>
              {selectedSection === 'Friends' && <Friends friends={friends} />}
            </div>
            <div>
              {selectedSection === 'Photos' && <UserPhotos feed={feed} />}
            </div>
            <div>{selectedSection === 'Videos' && <UserVideo />}</div>
            <div>{selectedSection === 'Event' && <UserEvent />}</div>
            <div>{selectedSection === 'About' && <About user={user} />}</div>
            <div style={{ maxWidth: '100%' }}>
              {selectedSection === 'Post' && (
                <UserPosts
                  currentVideo={currentVideo}
                  user={user}
                  friends={friends}
                  handleSelections={handleSelections}
                />
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default UserAndDetails;
