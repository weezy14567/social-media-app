import React, { useEffect, useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

import axios from 'axios';

function Conversation(props) {
  const { conversation, userInfo } = props;
  const [user, setUser] = useState('');

  useEffect(() => {
    const friendId = conversation?.conversation?.members?.find(
      (m) => m !== userInfo?._id
    );

    const currentMessagingUser = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/users/singleuser/${friendId}`
        );

        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    currentMessagingUser();
  }, [userInfo?._id, conversation]);

  return (
    <div className="d-flex gap-2 align-items-center">
      {!user?.imgUrl ? (
        <Button
          variant="light"
          style={{ borderRadius: '50%', border: '1px solid grey' }}
          className="p-1"
        >
          <PersonIcon
            style={{ width: '40px', height: '40px', color: 'grey' }}
          />
        </Button>
      ) : (
        <img
          style={{ borderRadius: '50%', width: '50px', height: '50px' }}
          src={`http://localhost:4000/${user?.imgUrl}`}
          alt={''}
        />
      )}
      <div style={{ position: 'relative' }} className="d-flex flex-column">
        <strong className="text-capitalize">{user?.name}</strong>
        <span >
          <span key={conversation?.latestMessage?._id} style={{ opacity: '0.7',  }}>{conversation?.latestMessage?.desc?.length > 30
            ? `${conversation?.latestMessage?.desc?.slice(0, 30)}...`
            : conversation?.latestMessage?.desc}</span>
            
        </span>
        {conversation?.isNotRead?.length > 0 && (
          <span style={{position:"absolute", right:-40, top:10}}><Badge bg='danger' className='' style={{borderRadius:"50%"}}>{conversation?.isNotRead?.length}</Badge></span>
        )}
      </div>
    </div>
  );
}

export default Conversation;
