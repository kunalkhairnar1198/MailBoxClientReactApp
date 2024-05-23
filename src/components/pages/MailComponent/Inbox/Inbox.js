import React, { useEffect } from 'react';
import { Card, Table, Container } from 'react-bootstrap';
import { getMails } from '../../../../Store/Mail-Slice/mail-slice';
import {useDispatch, useSelector} from 'react-redux'
const Inbox = () => {
  const dispatch = useDispatch()
  const mails = useSelector(state => state.mail.sentMail)
  console.log(mails)
  useEffect(()=>{
    dispatch(getMails())
  },[])

  return (
    <Container className="mt-5">
      <Card className="mx-auto" style={{ maxWidth: '100%',height:'35rem', minWidth: '300px' }}>
        <Card.Header as="h5">Inbox</Card.Header>
        <Card.Body>
          <Table responsive="sm" className="table">
            <thead>
              <tr>
                {/* <th scope="col">NO</th> */}
                <th scope="col">Subject</th>
                <th scope="col">From</th>
                <th scope="col">To</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {/* <th scope="row">1</th> */}
                <td>dfsdffdds</td>
                <td>kunal@gmail.com</td>
                <td>ram@gmail.com</td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Inbox;
