import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Store } from '../Store';
import Button from 'react-bootstrap/esm/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { useSelector } from 'react-redux';

function ContactsAndInfo(props) {

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
          gender: gender,
         email: email,
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
  const [gender, setGenderName] = useState(user.gender || 'male');
  const [email, setEmail] = useState(user.email || '');

  const handleLinkClicked = (link) => {
    setClikLink(link);
  };
  return (
    <div className="d-flex flex-column gap-4 my-3 ">
      <strong>Contact info</strong>
      <Link className=" text-decoration-none gap-3 d-flex align-items-center">
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
        <strong className="overviewLine">Add a mobile number</strong>
      </Link>

      {userInfo._id === params.userId ? (
        <div>
          <Link
            onClick={() => handleLinkClicked('email')}
            className={
              clickLink
                ? 'd-none'
                : ' text-decoration-none gap-3 d-flex align-items-center'
            }
          >
            {' '}
            {user.email ? (
              <strong
                className="text-black text-capitalize"
                style={{ opacity: '0.7' }}
              >
                {' '}
                <i
                  className="fa fa-envelope fs-5 mx-2"
                  aria-hidden="true"
                ></i>{' '}
                <strong
                  style={{ fontSize: '14px', opacity: '0.5' }}
                  className="mx-2"
                >
                  {' '}
                  email address{' '}
                </strong>{' '}
                {user.email}
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
                <strong className="overviewLine">Add email address</strong>
              </div>
            )}
          </Link>

          {/* THIS IS THE FORM FOR THE UPDATE */}

          {clickLink === 'email' && (
            <div className="w-50">
              <strong>Add email</strong>
              <InputGroup className="mb-3">
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </InputGroup>
              <Button onClick={handleUpdateUser}>save</Button>
            </div>
          )}
        </div>
      ) : (
        <strong style={{ opacity: 0.7 }} className="text-capitalize">
          {' '}
          <i className="fa fa-map-marker fs-5 mx-2" aria-hidden="true"></i>{' '}
          {user.email ? (
            <strong>
              <strong
                style={{ fontSize: '14px', opacity: '0.5' }}
                className="mx-2"
              >
                email {' '}
              </strong>{' '}
              {user.email}{' '}
            </strong>
          ) : (
            'No email to show'
          )}
        </strong>
      )}

      <strong>Websites</strong>
      <Link className=" text-decoration-none gap-3 d-flex align-items-center">
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
        <strong className="overviewLine">Add a website</strong>
      </Link>
      <Link className=" text-decoration-none gap-3 d-flex align-items-center">
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
        <strong className="overviewLine">Add a social link</strong>
      </Link>
      <strong>Basic info</strong>
      <Link className=" text-decoration-none gap-3 d-flex align-items-center">
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
        <strong className="overviewLine">Add language</strong>
      </Link>

      {userInfo._id === params.userId ? (
        <div>
          <Link
            onClick={() => handleLinkClicked('gender')}
            className={
              clickLink
                ? 'd-none'
                : ' text-decoration-none gap-3 d-flex align-items-center'
            }
          >
            {' '}
            {user.gender ? (
              <strong
                className="text-black text-capitalize"
                style={{ opacity: '0.7' }}
              >
                {' '}
                <i className="fa fa-mars fs-5 mx-2" aria-hidden="true"></i>{' '}
                <strong
                  style={{ fontSize: '14px', opacity: '0.5' }}
                  className="mx-2"
                >
                  {' '}
                  gender{' '}
                </strong>{' '}
                {user.gender}
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
                <strong className="overviewLine">Add gender</strong>
              </div>
            )}
          </Link>

          {/* THIS IS THE FORM FOR THE UPDATE */}

          {clickLink === 'gender' && (
            <div className="w-50">
              <strong>Add gender</strong>
              <Form.Group className="mb-3">
                <Form.Check
                  type="radio"
                  id="male"
                  label="Male"
                  checked={gender === 'male'}
                  value="male"
                  onChange={(e) => setGenderName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Check
                  type="radio"
                  id="female"
                  label="Female"
                  checked={gender === 'female'}
                  value="female"
                  onChange={(e) => setGenderName(e.target.value)}
                />
              </Form.Group>
              <Button onClick={handleUpdateUser}>save</Button>
            </div>
          )}
        </div>
      ) : (
        <strong style={{ opacity: 0.7 }} className="text-capitalize">
          {' '}
          <i className="fa fa-map-marker fs-5 mx-2" aria-hidden="true"></i>{' '}
          {user.city ? (
            <strong>
              <strong
                style={{ fontSize: '14px', opacity: '0.5' }}
                className="mx-2"
              >
                Lives in{' '}
              </strong>{' '}
              {user.city}{' '}
            </strong>
          ) : (
            'No city to show'
          )}
        </strong>
      )}

      <Link className=" text-decoration-none gap-3 d-flex align-items-center">
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
        <strong className="overviewLine">Add system pronouns</strong>
      </Link>
      <Link className=" text-decoration-none gap-3 d-flex align-items-center">
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
        <strong className="overviewLine">Add date of birth</strong>
      </Link>
    </div>
  );
}

export default ContactsAndInfo;
