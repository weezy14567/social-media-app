import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/esm/Button';
import { Link } from 'react-router-dom';
import Overview from '../AboutSection/Overview';
import Work from '../AboutSection/Work';
import PlacesLive from '../AboutSection/PlacesLive';
import ContactsAndInfo from '../AboutSection/ContactsAndInfo';
import Details from '../AboutSection/Details';
import Family from '../AboutSection/Family';
import LiveEvent from '../AboutSection/LiveEvent';

function About(props) {
  const {user}=props
  const [activeSection, setActiveSection] = useState('Overview');

  const handleSection = (section) => {
    setActiveSection(section);
  };
  return (
    <div className='my-4'>
      <Card>
        <Card.Body>
          <Row>
            <Col md={4}>
              <Card.Title className="d-flex gap-3 align-items-center pt-3 px-3 fs-4">
               <strong>About</strong> 
              </Card.Title>
              <div
                className="d-flex gap-2  flex-column"
                style={{ opacity: '0.6' }}
              >
                <Button
                  onClick={() => handleSection('Overview')}
                  variant="light"
                  className={
                    activeSection === 'Overview'
                      ? 'fw-bold text-start aboutActive'
                      : 'fw-bold text-start'
                  }
                >
                  Overview
                </Button>
                <Button
                  onClick={() => handleSection('Work')}
                  variant="light"
                  className={
                    activeSection === 'Work'
                      ? 'fw-bold text-start aboutActive'
                      : 'fw-bold text-start'
                  }
                >
                  Work and education{' '}
                </Button>
                <Button
                  onClick={() => handleSection('Places')}
                  variant="light"
                  className={
                    activeSection === 'Places'
                      ? 'fw-bold text-start aboutActive'
                      : 'fw-bold text-start'
                  }
                >
                  {' '}
                  Places lived{' '}
                </Button>
                <Button
                  onClick={() => handleSection('Contact')}
                  variant="light"
                  className={
                    activeSection === 'Contact'
                      ? 'fw-bold text-start aboutActive'
                      : 'fw-bold text-start'
                  }
                >
                  Contact and basic info{' '}
                </Button>
                <Button
                  onClick={() => handleSection('Family')}
                  variant="light"
                  className={
                    activeSection === 'Family'
                      ? 'fw-bold text-start aboutActive'
                      : 'fw-bold text-start'
                  }
                >
                  {' '}
                  Family and relationship
                </Button>
                <Button
                  onClick={() => handleSection('Details')}
                  variant="light"
                  className={
                    activeSection === 'Details'
                      ? 'fw-bold text-start aboutActive'
                      : 'fw-bold text-start'
                  }
                >
                  Details about you{' '}
                </Button>
                <Button
                  onClick={() => handleSection('LiveEvents')}
                  variant="light"
                  className={
                    activeSection === 'LiveEvents'
                      ? 'fw-bold text-start aboutActive'
                      : 'fw-bold text-start'
                  }
                >
                  Live events{' '}
                </Button>
              </div>
            </Col>

            <Col md={8} className="vertical-line">
              <div>
                {activeSection === "Overview" && <Overview user={user}/>}
              </div>
              <div>
                {activeSection === "Work" && <Work user={user}/>}
              </div>
              <div>
                {activeSection === "Places" && <PlacesLive user={user}/>}
              </div>
              <div>
                {activeSection === "LiveEvents" && <LiveEvent user={user}/>}
              </div>
              <div>
                {activeSection === "Family" && <Family user={user}/>}
              </div>
              <div>
                {activeSection === "Details" && <Details user={user}/>}
              </div>
              <div>
                {activeSection === "Contact" && <ContactsAndInfo user={user}/>}
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}

export default About;
