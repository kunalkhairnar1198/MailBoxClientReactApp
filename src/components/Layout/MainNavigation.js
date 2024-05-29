import React, { useState } from 'react';
import { Container, Navbar, Button, Nav, NavLink, NavbarToggle } from 'react-bootstrap';
import SideNav from './SideNav'; 
import { AuthActions } from '../../Store/Auth-Slice/auth-slice';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const MainNavigation = () => {
  const [showSideNav, setShowSideNav] = useState(false);
  const isAuthentication = useSelector(state => state.auth.isAuthenticated)
  const dispatch = useDispatch()
  const history = useHistory()

  const toggleSideNav = () => {
    setShowSideNav(!showSideNav);
  };
  
  const logoutHandler =()=>{
      dispatch(AuthActions.logoutHandler())
      history.replace('/')
      // console.log('LOGOUT')
  }

  return (
    <>
      <Navbar expand='lg' bg="white" variant="light" className="bg-body-tertiary">
          <Button className='bg-light' variant='dark' onClick={toggleSideNav} style={{ fontSize: '30px', border:'none', color:'black' }}>
            &#9776;
          </Button>
          
          <Container>
          {isAuthentication && <Navbar.Brand href="/">Welcome to MailBox</Navbar.Brand>}
            <Nav className="justify-content-end">
              <Navbar.Text>
                <Nav.Link as={NavLink} onClick={logoutHandler}>SignOut</Nav.Link>
              </Navbar.Text>
            </Nav>
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
