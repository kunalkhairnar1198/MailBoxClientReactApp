import React, { useEffect } from 'react';
import { Card, Table, Container } from 'react-bootstrap';
import { receivedMailsGet } from '../../../../Store/Mail-Slice/mail-slice';
import {useDispatch, useSelector} from 'react-redux';

const Inbox = () => {
  const dispatch = useDispatch()
  const receivedMails = useSelector(state => state.mail.receivedMail)
  console.log(receivedMails)

  useEffect(()=>{
    dispatch(receivedMailsGet())
  },[dispatch])
  

  const mapData = receivedMails.map((item, index)=>(
      <tr key={item.id}>
        <th scope="row">
          <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/> 
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
        <Card.Header as="h5" className="card-header-sticky">Inbox</Card.Header>
        <Card.Body style={{overflowY: 'auto' }}>
          <Table responsive="sm" className="table table-hover" >
            <thead className="thead-sticky">
              <tr>
                <th scope="col">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/> 
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

export default Inbox;
