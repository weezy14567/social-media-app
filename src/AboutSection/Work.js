import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Store } from '../Store';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import { useSelector } from 'react-redux';

function Work(props) {
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
          work: work,

          university: university,
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
  const [work, setWork] = useState(user.work || '');
  const [university, setUniversity] = useState(user.university || '');

  const handleLinkClicked = (link) => {
    setClikLink(link);
  };

  console.log('my user', user);

  return (
    <div className="d-flex flex-column gap-4 my-5 ">
      <strong>Work</strong>
      {userInfo._id === params.userId ? (
        <div>
          <Link
            onClick={() => handleLinkClicked('work')}
            className={
              clickLink
                ? 'd-none'
                : ' text-decoration-none gap-3 d-flex align-items-center'
            }
          >
            {' '}
            {user.work ? (
              <strong
                className="text-black text-capitalize"
                style={{ opacity: '0.7' }}
              >
                {' '}
                <i
                  className="fa fa-briefcase fs-5 mx-2"
                  aria-hidden="true"
                ></i>{' '}
                <strong
                  style={{ fontSize: '14px', opacity: '0.5' }}
                  className="mx-2"
                >
                  work at{' '}
                </strong>{' '}
                {user.work}
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
                <strong className="overviewLine">Add work place</strong>
              </div>
            )}
          </Link>

          {/* THIS IS THE FORM FOR THE UPDATE */}

          {clickLink === 'work' && (
            <div className="w-50">
              <strong>Add work</strong>
              <InputGroup className="mb-3">
                <Form.Control
                  type="text"
                  value={work}
                  onChange={(e) => setWork(e.target.value)}
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
            className="fa fa-briefcase fs-5 mx-2"
            aria-hidden="true"
          ></i>{' '}
          {user.work ? (
            <strong>
              <strong
                style={{ fontSize: '14px', opacity: '0.5' }}
                className="mx-2"
              >
                high school at{' '}
              </strong>{' '}
              {user.work}{' '}
            </strong>
          ) : (
            'No work place to show'
          )}
        </strong>
      )}


      <strong>College</strong>
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


      <strong>High school</strong>
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
    </div>
  );
}

export default Work;
