import { Card, Col, Nav, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import useFetchInbox from '../../../Hooks/useFetchInbox'
import TableLoader from '../../../UI/TableLoader'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { markReadMail, receivedMailsGet } from '../../../../Store/Mail-Slice/mail-slice'

const InboxMsgDetail = () => {
    const { inboxId } = useParams();
    const { sortIedtems, isLoading } = useFetchInbox();
    const dispatch = useDispatch();

    const receivedData = sortIedtems.find(item => item.id === inboxId);
    
    useEffect(() => {
      console.log('USEEFFECT WORKS')  
      if (receivedData && !receivedData.isRead) {
            dispatch(markReadMail(inboxId));
            dispatch(receivedMailsGet())
        }
    }, [receivedData, dispatch]);

    if (isLoading) {
      return <TableLoader />;
    }

    if (!receivedData) {
        return <div>No message found.</div>;
    }

  return (
    <Card className="w-100 max-w-2xl shadow-sm mt-4">
      <Card.Header as="h6" className="card-header-sticky">Message Box</Card.Header>

      <Card.Body className="p-4">
        <div className="h5 mt-2 mb-4">{receivedData.subject}</div>
      
          <Row className="align-items-start gap-0">
            <Col xs="auto">
              <div className="rounded-circle bg-info d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px'}}>
                ProK
              </div>
            </Col>
            <Col>
              <div className="d-flex justify-content-between align-items-center">
                <div className="font-weight-medium">{receivedData.senderEmail}</div>
                <div className="text-muted small">{new Date(receivedData.timeStamp).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true })}</div>
              </div>
              <div className="text-muted small">{receivedData.to}</div>
            </Col>
          </Row>
        <Card.Text className="mt-4">
               {receivedData.message}
        </Card.Text>
        <div className="d-flex justify-content-between gap-2 mt-4">
            <Nav>
              <Nav.Item>
                <Nav.Link href="">Reply</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link >Forward</Nav.Link>
              </Nav.Item>
          </Nav>  
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
              </svg>
            </div>
        </div>
      </Card.Body>
    </Card>
  )
}

export default InboxMsgDetail
