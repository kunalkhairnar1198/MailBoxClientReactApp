import React from 'react';
import { Col, Container, Nav, Offcanvas, Row } from 'react-bootstrap';
import  {NavLink}  from 'react-router-dom'

import './SideNav.css';
import { useDispatch } from 'react-redux';
import { LoaderActions } from '../../Store/UI-Slice/loader-slice';
import { BrowserRouter, Route } from 'react-router-dom/cjs/react-router-dom.min';
import Compose from '../pages/MailComponent/Compose';
import Inbox from '../pages/MailComponent/Inbox/Inbox';

const SideNav = ({show, onHide}) => {
    const dispatch = useDispatch()

    const openModalhandler=()=>{
        dispatch(LoaderActions.openPortal())
    }
  return (
    <BrowserRouter>
    <Container fluid className={`main-container ${show ? 'sidebar-open' : 'sidebar-closed'}`}>
      <Row>
        <Col xs={2} className="p-0">
          <Offcanvas show={show} onHide={onHide} className="sidebar bg-black" style={{ width: '15rem' , color:'white'}} placement="start">
            <Offcanvas.Header closeButton>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="flex-column">
                <Nav.Link as={NavLink} to="/compose" onClick={openModalhandler} >Compose</Nav.Link>
                <Nav.Link as={NavLink} to='/inbox'>Inbox</Nav.Link>
                <Nav.Link >Sent</Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Offcanvas>
        </Col>
        <Col xs={10} className="content-col">
            <Route  path='/compose' component={Compose} />
            <Route path='/inbox' component={Inbox}/>
        </Col>
      </Row>
    </Container>
    </BrowserRouter>
  );
};

export default SideNav;
