import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';

function NavHead() {
  const { userInfo } = useSelector((state)=> state.user)
  const navigate = useNavigate()

  useEffect(()=>{
    if(userInfo === null || !userInfo._id){
      navigate('/signin')
    }
  },[userInfo, navigate])
  return (
    <div className="d-flex mt-2 flex-column align-items-center">
      <Link
        to={`user/${userInfo?._id}`}
        className="text-decoration-none naHover"
      >
        <div className=" d-flex  gap-2 align-items-center">
          <span className=" user-image ">
            <img
              src={`http://localhost:4000/${userInfo?.imgUrl}`}
              alt={userInfo?.name}
            />
          </span>
          <div className="text-black">
            <strong className='text-capitalize'>{userInfo?.name}</strong>
          </div>
        </div>
      </Link>

      <Link className="text-decoration-none naHover ">
        <div className=" d-flex  gap-2 align-items-center">
          <span className="py-3 fs-4 ">
            <i className="fa fa-users" aria-hidden="true"></i>
          </span>
          <div className=" text-black">
            <strong>Friends</strong>
          </div>
        </div>
      </Link>
      <Link className="text-decoration-none naHover ">
        <div className=" d-flex  gap-2 align-items-center">
          <span className="py-3 fs-4 ">
            <i class="fa fa-desktop" aria-hidden="true"></i>
          </span>
          <div className=" text-black">
            <strong>Videos</strong>
          </div>
        </div>
      </Link>
      <Link className="text-decoration-none naHover">
        <div className=" d-flex  gap-2 align-items-center">
          <span className="py-3 fs-4 ">
            <i class="fa fa-rss" aria-hidden="true"></i>
          </span>
          <div className=" text-black">
            <strong>Feeds</strong>
          </div>
        </div>
      </Link>
      <Link className="text-decoration-none naHover">
        <div className=" d-flex  gap-2 align-items-center">
          <span className="py-3 fs-4 ">
            <i class="fa fa-users" aria-hidden="true"></i>
          </span>
          <div className=" text-black">
            <strong>Groups</strong>
          </div>
        </div>
      </Link>
      <Link className="text-decoration-none naHover">
        <div className=" d-flex  gap-2 align-items-center">
          <span className="py-3 fs-4 ">
            <i class="fa fa-building" aria-hidden="true"></i>
          </span>
          <div className=" text-black">
            <strong>MarketPlace</strong>
          </div>
        </div>
      </Link>
      <Link className="text-decoration-none naHover">
        <div className=" d-flex  gap-2 align-items-center">
          <span className="py-3 fs-4 ">
            <i class="fa fa-shopping-bag" aria-hidden="true"></i>
          </span>
          <div className=" text-black">
            <strong>Memory</strong>
          </div>
        </div>
      </Link>
      <Link className="text-decoration-none naHover">
        <div className=" d-flex  gap-2 align-items-center">
          <span className="py-3 fs-4 ">
            <i class="fa fa-bookmark" aria-hidden="true"></i>
          </span>
          <div className=" text-black">
            <strong>Saved</strong>
          </div>
        </div>
      </Link>
      <Link className="text-decoration-none naHover">
        <div className=" d-flex  gap-2 align-items-center">
          <span className="py-3 fs-4 ">
            <i class="fa fa-columns" aria-hidden="true"></i>
          </span>
          <div className=" text-black">
            <strong>Pages</strong>
          </div>
        </div>
      </Link>
      <Link className="text-decoration-none naHover">
        <div className=" d-flex  gap-2 align-items-center">
          <span className="py-3 fs-4 ">
            <i className="fa fa-calendar" aria-hidden="true"></i>
          </span>
          <div className=" text-black">
            <strong>Event</strong>
          </div>
        </div>
      </Link>
      <Link className="text-decoration-none naHover ">
        <div className=" d-flex  gap-2 align-items-center">
          <span className="py-3 fs-4 ">
            <i className="fa fa-caret-down" aria-hidden="true"></i>
          </span>
          <div className=" text-black">
            <strong>See More</strong>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default NavHead;
