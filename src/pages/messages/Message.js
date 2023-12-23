import React, { useEffect, useRef, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Conversation from './Conversation';
import { setConversationId } from '../../redux/receiverSlice';
import VideocamIcon from '@mui/icons-material/Videocam';
import CallIcon from '@mui/icons-material/Call';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';

function Message(props) {
  const { userInfo } = useSelector((state) => state.user);

  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();
  const { conversationId } = useSelector((state) => state.receiver);
  const scrollRef = useRef();
  const [arivalMessage, setArivalMessage] = useState(null);
  const { socket } = props;
  const [desc, setDesc] = useState('');
  const [user, setUser] = useState('');
  const [mobileMessages, setMobileMessages] = useState(false);
  const [conversation, setConversations]=useState([])



  useEffect(() => {
    socket?.current?.on('getMessage', (data) => {
      setArivalMessage({
        senderId: data.senderId,
        desc: data.desc,
      });
    });
  }, [socket]);



  const handleTextareaChange = (e) => {
    const inputValue = e.target.value;
    setDesc(inputValue);
  };

  const handleMessage = async (e) => {
    e.preventDefault();
    const formData = {
      desc: desc,
    };
    socket?.current?.emit('sendMessage', {
      senderId: userInfo?._id,
      desc: desc,
      receiverId: user?._id,
    });
    try {
      const { data } = await axios.post(
        `http://localhost:4000/api/messages/send/${conversationId?._id}/${userInfo?._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      setDesc('');
      setMessages([...messages, data]);
      
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    if (
      arivalMessage &&
      conversationId?.members?.includes(arivalMessage?.senderId)
    ) {
      setMessages((prev) => [...prev, arivalMessage]);
    }
  }, [arivalMessage, conversationId]);


  useEffect(() => {
    const handleFetchMessages = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/messages/getmessages/${conversationId?._id}/${userInfo?._id}`
        );
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (conversationId?._id) {
      handleFetchMessages();
      setMobileMessages(true)
    }
  }, [conversationId, userInfo?._id]);

  const handleConversationClick = (conversationId) => {
    dispatch(setConversationId(conversationId));
  };



  const friendId = conversationId?.members?.find((id) => id !== userInfo?._id);

  useEffect(() => {
    const handleCurrentChatUser = async () => {
      if (friendId) {
        try {
          const { data } = await axios.get(
            `http://localhost:4000/api/users/singleuser/${friendId}`
          );

          setUser(data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    handleCurrentChatUser();
  }, [friendId]);

 

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: 'smooth' });
    if (conversationId === null) {
      setMobileMessages(false);
    }
  }, [messages, conversationId]);

 

  useEffect(()=>{
     const handleMessagesAndConversations = async()=>{
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/messages/messagesandconversations/${userInfo._id}`
        );
        setConversations(data)
       
      } catch (error) {
        console.log(error)
      }
     }
     handleMessagesAndConversations()
  },[userInfo._id])


  


  

  return (
    <div className="px-3 bg-light">
      <Row className="d-none d-md-flex">
        <Col md={4} style={{ height: '90vh', overflowY: 'scroll' }}>
          <div className="my-3">
            <div className="d-flex align-items-center justify-content-between">
              <h3>Chat</h3>
              <div className="d-flex align-items-center gap-2">
                <Button
                  className="p-2"
                  variant="light"
                  style={{ width: 'fit-content ', borderRadius: '50%' }}
                >
                  <MoreHorizIcon />
                </Button>
                <Button
                  className="p-2"
                  variant="light"
                  style={{ width: 'fit-content', borderRadius: '50%' }}
                >
                  <BorderColorIcon />
                </Button>
              </div>
            </div>
            <Form className="my-2">
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Search Messages"
                  style={{ borderRadius: '30px' }}
                />
              </InputGroup>
            </Form>
            <Button
              style={{ borderRadius: '30px', fontSize: '15px', opacity: '0.9' }}
              variant="lighter"
              className="unread fw-bold"
            >
              Inbox
            </Button>
            <Button
              variant="lighter fw-bold"
              style={{ borderRadius: '30px', fontSize: '15px', opacity: '0.9' }}
            >
              Community
            </Button>
          </div>

          {conversation?.length > 0 ? (
            <div>
              {conversation?.map((conversation) => (
                <div
                  onClick={() => {
                    handleConversationClick(conversation.conversation);
                  }}
                  style={{ cursor: 'pointer', borderRadius: '5px' }}
                  className={
                    conversation?.isNotRead?.length > 0  || conversationId?._id === conversation?.conversation?._id
                      ? 'mb-3 unread1'
                      : 'mb-3'
                  }
                  key={conversation?.conversation?._id}
                >
                  <Conversation
                    userInfo={userInfo}
                    conversation={conversation}
                  />
                </div>
              ))}
            </div>
          ) : (
            <strong
              style={{ height: '30vh', opacity: '0.6' }}
              className="d-flex align-items-center justify-content-center"
            >
              Messaged Users Show Here
            </strong>
          )}
        </Col>
        <Col md={8}>
          {conversationId?._id ? (
            <div>
              <div>
                <div
                  style={{ borderBottom: '1px solid grey' }}
                  className="mt-2 d-flex align-items-center justify-content-between"
                >
                  <Button
                    variant="light"
                    className="unread d-flex align-items-center gap-2"
                  >
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                      }}
                    >
                      <img
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                        }}
                        src={`http://localhost:4000/${user.imgUrl}`}
                        alt={''}
                      />
                    </div>
                    <strong className="text-capitalize">{user.name}</strong>
                  </Button>
                  <div className="d-flex align-items-center gap-3 mx-5">
                    <strong style={{ width: 'fit-content' }} variant="light">
                      <CallIcon className="text-primary" />
                    </strong>
                    <strong style={{ width: 'fit-content' }} variant="light">
                      <VideocamIcon className="text-primary" />
                    </strong>
                    <strong
                      className="p-1"
                      style={{ width: 'fit-content', borderRadius: '50%' }}
                      variant="light"
                    >
                      <ReportGmailerrorredIcon className="text-primary " />
                    </strong>
                  </div>
                </div>
              </div>
              <div
                className="my-3"
                style={{
                  height: '63vh',
                  overflowY: 'scroll',
                  overflowX: 'hidden',
                }}
              >
                <div
                  style={{ width: '100%', height: '200px' }}
                  className="d-flex flex-column justify-content-center align-items-center"
                >
                  <img
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                    }}
                    src={`http://localhost:4000/${user?.imgUrl}`}
                    alt={''}
                  />{' '}
                  <span
                    className="text-center"
                    style={{ fontSize: '13px', opacity: '0.7' }}
                  >
                    {userInfo?.friends.includes(user?._id)
                      ? `You and ${user?.name} are now friends, you can message each
                    other. `
                      : `You and ${user?.name} are not friends yet.`}
                  </span>
                  <span
                    className="text-center"
                    style={{ fontSize: '13px', opacity: '0.7' }}
                  >
                    Only two of you can see your conversation
                  </span>
                </div>
                {messages.map((message, index) => (
                  <div ref={scrollRef} key={index} className="mb-2">
                    <div
                      style={{
                        justifyContent:
                          message?.senderId === userInfo?._id
                            ? 'flex-end'
                            : 'flex-start',
                      }}
                      className="d-flex gap-2"
                    >
                      <div
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                        }}
                      >
                        {message?.senderId !== userInfo?._id && (
                          <img
                            style={{
                              width: '40px',
                              height: '40px',
                              borderRadius: '50%',
                            }}
                            src={`http://localhost:4000/${user?.imgUrl}`}
                            alt={''}
                          />
                        )}
                      </div>
                      <div
                        style={{
                          maxWidth: '60%',
                          wordWrap: 'break-word',
                        }}
                      >
                        <div
                          style={{
                            borderRadius: '10px',
                          }}
                          className={
                            message?.senderId === userInfo?._id
                              ? 'bg-primary text-white p-2'
                              : 'unread p-2'
                          }
                        >
                          {message?.desc}
                        </div>

                        {message.senderId === userInfo?._id &&
                          index === messages?.length - 1 && (
                            <div
                              style={{
                                justifyContent: 'flex-end',
                              }}
                              className="d-flex gap-2 "
                            >
                              {message.isRead === true ? (
                                <span
                                  style={{ opacity: '0.6', fontSize: '14px' }}
                                >
                                  Seen <DoneAllOutlinedIcon />
                                </span>
                              ) : (
                                <span
                                  style={{ opacity: '0.6', fontSize: '14px' }}
                                >
                                  {' '}
                                  Delivered{' '}
                                  <DoneOutlinedIcon
                                    style={{ width: '20px', height: '20px' }}
                                  />
                                </span>
                              )}
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <Form onSubmit={handleMessage} className="d-flex ">
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
                    <SendIcon
                      style={{ width: '40px', height: '40px' }}
                      className="text-primary"
                    />
                  </Button>
                </Form>
              </div>
            </div>
          ) : (
            <div
              style={{ height: '60%', opacity: '0.3' }}
              className="fs-3 d-flex align-items-center justify-content-center text-capitalize fw-bold"
            >
              Open a conversation to show messages
            </div>
          )}
        </Col>
      </Row>

      {/* MOBILE VIEW */}
      <div className="d-md-none">
        <div
          className={mobileMessages ? 'd-none' : ''}
          
        >
          <div className="my-3">
            <div className="d-flex align-items-center justify-content-between">
              <h3>Chat</h3>
              <div className="d-flex align-items-center gap-2">
                <Button
                  className="p-2"
                  variant="light"
                  style={{ width: 'fit-content ', borderRadius: '50%' }}
                >
                  <MoreHorizIcon />
                </Button>
                <Button
                  className="p-2"
                  variant="light"
                  style={{ width: 'fit-content', borderRadius: '50%' }}
                >
                  <BorderColorIcon />
                </Button>
              </div>
            </div>
            <Form className="my-2">
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Search Messages"
                  style={{ borderRadius: '30px' }}
                />
              </InputGroup>
            </Form>
            <Button
              style={{ borderRadius: '30px', fontSize: '15px', opacity: '0.9' }}
              variant="lighter"
              className="unread fw-bold"
            >
              Inbox
            </Button>
            <Button
              variant="lighter fw-bold"
              style={{ borderRadius: '30px', fontSize: '15px', opacity: '0.9' }}
            >
              Community
            </Button>
          </div>

          {conversation?.length > 0 ? (
            <div>
              {' '}
              {conversation?.map((conversation) => (
                <div
                  onClick={() => {
                    handleConversationClick(conversation?.conversation);

                    setMobileMessages(true);
                  }}
                  style={{ cursor: 'pointer', borderRadius: '5px' }}
                  className={
                    conversation?.isNotRead?.length > 0  || conversationId?._id === conversation?.conversation?._id
                      ? 'mb-3 unread1'
                      : 'mb-3'
                  }
                  key={conversation?.conversation?._id}
                >
                  <Conversation
                    userInfo={userInfo}
                    conversation={conversation}
                  />
                </div>
              ))}
            </div>
          ) : (
            <strong
              style={{ height: '30vh', opacity: '0.6' }}
              className="d-flex align-items-center justify-content-center"
            >
              message to friends Show Here
            </strong>
          )}
        </div>

        {mobileMessages && (
          <div style={{ height: '91vh', width: '100%' }}>
            {conversationId ? (
              <div>
                <div>
                  <div
                    style={{ borderBottom: '1px solid grey' }}
                    className="mt-2 d-flex align-items-center justify-content-between"
                  ><div className=' d-flex align-items-center gap-3'>
                    <span
                      onClick={() => {
                        setMobileMessages(false);
                        handleConversationClick(null);
                      }}
                      style={{cursor:"pointer"}}
                    >
                    <ArrowBackIosOutlinedIcon/>
                    </span>
                    <Button
                      variant="light"
                      className=" d-flex align-items-center gap-2"
                    >
                      <div
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                        }}
                      >
                        <img
                          style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                          }}
                          src={`http://localhost:4000/${user.imgUrl}`}
                          alt={''}
                        />
                      </div>
                      <strong className="text-capitalize">
                        {user?.name?.length > 7
                          ? `${user?.name?.slice(0, 5)}...`
                          : `${user?.name}`}
                      </strong>
                    </Button>
                    </div>
                    <div className="d-flex align-items-center gap-3 mx-5">
                      <strong style={{ width: 'fit-content' }} variant="light">
                        <CallIcon className="text-primary" />
                      </strong>
                      <strong style={{ width: 'fit-content' }} variant="light">
                        <VideocamIcon className="text-primary" />
                      </strong>
                      <strong
                        className="p-1"
                        style={{ width: 'fit-content', borderRadius: '50%' }}
                        variant="light"
                      >
                        <ReportGmailerrorredIcon className="text-primary " />
                      </strong>
                    </div>
                  </div>
                </div>
                <div
                  className="my-3"
                  style={{
                    height: '63vh',
                    overflowY: 'scroll',
                    overflowX: 'hidden',
                    width: '100%',
                  }}
                >
                  <div
                    style={{ width: '100%', height: '200px' }}
                    className="d-flex flex-column justify-content-center align-items-center"
                  >
                    <img
                      style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                      }}
                      src={`http://localhost:4000/${user?.imgUrl}`}
                      alt={''}
                    />{' '}
                    <span
                      className="text-center"
                      style={{ fontSize: '13px', opacity: '0.7' }}
                    >
                      {userInfo?.friends.includes(user?._id)
                        ? `You and ${user?.name} are now friends, you can message each
              other. Only two of you can see your conversation`
                        : `You and ${user?.name} are not friends yet.`}
                    </span>
                  </div>
                  {messages.map((message, index) => (
                    <div ref={scrollRef} key={index} className="mb-2">
                      <div
                        style={{
                          justifyContent:
                            message?.senderId === userInfo?._id
                              ? 'flex-end'
                              : 'flex-start',
                        }}
                        className="d-flex gap-2"
                      >
                        <div
                          style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                          }}
                        >
                          {message?.senderId !== userInfo?._id && (
                            <img
                              style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                              }}
                              src={`http://localhost:4000/${user?.imgUrl}`}
                              alt={''}
                            />
                          )}
                        </div>
                        <div
                          style={{
                            maxWidth: '60%',
                            wordWrap: 'break-word',
                          }}
                        >
                          <div
                            style={{
                              borderRadius: '10px',
                            }}
                            className={
                              message?.senderId === userInfo?._id
                                ? 'bg-primary text-white p-2'
                                : 'unread p-2'
                            }
                          >
                            {message?.desc}
                          </div>

                          {message.senderId === userInfo?._id &&
                            index === messages?.length - 1 && (
                              <div
                                style={{
                                  justifyContent: 'flex-end',
                                }}
                                className="d-flex gap-2 "
                              >
                                {message.isRead === true ? (
                                  <span
                                    style={{ opacity: '0.6', fontSize: '14px' }}
                                  >
                                    Seen <DoneAllOutlinedIcon />
                                  </span>
                                ) : (
                                  <span
                                    style={{ opacity: '0.6', fontSize: '14px' }}
                                  >
                                    {' '}
                                    Delivered{' '}
                                    <DoneOutlinedIcon
                                      style={{ width: '20px', height: '20px' }}
                                    />
                                  </span>
                                )}
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  <Form onSubmit={handleMessage} className="d-flex ">
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
                      <SendIcon
                        style={{ width: '40px', height: '40px' }}
                        className="text-primary"
                      />
                    </Button>
                  </Form>
                </div>
              </div>
            ) : (
              <div
                style={{ height: '60%', opacity: '0.3' }}
                className="fs-3 d-flex align-items-center justify-content-center text-capitalize fw-bold"
              >
                Open a conversation to show messages
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Message;
