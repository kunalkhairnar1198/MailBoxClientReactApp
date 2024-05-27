import React, { useEffect } from 'react';
import { Card, Table, Container } from 'react-bootstrap';
import { getSentMails } from '../../../../Store/Mail-Slice/mail-slice';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';

const Sent = () => {
  const dispatch = useDispatch()
  const mails = useSelector(state => state.mail.sentMail)
  const location = useLocation()
  const history = useHistory()
  console.log('sending mails check on the mail component',mails)

  useEffect(()=>{
    dispatch(getSentMails())
  },[dispatch])

  const NavigateDetailPage =(sentId)=>{
    console.log(sentId)
    history.push(`${location.pathname}/${sentId}`);
  }

  const mapData = mails.map((item, index)=>(
      <tr key={item.id} onClick={()=>NavigateDetailPage(item.id)}>
        <th scope="row">
            <input className="form-check-input" type="checkbox" value="" id={index + 1}/>    
        </th>
        <td>{item.subject}</td>
        <td>{item.senderEmail}</td>
        <td>{item.to}</td>
        <td>
        {new Date(item.timeStamp).toLocaleString('en-US', { month: 'short', day: 'numeric' })}
        </td>
      </tr>
  ));
  
  return (
    <Container className="mt-4">
      <Card className="mx-auto" style={{ maxWidth: '150%', minWidth: '300px', maxHeight: '80vh'}}>
        <Card.Header as="h5" className="card-header-sticky">SentBox</Card.Header>
        <Card.Body style={{overflowY: 'auto' }}>
          <Table responsive="sm" className="table table-hover" >
            <thead className="thead-sticky">
              <tr>
                <th scope="col">
                     <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>    
                </th> 
                <th scope="col">Subject</th>
                <th scope="col">From</th>
                <th scope="col">To</th>
                <th scope="col">Time</th>
              </tr>
            </thead>
            <tbody>
              {mapData}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Sent;
