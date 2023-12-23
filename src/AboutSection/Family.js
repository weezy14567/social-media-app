import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Store } from '../Store';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import { useSelector } from 'react-redux';

function Family(props) {
  const { userInfo } = useSelector((state)=> state.user)

  const { user } = props;
  const params = useParams();
  const { userId } = params;

  const [updateUser, setUpdateUser] = useState('');

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/users/${userId}`,
        {
          marriageStatus: marriageStatus,
        }
      );
      setUpdateUser(data);
      console.log(data);
      setClikLink(false);
    } catch (error) {
      console.error(error);
    }
  };

  const [clickLink, setClikLink] = useState(null);

  const [marriageStatus, setMarriageStatus] = useState(
    user.marriageStatus || ''
  );

  const handleLinkClicked = (link) => {
    setClikLink(link);
  };

  
  return (
    <div className="d-flex flex-column gap-4 mt-3 ">
    <strong>Relationship</strong>
    {userInfo._id === params.userId ? (
        <div>
          <Link
            onClick={() => handleLinkClicked('relation')}
            className={
              clickLink
                ? 'd-none'
                : ' text-decoration-none gap-3 d-flex align-items-center'
            }
          >
            {' '}
            {user.marriageStatus ? (
              <strong
                className="text-black text-capitalize"
                style={{ opacity: '0.7' }}
              >
                {' '}
                <i
                  className="fa fa-users fs-5 mx-2"
                  aria-hidden="true"
                ></i>{' '}
                <strong
                  style={{ fontSize: '14px', opacity: '0.5' }}
                  className="mx-2"
                >
                  status{' '}
                </strong>{' '}
                {user.marriageStatus}
              </strong>
            ) : (
              <div className="text-decoration-none gap-3 d-flex align-items-center">
                <span
                  className="overviewLine align-items-center justify-content-center"
                  style={{
                    fontSize: '2rem',
                    border: '1px solid blue',
                    borderRadius: '50%',
                    height: '30px',
                    width: '30px',
                    display: 'flex',
                  }}
                >
                  +
                </span>
                <strong className="overviewLine">Add relationship</strong>
              </div>
            )}
          </Link>

          {/* THIS IS THE FORM FOR THE UPDATE */}

          {clickLink === 'relation' && (
            <div className="w-50">
              <strong>Add relationship</strong>
              <InputGroup className="mb-3">
                <Form.Control
                  type="text"
                  value={marriageStatus}
                  onChange={(e) => setMarriageStatus(e.target.value)}
                />
              </InputGroup>
              <Button onClick={handleUpdateUser}>save</Button>
            </div>
          )}
        </div>
      ) : (
        <strong style={{ opacity: 0.7 }} className="text-capitalize">
          {' '}
          <i className="fa fa-users fs-5 mx-2" aria-hidden="true"></i>{' '}
          {user.marriageStatus ? (
            <strong className="text-capitalize">
              <strong
                style={{ fontSize: '14px', opacity: '0.5' }}
                className="mx-2"
              >
                Status{' '}
              </strong>{' '}
              {user.marriageStatus}{' '}
            </strong>
          ) : (
            'No relationship to show'
          )}
        </strong>
      )}
    <strong>Family members</strong>
    <Link className="text-decoration-none gap-3 d-flex align-items-center">
      <span
        className="overviewLine  align-items-center justify-content-center"
        style={{
          fontSize: '2rem',
          border: '1px solid blue',
          borderRadius: '50%',
          height: '30px',
          width: '30px',
          display: 'flex',
        }}
      >
        +
      </span>
      <strong className="overviewLine">Add family members</strong>
    </Link>

    
  </div>
  )
}

export default Family