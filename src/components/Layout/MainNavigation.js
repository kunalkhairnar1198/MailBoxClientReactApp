import React, { useState } from 'react';
import { Container, Navbar, Button } from 'react-bootstrap';
import SideNav from './SideNav'; 
const MainNavigation = () => {
  const [showSideNav, setShowSideNav] = useState(false);

  const toggleSideNav = () => {
    setShowSideNav(!showSideNav);
  };

  return (
    <>
      <Navbar expand='lg' bg="black" variant="dark">
          <Button className='bg-black' onClick={toggleSideNav} style={{ fontSize: '30px', border:'none' }}>
            &#9776;
          </Button>
        <Container>
          <Navbar.Brand href="/">Welcome to MailBox</Navbar.Brand>
        </Container>
      </Navbar>
      <Container fluid>
        <div>
          <SideNav show={showSideNav} onHide={() => setShowSideNav(false)} />
        </div>
      </Container>
    </>
  );
};

export default MainNavigation;
