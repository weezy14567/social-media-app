import React from 'react'
import Card from 'react-bootstrap/Card';


function UserEvent() {
  return (
    <Card>
    <Card.Title className="d-flex gap-3 align-items-center pt-3 px-3">
     Events
    </Card.Title>
    <Card.Body>
     
     <h3 style={{opacity:"0.4"}} className='text-center'>No events to show</h3>
   
    </Card.Body>
  </Card>
  )
}

export default UserEvent