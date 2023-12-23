import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import { Link } from 'react-router-dom';


function ReplyBox(props) {
  const { userInfo } = useSelector((state) => state.user);
  const [data, setData] = useState({});
  const [placeholder, setPlaceholder] = useState('');


  const maxDescLength = 150;
  const { commenterId, commentId,  setCurrentComment, setReplyCommentOpen } = props;
  const [desc, setDesc] = useState( data.name || '');

  
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
        `http://localhost:4000/api/comments/commentreply/${commentId}/${commenterId}/${userInfo._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      setDesc('');
      setCurrentComment('')
      setReplyCommentOpen(false)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const replyingUser = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/users/singleuser/${commenterId}`
        );
        setData(data);
        setPlaceholder(data)
      } catch (error) {
        console.log(error);
      }
    };
    replyingUser();
  }, [commenterId]);

  const handleCancelReply =()=>{
    setCurrentComment('')

  }

  return (
    <Form onSubmit={handleComment}>
      <InputGroup style={{ position: 'relative' }}>
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
          style={{ resize: 'none' }}
          className="comentInputBorder"
          value={desc}
          as="textarea"
          type="text"
          placeholder={`@${placeholder?.name}`}
          onChange={handleTextareaChange}
        />
        <Button
          style={{ position: 'absolute', zIndex: '99', bottom: 5, right: 5 }}
          variant="light"
          className="text-bottom text-black"
          type="submit"
          disabled={!desc || !desc.trim()}
        >
          <SendIcon style={{ width: '20px', height: '20px' }} />
        </Button>
      </InputGroup>
      <div className='mt-2'>
      replying <Link className='px-3' style={{backgroundColor:"orange", color:"black",  position:"relative"}}>{`@${placeholder?.name}`}<strong onClick={handleCancelReply} style={{position:"absolute", top:-10, right:0, color:"red"}}>X</strong></Link>
      </div>
    </Form>
  );
}

export default ReplyBox;
