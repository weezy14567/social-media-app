import axios from 'axios';
import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import { Link, useParams } from 'react-router-dom';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { Store } from '../Store';
import { useSelector } from 'react-redux';

function Overview(props) {
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
          college: college,
          city: city,
          country: country,
          university: university,
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
  const [college, setCollege] = useState(user.college || '');
  const [city, setCity] = useState(user.city || '');
  const [country, setCountry] = useState(user.country || '');
  const [university, setUniversity] = useState(user.university || '');
  const [marriageStatus, setMarriageStatus] = useState(
    user.marriageStatus || ''
  );

  const handleLinkClicked = (link) => {
    setClikLink(link);
  };

  console.log('my user', user);

  return (
    <div className="d-flex flex-column gap-4 my-5 ">
      {/* THIS IS THE LINK TO THE UPDATE  */}
      {userInfo._id === params.userId ? (
        <div>
          <Link
            onClick={() => handleLinkClicked('add high school')}
            className={
              clickLink
                ? 'd-none'
                : ' text-decoration-none gap-3 d-flex align-items-center'
            }
          >
            {' '}
            {user.college ? (
              <strong
                className="text-black text-capitalize"
                style={{ opacity: '0.7' }}
              >
                {' '}
                <i
                  className="fa fa-graduation-cap fs-5 mx-2"
                  aria-hidden="true"
                ></i>{' '}
                <strong
                  style={{ fontSize: '14px', opacity: '0.5' }}
                  className="mx-2"
                >
                  studied at{' '}
                </strong>{' '}
                {user.college}
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
                <strong className="overviewLine">Add high school</strong>
              </div>
            )}
          </Link>

          {/* THIS IS THE FORM FOR THE UPDATE */}

          {clickLink === 'add high school' && (
            <div className="w-50">
              <strong>Add high school</strong>
              <InputGroup className="mb-3">
                <Form.Control
                  type="text"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                />
              </InputGroup>
              <Button onClick={handleUpdateUser}>save</Button>
            </div>
          )}
        </div>
      ) : (
        <strong style={{ opacity: 0.7 }} className="text-capitalize">
          {' '}
          <i
            className="fa fa-graduation-cap fs-5 mx-2"
            aria-hidden="true"
          ></i>{' '}
          {user.college ? (
            <strong>
              <strong
                style={{ fontSize: '14px', opacity: '0.5' }}
                className="mx-2"
              >
                high school at{' '}
              </strong>{' '}
              {user.college}{' '}
            </strong>
          ) : (
            'No school to show'
          )}
        </strong>
      )}

      {/* CITY OF USER */}

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

      {/* USER COUNTRY  */}

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

      {userInfo._id === params.userId ? (
        <div>
          <Link
            onClick={() => handleLinkClicked('university')}
            className={
              clickLink
                ? 'd-none'
                : ' text-decoration-none gap-3 d-flex align-items-center'
            }
          >
            {' '}
            {user.university ? (
              <strong
                className="text-black text-capitalize"
                style={{ opacity: '0.7' }}
              >
                {' '}
                <i
                  className="fa fa-graduation-cap fs-5 mx-2"
                  aria-hidden="true"
                ></i>{' '}
                <strong
                  style={{ fontSize: '14px', opacity: '0.5' }}
                  className="mx-2"
                >
                  Studied at{' '}
                </strong>{' '}
                {user.university}
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
                <strong className="overviewLine">Add university</strong>
              </div>
            )}
          </Link>

          {/* THIS IS THE FORM FOR THE UPDATE */}

          {clickLink === 'university' && (
            <div className="w-50">
              <strong>Add university</strong>
              <InputGroup className="mb-3">
                <Form.Control
                  type="text"
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                />
              </InputGroup>
              <Button onClick={handleUpdateUser}>save</Button>
            </div>
          )}
        </div>
      ) : (
        <strong style={{ opacity: 0.7 }} className="text-capitalize">
          {' '}
          <i
            className="fa fa-graduation-cap fs-5 mx-2
                  fs-5 mx-2"
            aria-hidden="true"
          ></i>{' '}
          {user.university ? (
            <strong>
              <strong
                style={{ fontSize: '14px', opacity: '0.5' }}
                className="mx-2"
              >
                studied at{' '}
              </strong>{' '}
              {user.university}
            </strong>
          ) : (
            'No university to show'
          )}
        </strong>
      )}

      {/* RELATIONSHIP */}

      {userInfo._id === params.userId ? (
        <div>
          <Link
            onClick={() => handleLinkClicked('relationship')}
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

          {clickLink === 'relationship' && (
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
    </div>
  );
}

export default Overview;
