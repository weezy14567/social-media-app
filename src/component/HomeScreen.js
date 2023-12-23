import React, { useEffect, useState } from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Videos from './Videos';

import NavHead from './NavHead';
import AddPost from './AddPost';
import SponsoredPost from '../sponsored/SponsoredPost';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchStart, fetchvideoSuccess } from '../redux/videoSlice';
import axios from 'axios';

function HomeScreen(props) {
  const { userInfo } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { commentOpen, setCommentOpen, socket } = props;
  const { currentVideo } = useSelector((state) => state.video);
  const [homeData, setHomeData] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo === null || !userInfo?._id) {
      navigate('/signin');
    }
  }, [userInfo, navigate]);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname !== `/users/${userInfo?._id}`) {
      localStorage.removeItem('selectedSection');
    }
  });

  useEffect(() => {
    const handleCommentsAndHomeVideo = async () => {
      try {
        const videosWithComments = [];
        for (const video of homeData) {
          const { data } = await axios.get(
            `http://localhost:4000/api/comments/postcomments/${video.feed._id}`
          );

          const comment = data.filter(
            (comment) => comment.comment.postId === video.feed._id
          );

          const videoAndComment = {
            video: video,
            comments: comment,
          };
          videosWithComments.push(videoAndComment);

        }
        dispatch(fetchvideoSuccess(videosWithComments));
      } catch (error) {
        console.log(error);
      }
    };
    handleCommentsAndHomeVideo();
  }, [homeData, dispatch]);

  useEffect(() => {
    dispatch(fetchStart());

    const FetchVideos = async () => {
      if (userInfo?._id) {
        try {
          const { data } = await axios.get(
            `http://localhost:4000/api/photos/feeds`
          );

          setHomeData(data);
          
        } catch (error) {
          console.log(error);
        }
      }
    };
    FetchVideos();
  }, [dispatch, userInfo?._id]);


  return (
    <Row className=" containers my-3" >
      <Col md={3} className="navbars d-none d-md-block">
        <NavHead />
      </Col>
      <Col md={6} className="main-page" >
        <div  className="feed-Wrapper d-flex flex-column gap-2 ">
          <AddPost />
          <Videos
            commentOpen={commentOpen}
            setCommentOpen={setCommentOpen}
            currentVideo={currentVideo}
            socket={socket}
          />
        </div>
      </Col>
      <Col md={3} className="online-page d-none d-md-block">
        <SponsoredPost />
      </Col>
    </Row>
  );
}

export default HomeScreen;
