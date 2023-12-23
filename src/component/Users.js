import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import HomeScreen from './HomeScreen';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Store } from '../Store';
import { useDispatch, useSelector } from 'react-redux';
import { befriends } from '../redux/userSlice';

function Users() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);

  const [users, setUsers] = useState([]);

  const addFriends = async (id, friendId) => {
    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/users/${id}/${friendId}`
      );
      const formattedFriends = data.formattedFriends;
      console.log(formattedFriends);
      dispatch(befriends(friendId));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get(
        'http://localhost:4000/api/users/getusers'
      );
      setUsers(data);
    };
    fetchUsers();
  }, []);



  const allUsers = userInfo.friends.map((friendId) => friendId )
  console.log('userFriends', allUsers);
  const filteredUsers = users.filter((friend) => !allUsers.includes(friend._id))
  console.log('filteredUsers', filteredUsers);

  return (
    <div style={{ display: 'flex', flexWrap:"wrap", gap:"20px", overflowX: 'hidden' }} className="my-4">
     
      {users.map((user) => (
      
        <Card
          key={user._id}
          style={{ width: '200px', height: '200px' }}
          className="mx-1"
        >
          <Link
            to={`/user/${user._id}`}
            style={{ maxHeight: '50%', objectFit: 'cover' }}
          >
            {' '}
            <img
              style={{ height: '100%', objectFit: 'cover', width: '100%' }}
              src={`http://localhost:4000/${user.imgUrl}`}
              alt={user.name}
            />
          </Link>

          <Card.Body>
            <Button
              variant="lighter"
              className="text-capitalize d-flex flex-column"
              style={{ fontSize: '13px', fontWeight: 'bold' }}
            >
              {user.name}
            </Button>
            <div>
              {userInfo.friends.find((friendId) => friendId === user._id) ? (
                <Button
                  variant="light"
                  style={{
                    backgroundColor: 'rgba(128, 118, 128, 0.5)',
                    color: 'black',
                    fontWeight: 'bold',
                    opacity: '0.8',
                  }}
                  onClick={() => addFriends(userInfo._id, user._id)}
                >
                  Folloing
                </Button>
              ) : (
                <Button onClick={() => addFriends(userInfo._id, user._id)}>
                  Follow
                </Button>
              )}
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default Users;
