import React from 'react'
import Card from 'react-bootstrap/Card';


function userVideo() {
  return (
    <Card>
    <Card.Title className="d-flex gap-3 align-items-center pt-3 px-3">
      <strong >Videos</strong>
    
    </Card.Title>
    <Card.Body>
     
     <h3 style={{opacity:"0.4"}} className='text-center'>No activity to show</h3>
   
    </Card.Body>
  </Card>
  )
}

export default userVideo