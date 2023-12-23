import axios from 'axios';
import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/esm/Button';
import { format } from 'timeago.js';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { useDispatch, useSelector } from 'react-redux';
import {
  singleVideolike,
  singlefetchFail,
  singlefetchStart,
  singlefetchSuccess,
} from '../redux/singleVideoSlice';
import { postLike } from '../redux/userSlice';

function SingleDisplay() {
  const { userInfo } = useSelector((state) => state.user);
  const { singleVideo: video } = useSelector((state) => state.singleVideo);
  const ctxDispatch = useDispatch();

  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();

  useEffect(() => {
    ctxDispatch(singlefetchStart());
    try {
      const fetchData = async () => {
        const { data } = await axios.get(
          `http://localhost:4000/api/photos/single/${id}`
        );
        ctxDispatch(singlefetchSuccess(data));
      };
      fetchData();
    } catch (error) {
      ctxDispatch(singlefetchFail());
    }
  }, [id, ctxDispatch]);

  const handleLike = async (id, postId) => {
    try {
      await axios.put(`http://localhost:4000/api/videos/${id}/${postId}`);
      ctxDispatch(postLike(postId));
      ctxDispatch(singleVideolike(id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="singleImageComponent" style={{ marginTop: '' }}>
      <Row className="containers ">
        <Col
          md={8}
          style={{
            backgroundColor: 'black',
            position: 'static',
            height: '100vh',
            overflow: 'hidden',
          }}
        >
          <div
            className="d-flex justify-content-between align-items-center p-4 fs-5 singlePictureIcons"
            style={{
              width: '100%',
              height: '100vh',
              position: 'relative',
            }}
          >
            <div
              className="d-flex align-items-center px-3 fs-5 justify-content-between "
              style={{
                position: 'absolute',
                top: 0,
                left: 10,
                width: '100%',
                height: '50px',
              }}
            >
              {' '}
              <strong
                style={{ cursor: 'pointer' }}
                onClick={() => navigate('/')}
              >
                x
              </strong>
              <div className="d-flex align-items-center gap-3">
                <i className="fa fa-search-plus" aria-hidden="true"></i>
                <i className="fa fa-search-minus" aria-hidden="true"></i>
                <i className="fa fa-tag" aria-hidden="true"></i>
                <i className="fa fa-arrows-alt" aria-hidden="true"></i>
              </div>
            </div>
            <div
              className="singlePictureImgDiv d-flex flex-column justify-content-center"
              style={{ maxHeight: '100vh', width: '100%', position: 'static' }}
            >
              <img
                src={`http://localhost:4000/${video?.video?.imgUrl}`}
                alt={''}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                }}
              />
            </div>
          </div>
          <div className="singlePictureImgNextIcons " style={{}}>
            <div>
              <Button variant="light ">
                <i class="fa fa-chevron-left" aria-hidden="true"></i>
              </Button>
            </div>

            <div>
              <Button variant="light">
                <i class="fa fa-chevron-right" aria-hidden="true"></i>
              </Button>
            </div>
          </div>
        </Col>

        <Col
          md={4}
          style={{
            height: '100vh',
            overflow: 'scroll',
            backgroundColor: 'white',
          }}
        >
          <div style={{ width: '90%', margin: 'auto' }} className="mb-5">
            <div className="mt-4 ">
              <Link
                to={`/user/${video?.userId}`}
                style={{ textDecoration: 'none', color: 'black' }}
              >
                <div className=" d-flex py-2 gap-2 align-items-center">
                  <span className="user-image">
                    <img
                      src={`http://localhost:4000/${video?.userImg}`}
                      alt={video?.name}
                    />
                  </span>
                  <span className="d-flex flex-column">
                    <strong className="text-decoration-none text-capitalize">
                      {video?.name}
                    </strong>
                    <strong style={{ fontSize: '12px', opacity: '0.4' }}>
                      {format(video?.video?.createdAt)}
                    </strong>
                  </span>
                </div>
              </Link>
            </div>
            <div>
              <div className="my-2 desc">{video?.video?.title}</div>
              {userInfo?._id === video?.userId && (
                <Button
                  variant="secondary text-black mb-3"
                  style={{ opacity: '0.8' }}
                >
                  <strong className="text-white">Edit</strong>
                </Button>
              )}
            </div>
            <div className="d-flex pb-2 gap-2 align-items-center border-bottom">
              {video?.video?.like?.length >= 1 && (
                <span>
                  {' '}
                  <i
                    className="fa fa-thumbs-up p-1"
                    aria-hidden="true"
                    style={{
                      color: 'white',
                      borderRadius: '50%',
                      backgroundColor: 'blue',
                    }}
                  ></i>
                  <i
                    class="fa fa-heart bg-danger p-1"
                    aria-hidden="true"
                    style={{ color: 'white', borderRadius: '50%' }}
                  ></i>
                </span>
              )}

              <span>
                {video?.video?.like?.length === 0
                  ? null
                  : video?.video?.like?.includes(userInfo?._id)
                  ? video?.video?.like?.length === 1
                    ? 'You like this post'
                    : `You and ${
                        video?.video?.like?.length - 1
                      } others like this`
                  : video?.video?.like?.length === 1
                  ? `${video?.video?.like?.length} like`
                  : `${video?.video?.like?.length} likes`}
              </span>
            </div>
            <div className="border-bottom">
              <div
                className="d-flex align-items-center justify-content-between p-3 align-items-center"
                style={{ width: '90%', margin: 'auto' }}
              >
                <Button
                  onClick={() => handleLike(userInfo?._id, video?.video?._id)}
                  variant="light"
                >
                  {video?.video?.like?.includes(userInfo?._id) ? (
                    <ThumbUpAltIcon className="iconBlue" />
                  ) : (
                    <ThumbUpOffAltIcon />
                  )}
                </Button>

                <span className="d-flex align-items-center gap-1">
                  {' '}
                  <i className="fa fa-comment fs-5" aria-hidden="true">
                    {''}
                  </i>
                  <span className="d-none d-lg-flex">comment</span>
                </span>

                <span className="d-flex align-items-center gap-1">
                  <i className="fa fa-share fs-5" aria-hidden="true">
                    {' '}
                  </i>{' '}
                  <span className="d-none d-lg-flex">share</span>
                </span>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default SingleDisplay;
