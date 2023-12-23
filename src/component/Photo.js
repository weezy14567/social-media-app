import React, { useContext, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Store } from '../Store';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Photo() {
  const { userInfo } = useSelector((state)=> state.user)

  const [data, setData] = useState('');
  const [photoDesc, setPhotoDesc] = useState('');

  const navigate = useNavigate()

  const formHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:4000/api/photos`,
        { photoDesc },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      setData(res.data);
      navigate('/')
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Form
      onSubmit={formHandler}
      style={{
        width: '500px',
        margin: 'auto',
        height: '100vh',
        display: 'flex',
        flexDirection: 'flex-column',
        alignItems: 'center',
      }}
    >
      <Row>
        <Form.Label column="lg" lg={2}>
          description
        </Form.Label>
        <Col>
          <Form.Control
            onChange={(e) => setPhotoDesc(e.target.value)}
            size="lg"
            type="text"
            placeholder="description"
          />
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <Button type="submit">submit</Button>
        </Col>
      </Row>
    </Form>
  );
}

export default Photo;
