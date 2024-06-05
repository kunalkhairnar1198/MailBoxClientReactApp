import React, { useRef } from 'react'
import {Button, Card, CardBody, Col, Form,  Row} from 'react-bootstrap';
import classes from './Signup.module.css';   
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


const Forgotpass = () => {
    const EmailRef = useRef()
    const navigate = useHistory()

    const submitHandler =async(event)=>{
        event.preventDefault()
    
        const forgotPassmail = EmailRef.current.value;
       
                try {
                    const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyC7hFWT415CG0qrbxEA-rWcjlUwQQptWL4',{
                        method: 'POST',
                        body: JSON.stringify({
                            email: forgotPassmail,
                            requestType:"PASSWORD_RESET"
                        }),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })

                    if(response.ok){
                        const data = await response.json()
                        navigate.replace('/')
                        console.log(data)
                    }else{
                        const errorData = await response.json;
                        console.error('passwordResetError', errorData)
                    }
                } catch (error) {
                    console.log('password reset error',error)
                }
    }
    const BacktoLogin =()=>{
        navigate.replace('/')
    }

  return (
    <section className='d-flex align-item-center justify-content-center mt-5 '>
    <Row>
        <Col className={classes.col}>  
            <Card className={classes.card}>
                <CardBody>
                  <Card.Title className='text-center'>Forgot password</Card.Title>
                    <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>      
                        <Form.Control type="email" placeholder="Enter email" ref={EmailRef}/>
                    </Form.Group>

                        <div className='container'>
                            <Button variant="primary" className='form-control rounded-5' type="submit">
                            Reset Email
                            </Button>
                            <Button variant="primary" onClick={()=>BacktoLogin()} className='form-control rounded-5 mt-2' type="submit">
                            Back to login
                            </Button>
                        </div>
                    </Form> 
                </CardBody>
            </Card>
        </Col>
        
    </Row>
</section>
  )
}

export default Forgotpass
