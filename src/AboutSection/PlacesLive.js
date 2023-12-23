import React, { useContext, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { Store } from '../Store';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';

function PlacesLive(props) {

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
        
          city: city,
          country: country,
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
  const [city, setCity] = useState(user.city || '');
  const [country, setCountry] = useState(user.country || '');


  const handleLinkClicked = (link) => {
    setClikLink(link);
  };

  console.log('my user', user);


  return (
    <div className="d-flex flex-column gap-4 my-5 ">
       {userInfo._id === params.userId ? (
        <div>
          <Link
            onClick={() => handleLinkClicked('add city')}
            className={
              clickLink
                ? 'd-none'
                : ' text-decoration-none gap-3 d-flex align-items-center'
            }
          >
            {' '}
            {user.city ? (
              <strong
                className="text-black text-capitalize"
                style={{ opacity: '0.7' }}
              >
                {' '}
                <i
                  className="fa fa-map-marker fs-5 mx-2"
                  aria-hidden="true"
                ></i>{' '}
                <strong
                  style={{ fontSize: '14px', opacity: '0.5' }}
                  className="mx-2"
                >
                  {' '}
                  Lives in{' '}
                </strong>{' '}
                {user.city}
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
                <strong className="overviewLine">Add current city</strong>
              </div>
            )}
          </Link>

          {/* THIS IS THE FORM FOR THE UPDATE */}

          {clickLink === 'add city' && (
            <div className="w-50">
              <strong>Add city</strong>
              <InputGroup className="mb-3">
                <Form.Control
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
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
        <strong className="overviewLine">Add city</strong>
      </Link>

      
      {userInfo._id === params.userId ? (
        <div>
          <Link
            onClick={() => handleLinkClicked('country')}
            className={
              clickLink
                ? 'd-none'
                : ' text-decoration-none gap-3 d-flex align-items-center'
            }
          >
            {' '}
            {user.country ? (
              <strong
                className="text-black text-capitalize"
                style={{ opacity: '0.7' }}
              >
                {' '}
                <i
                  className="fa fa-map-marker fs-5 mx-2"
                  aria-hidden="true"
                ></i>{' '}
                <strong
                  style={{ fontSize: '14px', opacity: '0.5' }}
                  className="mx-2"
                >
                  From{' '}
                </strong>{' '}
                {user.country}
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
                <strong className="overviewLine">Add home town</strong>
              </div>
            )}
          </Link>

          {/* THIS IS THE FORM FOR THE UPDATE */}

          {clickLink === 'country' && (
            <div className="w-50">
              <strong>Add hometown</strong>
              <InputGroup className="mb-3">
                <Form.Control
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
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
          {user.country ? (
            <strong className="text-capitalize">
              <strong
                style={{ fontSize: '14px', opacity: '0.5' }}
                className="mx-2"
              >
                From{' '}
              </strong>{' '}
              {user.country}
            </strong>
          ) : (
            'No hometown to show'
          )}
        </strong>
      )}

    </div>
  )
}

export default PlacesLive