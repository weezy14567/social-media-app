import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import AddPost from './AddPost';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';

import FormGroup from 'react-bootstrap/esm/FormGroup';
import axios from 'axios';
import { useSelector } from 'react-redux';

import Videos from './Videos';

function UserPosts(props) {
  const { userInfo } = useSelector((state) => state.user);

  const params = useParams();
  const { userId } = params;

  const { user, friends, currentVideo, handleSelections } = props;

  const [clickkedLink, setClickedLink] = useState(false);
  const [bio, setBio] = useState(user?.bio ? user?.bio : '');
  const [updateUser, setUpdateUser] = useState('');

  const handleButtonClick = (link) => {
    setClickedLink(link);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/users/${userId}`,
        {
          bio: bio,
        }
      );
      setUpdateUser(data);
      setClickedLink(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Row>
        <Col>
          <Card className="mb-3 ">
            <Card.Body>
              <Form>
                <strong>Intro</strong>

                {userInfo?._id === user?._id ? (
                  <div>
                    <div className="d-grid mb-3">
                      <Button
                        variant="light"
                        onClick={() => handleButtonClick('bio')}
                      >
                        <h6>{user?.bio ? 'Edit bio' : 'Add bio'}</h6>
                      </Button>
                    </div>
                    <div
                      className={
                        clickkedLink === 'bio' ? 'd-none' : 'd-flex flex-column'
                      }
                    >
                      {user?.bio ? (
                        <span className="mb-3" style={{ fontSize: '16px' }}>
                          {' '}
                          {user?.bio}
                        </span>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                ) : (
                  <div>
                    {user?.bio ? (
                      <span className="my-3" style={{ fontSize: '16px' }}>
                        {' '}
                        {user?.bio}
                      </span>
                    ) : (
                      ''
                    )}
                  </div>
                )}

                {clickkedLink && (
                  <Form>
                    <FormGroup>
                      <Form.Control
                        style={{ resize: 'none' }}
                        as="textarea"
                        rows={2}
                        maxLength={100}
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                      />
                    </FormGroup>
                    <div className="d-flex align-items-center justify-content-between my-3 w-50 m-auto">
                      <Button className="" onClick={handleUpdateUser}>
                        Save
                      </Button>
                      <Button
                        variant="light"
                        onClick={() => setClickedLink(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </Form>
                )}

                <div className="d-flex flex-column">
                  <Button
                    variant="lighter"
                    className=""
                    style={{ color: 'black', opacity: '0.6' }}
                  >
                    <h6 className="d-flex fw-bold align-items-center gap-3">
                      <i class="fa fa-map-marker" aria-hidden="true"></i>
                      From{' '}
                      <Link
                        className="text-decoration none text-capitalize "
                        style={{ color: 'black' }}
                      >
                        {user?.country ? user?.country : 'null'}
                      </Link>
                    </h6>
                  </Button>
                  <Button
                    variant="lighter"
                    className=""
                    style={{ color: 'black', opacity: '0.6' }}
                  >
                    <h6 className="d-flex fw-bold align-items-center gap-3">
                      <i class="fa fa-map-marker" aria-hidden="true"></i>
                      Lives in{' '}
                      <Link
                        className="text-decoration none text-capitalize"
                        style={{ color: 'black' }}
                      >
                        {user?.city ? user?.city : 'null'}
                      </Link>
                    </h6>
                  </Button>
                </div>
                {userInfo?._id === user?._id && (
                  <div className="d-grid mb-3">
                    <Button variant="light">
                      <h6>Edit details </h6>
                    </Button>
                  </div>
                )}

                <div className="hobbies d-flex align-items-center gap-4 my-3">
                  <Button
                    variant="light"
                    style={{
                      border: '1px solid grey',
                      borderRadius: '20px',
                    }}
                    className="hobbiesButton fw-bold d-flex flex-column align-items-center "
                  >
                    <h6>Soccer</h6>
                  </Button>
                </div>
                {userInfo?._id === user?._id && (
                  <div className="d-grid mb-3">
                    <Button variant="light">
                      <h6>Edit hobbies </h6>
                    </Button>
                  </div>
                )}

                <div className="d-flex align-items-center gap-4">
                  <Card className="statusImgDiv">
                    <img
                      src="https://images.unsplash.com/flagged/photo-1555251255-e9a095d6eb9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGFmcmljYW4lMjBib3l8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
                      alt={''}
                    />
                  </Card>
                  <Card className="statusImgDiv">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnKZy_MZInB5oirYnrA5xI6jXGdFIXC_NzuA&usqp=CAU"
                      alt={''}
                    />
                  </Card>
                </div>
                {userInfo?._id === user?._id && (
                  <div className="d-grid mt-3">
                    <Button variant="light">
                      <h6>Edit features </h6>
                    </Button>
                  </div>
                )}
              </Form>
            </Card.Body>
          </Card>

          <Card>
            <div style={{ width: '100%', margin: 'auto' }} className="my-3 ">
              <span className="d-flex align-items-center justify-content-between mb-3 mx-2">
                <strong className="fs-5">Photos</strong>
                <Link
                  onClick={() => handleSelections('Photos')}
                  className="text-decoration-none"
                  style={{ fontSize: '18px' }}
                >
                  See all photos
                </Link>
              </span>

              <div
                className=" mx-2"
                style={{
                  display: 'grid',

                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '5px',
                }}
              >
                {currentVideo?.slice(0, 12).map((photo) => (
                  <div key={photo.video.feed?._id}>
                    {photo?.video.feed.type === 'video' ? (
                      <Link to={`/video/${photo?.video.feed?._id}`}>
                        <div className="userImgDiv ">
                          <img
                            src={`http://localhost:4000/${photo?.video.feed.imgUrl}`}
                            alt={''}
                            style={{ width: '100%', minHeight: '100%' }}
                          />
                        </div>
                      </Link>
                    ) : (
                      ''
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card className="my-3">
            <div style={{ width: '100%', margin: 'auto' }} className="my-3">
              <span className="d-flex mx-2 align-items-center justify-content-between mb-3">
                <div className="d-flex flex-column">
                  <strong className="fs-5">Friends</strong>
                  <span className="mb-3" style={{ opacity: '0.7' }}>
                    {friends?.length} friends
                  </span>
                </div>

                <Link
                  onClick={() => handleSelections('Friends')}
                  className="text-decoration-none"
                  style={{ fontSize: '18px' }}
                >
                  See all friends
                </Link>
              </span>

              {friends?.length > 0 ? (
                <div
                  className=" mx-2"
                  style={{
                    display: 'grid',

                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '5px',
                  }}
                >
                  {friends?.slice(0, 4).map((friend) => (
                    <div key={friend?._id} style={{}}>
                      <Link
                        to={`/user/${friend?._id}`}
                        className="text-decoration-none text-black"
                      >
                        <div className="  userImgDiv">
                          <img
                            src={`http://localhost:4000/${friend?.imgUrl}`}
                            alt={friend?.name}
                            style={{ width: '100%', minHeight: '100%' }}
                          />
                        </div>
                        <div>
                          <strong
                            style={{
                              opacity: '0.5',
                              fontSize: '13px',
                              textTransform: 'capitalize',
                            }}
                          >
                            {friend?.name.length > 8
                              ? `${friend?.name.slice(0, 8)}...`
                              : `${friend?.name}`}
                          </strong>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <h6>No Friends to show</h6>
                </div>
              )}
            </div>
          </Card>
        </Col>

        <Col md={7}>
          {userInfo?._id === user?._id && (
            <div
              style={{
                width: '100%',
                alignItems: 'center',
              }}
              className="mb-3 "
            >
              <AddPost />
            </div>
          )}

          {currentVideo?.length > 0 ? (
            <div>
              <Videos currentVideo={currentVideo} />
            </div>
          ) : (
            <div
              style={{
                width: '100%',
                height: '50vh',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                opacity: 0.6,
              }}
            >
              <h3 className="text-center" style={{ opacity: '0.4' }}>
                No Posts to show
              </h3>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default UserPosts;
