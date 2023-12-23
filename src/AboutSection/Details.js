import React from 'react'
import { Link } from 'react-router-dom'

function Details() {
  return (
    <div className="d-flex flex-column gap-4 my-3 ">
      <strong>About you</strong>
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
        <strong className="overviewLine">Write some details about yourself</strong>
      </Link>
      <strong>Name pronounciation</strong>
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
        <strong className="overviewLine">Add a name pronounciation</strong>
      </Link>

      <strong>Other names</strong>
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
        <strong className="overviewLine">Add a nickname, a birth name...</strong>
      </Link>
      <strong>Favorite quotes</strong>
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
        <strong className="overviewLine">Add your favorite quotations</strong>
      </Link>
    </div>
  )
}

export default Details