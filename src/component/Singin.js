import React, { useContext, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Store } from '../Store';
import { Link, useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess } from '../redux/userSlice';

function Signin() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const formHandler = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const { data } = await axios.post(
        `http://localhost:4000/api/users/signin`,
        { email, password }
      );
      dispatch(loginSuccess(data));
      navigate('/');
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className='d-flex flex-column justify-content-center align-items-center' style={{height:"80vh"}}>
     
      <div  style={{
        width:"380px"
        
      }}>
    <Form
      onSubmit={formHandler}
      className="my-5"
     
    >
      <div className="mb-3 text-center">
        <h1> Sign In</h1>
      </div>
      <Card style={{ }}>
        <Card.Body className='d-flex flex-column gap-3'>
          <di >
            <strong>Email</strong>

            <Form.Control
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              value={email}
              placeholder="email address"
            />
          </di>

          <div>
            <strong>Password</strong>

            <Form.Control
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              value={password}
              placeholder="password"
            />
          </div>
          <div className="d-grid">
            <Button className='fw-bold' type="submit">Sign In</Button>
          </div>
          <div className="my-3">
            <h5>
              New User ? <Link to="/signup"> SIgn Up</Link>
            </h5>
          </div>
        </Card.Body>
      </Card>
    </Form>
    </div>
    </div>
  );
}

export default Signin;
