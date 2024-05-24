import React, { useEffect } from 'react';
import { Card, Table, Container } from 'react-bootstrap';
import { getSentMails } from '../../../../Store/Mail-Slice/mail-slice';
import {useDispatch, useSelector} from 'react-redux';
import { format } from 'date-fns'; 

const Sent = () => {
  const dispatch = useDispatch()
  const mails = useSelector(state => state.mail.sentMail)
  console.log(mails)

  useEffect(()=>{
    dispatch(getSentMails())
  },[dispatch])

  const formatDate = (timestamp) => {
    return format(new Date(timestamp), 'MMMdd'); 
  };

  const mapData = mails.map((item, index)=>(
      <tr key={item.id}>
        <th scope="row">{index + 1}</th>
        <td>{item.subject}</td>
        <td>{item.senderEmail}</td>
        <td>{item.to}</td>
        <td>
        <time dateTime={item.timeStamp}>{formatDate(item.timeStamp)}</time>
        </td>
      </tr>
  ));
  
  return (
    <Container className="mt-4">
      <Card className="mx-auto" style={{ maxWidth: '150%', minWidth: '300px', maxHeight: '80vh'}}>
        <Card.Header as="h5" className="card-header-sticky">SentBox</Card.Header>
        <Card.Body style={{overflowY: 'auto' }}>
          <Table responsive="sm" className="table" >
            <thead className="thead-sticky">
              <tr>
                <th scope="col">NO</th> 
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
