import React from 'react';
import { Card, Table, Container } from 'react-bootstrap';
import {useDispatch} from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import useFetchSentbox from '../../../Hooks/useFetchSentbox';
import TableLoader from '../../../UI/TableLoader';

const Sent = () => {
  const dispatch = useDispatch()
  const {mails, isLoading} = useFetchSentbox()
  const location = useLocation()
  const history = useHistory()
  console.log('sending mails check on the mail component',mails)

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
        {isLoading && <TableLoader/>}
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
              {!isLoading ? mapData : <h1>Data is not found</h1>}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Sent;
