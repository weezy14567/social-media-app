import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

import Post from './Post';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function AddPost() {
  const { userInfo } = useSelector((state)=> state.user)
  const navigate = useNavigate()
  useEffect(()=>{
    if(userInfo === null || !userInfo._id){
      navigate('/signin')
    }
  },[userInfo, navigate])

  const [handlePost, setHandlePost] = useState(false);

  return (
    <div className="  d-flex flex-column align-items-center  justify-content-center addPostBg">
      <Card
        style={{
          width: '100%',
        }}
        className="addPostBg"
      >
        <Card.Body>
          <Form>
            <div className=" px-3 d-flex py-2 gap-2 align-items-center">
              <span className=" " style={{ width:"70px", height:"60px", }}>
                <img
                  src={`http://localhost:4000/${userInfo?.imgUrl}`}
                  alt={userInfo?.name}
                 style={{width: "100%", objectFit:"cover", height:"100%", borderRadius:"50%"}}
                />
              </span>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="write whats on your mind !"
                className="my-textarea"
                onClick={() => setHandlePost(true)}
                readOnly
              />
            </div>
          </Form>
        </Card.Body>
      </Card>
      {handlePost && <Post setHandlePost={setHandlePost} />}
    </div>
  );
}

export default AddPost;
