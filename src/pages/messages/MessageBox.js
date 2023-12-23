import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';


import Button from 'react-bootstrap/Button';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';

function MessageBox(props) {
  const { userInfo } = useSelector((state) => state.user);
  const [desc, setDesc] = useState('');

  const {  conversationId, messages, setMessages, sockets, receiverId} = props;

  const handleTextareaChange = (e) => {
    const inputValue = e.target.value;
    setDesc(inputValue);
  };


  const handleMessage = async (e) => {
    e.preventDefault();
    const formData = {
      desc: desc,
    };

sockets.current.emit("sendMessage", {
  senderId:userInfo._id,
  receiverId:receiverId,
  desc:desc
})
     
    try {
     const {data} = await axios.post(
        `http://localhost:4000/api/messages/send/${conversationId}/${userInfo?._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      
      setDesc('');
     
      setMessages([...messages, { message: data }]);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <Form onSubmit={handleMessage} className='d-flex '>
      <InputGroup style={{ position: 'relative' }}>
      
        <Form.Control
          style={{ resize: 'none' }}
          className="comentInputBorder"
          value={desc}
          
          as="textarea"
          type="text"
          placeholder="Type Your Message"
          onChange={handleTextareaChange}
        />
        
      </InputGroup>
      <Button
          style={{}}
          variant="light"
          className="text-bottom text-black"
          type="submit"
          disabled={!desc.trim()}
        >
          <SendIcon style={{ width: '40px', height: '40px' }} className='text-primary' />
        </Button>
    </Form>
  );
}

export default MessageBox;
