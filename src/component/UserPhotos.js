import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function UserPhotos(props) {
  const params = useParams()
 
  
  const {userInfo} = useSelector((state)=> state.user)
  const { feed } = props;
  return (
    <Card >
      <Card.Title className="d-none d-md-flex gap-3 align-items-center pt-3 px-3 ">
        <Link className="activia text-decoration-none">{userInfo._id === params.userId ? 'Your Photos' :"Photos"}</Link>
        <Link className="text-decoration-none nonactivia">{userInfo._id === params.userId ? 'Your Albums' :"Albums"}</Link>
      </Card.Title>
      <Card.Body>
        {feed.length === 0 ? (
          <div style={{opacity:"0.4"}}><h3 className='text-center'>No posts to show</h3></div>
        ) : (
          <div  className='d-flex flex-wrap gap-3'>
            {feed.map((photo) => (
             
              <Link to={`/video/${photo._id}`} key={photo._id} >
                {photo.type === 'video' ? (
                  <img
                    src={`http://localhost:4000/${photo.imgUrl}`}
                    alt={photo.name}
                    className='mobilePhoto'
                   style={{width:"160px", height:"160px", borderRadius:'10px', objectFit:"cover"}}/>
                ) : (
                  ''
                )}
              </Link>
            ))}
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export default UserPhotos;
