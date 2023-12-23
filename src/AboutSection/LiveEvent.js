import React from 'react';
import { Link } from 'react-router-dom';

function LiveEvent() {
  return (
    <div className="d-flex flex-column gap-4 my-3 ">
      <strong>Life events</strong>
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
        <strong className="overviewLine">Add a life event</strong>
      </Link>
    </div>
  );
}

export default LiveEvent;
