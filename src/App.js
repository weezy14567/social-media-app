import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Post from './component/Post';
import Container from 'react-bootstrap/Container';
import Badge from 'react-bootstrap/Badge';
import Signin from './component/Singin';
import { useEffect, useRef, useState } from 'react';

import UserAndDetails from './component/UserAndDetails';
import Photo from './component/Photo';
import Users from './component/Users';

import HomeScreen from './component/HomeScreen';
import SingleDisplay from './component/SingleDisplay';
import SignUp from './component/SignUp';
import Nav from 'react-bootstrap/Nav';

import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/esm/Button';
import Friends from './component/Friends';

import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';
import Notification from './pages/Notification';
import {
  fetchnotificationSuccess,
  markAllNotificationsAsViewed,
} from './redux/notificationSlice';
import Message from './pages/messages/Message';
import { io } from 'socket.io-client';
import { LinkContainer } from 'react-router-bootstrap';

function App() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const [notifyOpen, setNotifyOpen] = useState(false);
  const { notification } = useSelector((state) => state.notify);
  const socket = useRef();
  const [likeNotice, setLikeNotice] = useState([]);
  const [friendNotice, setFriendNotice] = useState([]);

  const logoutHandler = () => {
    localStorage.clear();
    window.location.reload();
  };

  useEffect(() => {
    const userNotifications = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/notifications/users/${userInfo?._id}`
        );
        setLikeNotice(data);
      } catch (error) {
        console.log(error);
      }
    };
    userNotifications();
  }, [userInfo?._id, dispatch]);

  useEffect(() => {
    const userFriendRequest = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/notifications/getfriendrequest/${userInfo?._id}`
        );
        setFriendNotice(data);
      } catch (error) {
        console.log(error);
      }
    };
    userFriendRequest();
  }, [userInfo?._id]);

  useEffect(() => {
    const combineData = [...likeNotice, ...friendNotice].sort(
      (a, b) =>
        new Date(b.notification.createdAt) - new Date(a.notification.createdAt)
    );

    dispatch(fetchnotificationSuccess(combineData));
  }, [friendNotice, likeNotice, dispatch]);

  const handleViewNotifications = async (id) => {
    try {
      await axios.put(
        `http://localhost:4000/api/notifications/viewdnotifications/${id}`
      );
      setNotifyOpen(!notifyOpen);
      dispatch(markAllNotificationsAsViewed(id));
    } catch (error) {
      console.error(error);
    }
  };

  const unviewedNotifications = notification?.filter(
    (notification) =>
      !notification?.notification?.isViewed.includes(userInfo?._id)
  );

  useEffect(() => {
    socket.current = io('ws://localhost:8900');
    socket.current.emit('addUser', userInfo?._id);
  }, [userInfo]);

  useEffect(() => {
    socket.current.on('getUsers', (users) => {});
  }, []);

  useEffect(() => {
    socket.current.on('friendRequests', (data) => {
      dispatch(fetchnotificationSuccess([...notification, data]));
    });
  }, [socket, dispatch, notification]);

  return (
    <BrowserRouter>
      <div className={'d-flex flex-column site-container'}>
       

        <header className="headerBG " style={{ position: 'absolute', top: 0 }}>
          <div expand="lg">
            <Container>
              <div className="d-flex align-items-center gap-4">
                {' '}
                <div className="imagediv">
                  {userInfo?._id ? (
                    <Link to="/" className="text-decoration-none">
                      <span className="d-none d-md-flex navColor">
                        SapaConnect
                      </span>
                      <span
                        className="mx-1 d-inline d-md-none navColor "
                        style={{ fontSize: '3rem' }}
                      >
                        &
                      </span>
                    </Link>
                  ) : (
                    <Link to="/signin" className="text-decoration-none">
                      <span className="d-none d-md-flex navColor">
                        SapaConnect
                      </span>
                      <span
                        className="mx-1 d-inline d-md-none navColor "
                        style={{ fontSize: '3rem' }}
                      >
                        &
                      </span>
                    </Link>
                  )}
                </div>
                <Nav className="ms-auto">
                  {userInfo?._id && (
                    <div className="header-icons d-flex gap-5 align-items-center ">
                      <Link
                        to="/messages"
                        className="text-white text-decoration-none"
                      >
                        <div className="">
                          <i
                            className="fa fa-comment fs-2 icons-position"
                            aria-hidden="true"
                          >
                            <Badge className="icons-count" pill bg="danger">
                           
                            </Badge>
                          </i>
                        </div>
                      </Link>
                      <div
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleViewNotifications(userInfo?._id)}
                      >
                        <i
                          className="fa fa-bell fs-3 icons-position"
                          aria-hidden="true"
                        >
                          {' '}
                          {unviewedNotifications?.length > 0 && (
                            <Badge className="icons-count" pill bg="danger">
                              {unviewedNotifications?.length}
                            </Badge>
                          )}
                        </i>
                      </div>
                      <div style={{ marginRight: '10px' }}>
                        {' '}
                        <i className="fa fa-search" aria-hidden="true"></i>
                      </div>
                    </div>
                  )}
                  <NavDropdown
                    title={
                      userInfo?._id && userInfo?._id ? (
                        <Link>
                          <div
                            className={
                              userInfo?.imgUrl
                                ? 'user-image'
                                : 'user-image userBg'
                            }
                            style={{ position: 'relative' }}
                          >
                            <img
                              src={`http://localhost:4000/${userInfo?.imgUrl} `}
                              alt=""
                            />
                            <span
                              style={{
                                position: 'absolute',
                                left: '30%',
                                top: '40%',
                                fontSize: '1.2rem',
                                fontWeight: 'bolder',
                                color: 'black',
                                opacity: '0.7',
                              }}
                            >
                              <i
                                className="fa fa-chevron-down"
                                aria-hidden="true"
                              ></i>
                            </span>
                          </div>
                        </Link>
                      ) : (
                        <Link className="text-white" to="/signin">
                          <h4>sign in</h4>
                        </Link>
                      )
                    }
                    id="basic-nav-dropdown"
                  >
                    {userInfo?._id && (
                      <>
                        <NavDropdown.Item>
                          <Link to={`/user/${userInfo?._id}`}>
                            <div
                              className={
                                userInfo?.imgUrl
                                  ? 'user-image'
                                  : 'user-image userBg'
                              }
                              style={{ position: 'relative' }}
                            >
                              <img
                                src={`http://localhost:4000/${userInfo?.imgUrl} `}
                                alt=""
                              />
                              <Button
                                variant="lighter"
                                className="text-capitalize fw-bold"
                              >
                                {userInfo?.name}
                              </Button>
                            </div>
                          </Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                          <Button variant="light" className="fw-bold">
                            settings & privacy
                          </Button>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                          <Button variant="light" className="fw-bold">
                            help & support
                          </Button>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                          <Button variant="light" className="fw-bold">
                            display & accessibility
                          </Button>
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item>
                          <Button variant="light" className="fw-bold">
                            <Link
                              className="mx-5"
                              to="/signin"
                              onClick={logoutHandler}
                            >
                              sign out
                            </Link>
                          </Button>
                        </NavDropdown.Item>
                      </>
                    )}
                  </NavDropdown>
                </Nav>
              </div>
            </Container>
          </div>
          {notifyOpen && (
            <div
              className="text-black text-center"
              style={{ position: 'absolute', right: 0 }}
            >
              {' '}
              <Notification setNotifyOpen={setNotifyOpen} />
            </div>
          )}
        </header>

        <main>
          <Routes>
            <Route path="/" element={<HomeScreen socket={socket} />} />
            <Route path="/post" element={<Post />} />
            <Route path="/photos" element={<Photo />} />
            <Route path="/users" element={<Users />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/messages" element={<Message socket={socket} />} />

            <Route path="/video/:id" element={<SingleDisplay />} />
            <Route
              path="/user/:userId"
              element={<UserAndDetails socket={socket} />}
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
