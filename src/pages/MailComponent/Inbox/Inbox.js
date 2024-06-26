import {Button, Card, Table, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { DeleteHandler, markReadMail } from '../../../Store/Mail-Slice/mail-slice';
import Dot from '../../../components/UI/Dot';
import TableLoader from '../../../components/UI/TableLoader';
import useFetchInbox from '../../../Hooks/useFetchInbox';


const Inbox = () => {
  const dispatch = useDispatch()
  const {sortIedtems, isLoading, isSortAscending} = useFetchInbox()
  const location = useLocation()
  const history = useHistory()
  console.log(sortIedtems,isLoading)

 

  // const changeSortingHandler =(()=>{
  //   history.push({
  //     pathname:location.pathname,
  //     search :`?sort=${(isSortAscending ? 'desc' : 'asc')}`
  //   })
  // })
  
  const NavigateInboxDetailPage =(inboxId)=>{
      dispatch(markReadMail(inboxId))
      history.push(`${location.pathname}/${inboxId}`)
  }

  const deleteHandler =(e, id)=>{
        e.stopPropagation()
        dispatch(DeleteHandler(id,'received'))
        console.log('delete',id)
  }

  if(isLoading){
    return <TableLoader/>
  }

  const mapData = sortIedtems.map((item, index)=>(
      <tr key={item.id} className={item.isRead ? 'fx-1' :'fw-bolder'} onClick={()=>NavigateInboxDetailPage(item.id)}>
        <th scope="row">
          <input className="form-check-input" type="checkbox" value="" id={index + 1 }/> 
        </th>
        <td>{item.isRead ? '' : <Dot/> }</td>
        <td>{item.subject}</td>
        <td>{item.senderEmail}</td>
        <td>{item.to}</td>
        <td>
        {new Date(item.timeStamp).toLocaleString('en-US', { month: 'short', day: 'numeric' })} 
        </td>
        <td>
        <button className='btn btn-outline-dark' onClick={(e)=>deleteHandler(e,item.id)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
            </svg>
        </button>
      </td>
      </tr>
  ));
  
  return (
    <Container className="mt-4">
      {/* <Button className='btn btn-dark mb-2' onClick={changeSortingHandler}>Sorting {isSortAscending ? 'Decending' : 'Ascending'}</Button> */}
      <Card className="mx-auto" style={{ maxWidth: '150%', minWidth: '300px', maxHeight: '80vh'}}>
        <Card.Header as="h5" className="card-header-sticky">Inbox</Card.Header>
        <Card.Body style={{overflowY: 'auto' }}>
          {isLoading && <TableLoader/>}
         
         {sortIedtems.length > 0 ? (
          <Table responsive="sm" className="table table-hover" >
              <thead className="thead-sticky">
                <tr>
                  <th scope="col">
                  <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/> 
                  </th>
                  <th scope="col"></th>
                  <th scope="col">Subject</th>
                  <th scope="col">From</th>
                  <th scope="col">To</th>
                  <th scope="col">Time</th>
                </tr>
              </thead>
              <tbody>
                {!isLoading && mapData}
              </tbody>
            </Table>
          ):(
            'Mails is not found'
          )}

        </Card.Body>
      </Card>
    </Container>
  );
};

export default Inbox;
