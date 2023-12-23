import React, { useState } from 'react';
import {  useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';


function CommentBox(props) {
  const { userInfo } = useSelector((state) => state.user);
  const [desc, setDesc] = useState('');

  const maxDescLength = 150; 
  const { postId, socket, userId } = props;


  const handleTextareaChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= maxDescLength) {
      setDesc(inputValue);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    const formData = {
      desc: desc,
    };
    
    try {
       await axios.post(
        `http://localhost:4000/api/comments/${postId}/${userInfo?._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      setDesc('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form onSubmit={handleComment} >
      <InputGroup style={{ position: 'relative', }}>
        <InputGroup.Text>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '1px solid black',
            }}
          >
            <img
              src={`http://localhost:4000/${userInfo.imgUrl}`}
              alt=""
              style={{
                width: '40px',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '50%',
              }}
            />
          </div>
        </InputGroup.Text>
        <Form.Control
          style={{ resize: 'none',  }}
          className='comentInputBorder'
          value={desc}
          as="textarea"
          type="text"
          placeholder="Write a comment"
          onChange={handleTextareaChange}
          
        />
        <Button
          style={{ position: 'absolute', zIndex: '99', bottom: 5, right: 5 }}
          variant="light"
          className="text-bottom text-black"
          type="submit"
          disabled={!desc.trim()}
        >
          <SendIcon style={{ width: '20px', height: '20px' }} />
        </Button>
      </InputGroup>
    </Form>
  );
}

export default CommentBox;
