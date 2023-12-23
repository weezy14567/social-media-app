import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function SponsoredPost() {
  const { userInfo } = useSelector((state) => state.user);
  const [feeds, setFeeds] = useState([]);

  useEffect(() => {
    const FetchFeeds = async () => {
      const { data } = await axios.get(
        `http://localhost:4000/api/photos/feeds`
      );
      setFeeds(data);
    };
    FetchFeeds();
  }, []);

  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/users/friends/${userInfo?._id}`
        );

        setFriends(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFriends();
  }, [userInfo?._id]);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center align-items-center">
      {feeds?.map((photo) => (
        <div style={{ width: '90%' }}  key={photo?.feed?._id}>
          {photo?.feed?.type === 'photo' ? (
            <Card style={{ width: '100%' }}>
              <span className="m-2">Sponsored post</span>
              <img
                src={`http://localhost:4000/${photo?.feed?.imgUrl}`}
                alt={''}
              />
              <Card.Body>
                <Link>
                  <h4 className="text-capitalize text-dark text-center">
                    {photo?.feed?.photoDesc}
                  </h4>
                  <strong className="text-center">
                    olamide new album currently streemimg millions
                  </strong>
                </Link>
              </Card.Body>
            </Card>
          ) : (
            ''
          )}
        </div>
      ))}
      <ListGroup
        variant="flush"
        className="my-4 "
        style={{ width: '90%', opacity: '' }}
      >
        <ListGroup.Item className="d-flex flex-column gap-3">
          <strong className="text-center mt-2 border-bottom">Online</strong>
          {friends?.slice(0, 10).map((friend) => (
            <Link
              to={`user/${friend?._id}`}
              key={friend?._id}
              className="text-decoration-none naHover"
            >
              <div className=" d-flex  gap-2 align-items-center">
                <span className=" user-image ">
                  <img
                    src={`http://localhost:4000/${friend?.imgUrl}`}
                    alt={friend?.name}
                    style={{ width: '50px', opacity: '0.6' }}
                  />
                </span>
                <div className="text-black">
                  <strong
                    className="text-capitalize"
                    style={{ opacity: '0.6' }}
                  >
                    {friend?.name}
                  </strong>
                </div>
              </div>
            </Link>
          ))}
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}

export default SponsoredPost;
