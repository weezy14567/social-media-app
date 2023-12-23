import React, { useRef, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import PublicIcon from '@mui/icons-material/Public';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Post(props) {
  const { setHandlePost } = props;

  const { userInfo } = useSelector((state) => state.user);

  const [title, setTitle] = useState('');
  const [imgUrl, setImgUrl] = useState(null);
  const navigate = useNavigate()

  const imgRef = useRef(null);

  const formHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('imgUrl', imgUrl);
    try {
    const {data} = await axios.post(`http://localhost:4000/api/videos`, formData, {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      });
      
      if(data?._id){
        navigate(`/video/${data?._id}`)
        setTitle('');
        setHandlePost(false);
      }
     
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="post  d-flex flex-column align-items-center  justify-content-center">
      <Card
        style={{
          backgroundColor: 'white',
          color: 'white',
          border:"1px solid rgb(110, 110, 239)"
        }}
        className="postingBox "
      >
        <span
          onClick={() => setHandlePost(false)}
          className="text-end fs-2  mx-3 pointer"
          style={{ cursor: 'pointer', color:"black" }}
        >
          x
        </span>
        <Card.Body>
          <Card.Title className="text-center text-black border-bottom">
            <h3>Create Post</h3>
          </Card.Title>

          <Form onSubmit={formHandler}>
            <div className=" d-flex py-2 gap-2 align-items-center">
              <span className=" user-image">
                <img
                  src={`http://localhost:4000/${userInfo.imgUrl}`}
                  alt={''}
                />
              </span>
              <Form.Label className="d-flex flex-column">
                <strong className="text-capitalize text-black">{userInfo.name}</strong>
                <span className='text-black d-flex align-items-center gap-1'>public <PublicIcon style={{width:"17px", height:"17px"}}/></span>
              </Form.Label>
            </div>
            <Form.Control
              onChange={(e) => setTitle(e.target.value)}
              as="textarea"
              rows={9}
              placeholder="write whats on your mind"
              className="my-textarea"
            />

            <Form.Label>Add Image files</Form.Label>
            <Form.Control
              onChange={(e) => setImgUrl(e.target.files[0])}
              type="file"
              ref={imgRef}
            />
            <div className="d-grid mt-3">
              <Button type="submit">submit</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Post;
