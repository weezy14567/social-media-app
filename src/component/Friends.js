import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/esm/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Friends(props) {
  const { friends } = props;
  const {friendsList} = useSelector((state)=>state.friends)
  return (
    <Card>
      <div className="p-3 d-flex justify-content-between align-items-center">
        <div>
          <strong className="fs-5">Friends</strong>
        </div>
        <div className="d-flex align-items-center gap-4">
          {' '}
          <InputGroup className="outline-none" style={{ maxWidth: '200px' }}>
            <Form.Control type="text" placeholder="Search friends" />
          </InputGroup>
          <Button variant="light " className="fw-bold d-none d-md-flex ">
            Friend request
          </Button>
          <Button variant="light" className="fw-bold d-none d-md-flex ">
            Find Friends
          </Button>
        </div>
      </div>
      <Card.Body>
        {friends?.length === 0 ? (
          <h3  className='text-center' style={{opacity:"0.4"}}>No friends to show</h3>
        ) : (
          <div>
            <div className="d-flex justify-content-between gap-3   flex-wrap align-item-center mobilefriends1 ">
              {friends?.map((friend) => (
                
                <Card style={{ width: '47%' }} className="mb-2 p-2 " border="light"  key={friend._id}>
                  <Link to={`/user/${friend._id}`} className='text-decoration-none text-black'>
                  <div
                    className="d-flex gap-3 align-items-center"
                   
                  >
                    <span>
                      <img
                        src={`http://localhost:4000/${friend.imgUrl}`}
                        alt={friend.name}
                        style={{
                          width: '120px',
                          height: '90px',
                          borderRadius: '10px',
                          objectFit: 'cover',

                        }}
                        className='mobileFriends'
                      />
                    </span>
                    <span
                      className="text-capitalize d-flex flex-column gap-1"
                      style={{ opacity: 0.6 }}
                    >
                      <strong>{friend.name}</strong>
                      <span>{friend.country ? friend.country : ''}</span>
                    </span>
                  </div>

                  <div></div>
                  </Link>
                </Card>
              
              ))}
            </div>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export default Friends;
