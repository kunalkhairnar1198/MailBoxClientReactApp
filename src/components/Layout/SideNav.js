import React from 'react';
import { Badge, Col, Container, Nav, Offcanvas, Row } from 'react-bootstrap';
import  {NavLink}  from 'react-router-dom'
import './SideNav.css';
import { useDispatch, useSelector } from 'react-redux';
import { LoaderActions } from '../../Store/UI-Slice/loader-slice';
import { Route, Switch, useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import Compose from '../pages/MailComponent/Compose';
import Inbox from '../pages/MailComponent/Inbox/Inbox';
import Sent from '../pages/MailComponent/SendBox/Sent';
import SentMsgDetail from '../pages/MailComponent/SendBox/SentMsgDetail';
import InboxMsgDetail from '../pages/MailComponent/Inbox/InboxMsgDetail';

const SideNav = ({show, onHide}) => {
    const dispatch = useDispatch()
    const unReadMessages = useSelector(state => state.mail.unReadMessages)
    const {url,path} = useRouteMatch()


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
                <Nav.Link as={NavLink} to={`${url}/compose`} onClick={openModalhandler} >Compose</Nav.Link>
                <Nav.Link as={NavLink} to={`${url}/inbox`}>
                            Inbox 
                            <Badge bg="info" text="dark" style={{marginLeft:'5px', alignContent:'center'}}>
                              {unReadMessages}
                            </Badge>
                </Nav.Link>
                <Nav.Link as={NavLink} to={`${url}/sent`} >Sent</Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Offcanvas>
        </Col>
        <Col xs={10} className="content-col">
          <Switch>
            <Route path={`${path}/compose`} component={Compose} />
            <Route exact path={`${path}/inbox`} component={Inbox}/>
            <Route  path={`${path}/inbox/:inboxId`} component={InboxMsgDetail}/>
            <Route exact path={`${path}/sent`} component={Sent}/>
            <Route path={`${path}/sent/:sentId`} component={SentMsgDetail}/>
          </Switch>
        </Col>  
      </Row>
    </Container>
  );
};

export default SideNav;
