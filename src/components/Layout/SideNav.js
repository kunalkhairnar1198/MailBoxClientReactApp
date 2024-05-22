import React from 'react';
import { Col, Container, Nav, Offcanvas, Row } from 'react-bootstrap';
import  {NavLink}  from 'react-router-dom'

import './SideNav.css';
import { useDispatch } from 'react-redux';
import { LoaderActions } from '../../Store/UI-Slice/loader-slice';

const SideNav = ({show, onHide}) => {
    const dispatch = useDispatch()

    const openModalhandler=()=>{
        dispatch(LoaderActions.openPortal())
    }
  return (
    <Container fluid className={`main-container ${show ? 'sidebar-open' : 'sidebar-closed'}`}>
      <Row>
        <Col xs={2} className="p-0">
          <Offcanvas show={show} onHide={onHide} className="sidebar bg-black" style={{ width: '15rem' , color:'white'}} placement="start">
            <Offcanvas.Header closeButton>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="flex-column">
                <Nav.Link as={NavLink} to="/compose" onClick={openModalhandler} >Compose</Nav.Link>
                <Nav.Link >Send</Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Offcanvas>
        </Col>
        <Col xs={10} className="content-col">
          {/* <Button variant="outline-primary" onClick={onHide}>
            Click here to toggle the sidebar
          </Button> */}
          
          {/* <p>Content that is pushed to the right when sidebar is open.</p> */}
        </Col>
      </Row>
    </Container>
  );
};

export default SideNav;
