import React, { useEffect } from 'react'
import { Card, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { getSentMails } from '../../../../Store/Mail-Slice/mail-slice'
import './SentMsgDetail.css'

const SentMsgDetail = () => {
const params = useParams()
const sentMessageDetail = useSelector(state => state.mail.sentMail)
const dispatch = useDispatch()
console.log(sentMessageDetail)
console.log(params.sentId)

useEffect(()=>{
    dispatch(getSentMails())
},[params])

 const data = sentMessageDetail.find(item => item.id === params.sentId)
 console.log(data)   

  return (
    <Container className="mt-4">
      <Card className="mx-auto" style={{ maxWidth: '150%', minWidth: '300px', maxHeight: '80vh'}}>
        <Card.Header as="h6" className="card-header-sticky">Message Box</Card.Header>
        <Card.Body style={{overflowY: 'auto' }}>
             <h5 className="card-title">{data.message}</h5>
            <div>
                <span className='sender'>{data.senderEmail}</span>
                <span className='time'>{new Date(data.timeStamp).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true })}</span>
            </div>
            <p>{data.message}</p>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default SentMsgDetail
