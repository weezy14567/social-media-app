import React, {  useRef, useState } from 'react';

import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch,  } from 'react-redux'


import { loginFail, loginStart, loginSuccess } from '../redux/userSlice';

function SignUp() {

 const   dispatch= useDispatch()

  const profileInputRef = useRef(null);

  const [name, setName] = useState('');
  const [imgUrl, setImgUrl] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const formHandler = async (e) => {
    e.preventDefault();
    dispatch(loginStart())
    const formData = new FormData();
    try {
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('imgUrl', imgUrl);

      const { data } = await axios.post(
        `http://localhost:4000/api/users/signup`,
        formData
      );
      dispatch(loginSuccess(data));
      navigate('/');
    } catch (error) {
      console.error(error);
      dispatch(loginFail())
    }
  };
  return (
    <Form
      onSubmit={formHandler}
      encType="multipart/form-data"
      className="my-5 text-capitalize"
      style={{
        width: '500px',
        margin: 'auto',
        height: '100vh',
        display: 'block',
        flexDirection: 'flex-column',
        alignItems: 'center',
      }}
    >
      <Card>
        <Card.Body>
          <div className="mb-3 text-center">
            <h1> Sign Up</h1>
          </div>
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            onChange={(e) => setName(e.target.value)}
            type="name"
            value={name}
            placeholder="enter your name"
            className="my-3"
          />
          <Form.Label>email</Form.Label>

          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            value={email}
            placeholder="email address"
            className="my-3"
          />

          <Form.Label>profile picture</Form.Label>
          <Form.Control
            ref={profileInputRef}
            type="file"
            onChange={(e) => setImgUrl(e.target.files[0])}
            accept="image/*"
            className="my-3"
          />
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            value={password}
            placeholder="choose a strong password"
            className="my-3"
          />

          <Button type="submit">submit</Button>
          <div className="my-3">
            <h5>
              Already Have An Account ? <Link to="/signin">SIgn IN</Link>
            </h5>
          </div>
        </Card.Body>
      </Card>
    </Form>
  );
}

export default SignUp;
