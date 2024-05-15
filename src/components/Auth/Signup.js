import React, { useRef, useState } from 'react'
import {Button, Card, CardBody, Form, Row} from 'react-bootstrap';
// import classes from './Signup.module.css';

const Signup = () => {
    
    const EmailRef = useRef()
    const PasswordRef = useRef()
    const ConfirmPassRef = useRef()

    const SubmitHandler = async (event) => {
            event.preventDefault()

            const email = EmailRef.current.value;
            const password = PasswordRef.current.value;


        const confirmPassword = ConfirmPassRef.current.value;

            if (password !== confirmPassword) {
                console.error('Passwords do not match');
                return;
            }

            console.log(email, password, confirmPassword)
            
        try {
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC7hFWT415CG0qrbxEA-rWcjlUwQQptWL4',{
                method: 'POST',
                body: JSON.stringify({
                    email: email,
                    password : password,
                    returnSecureToken: true
                }),
                headers:{
                    'Content-Type': 'application/json'
                }
            });
            if(response.ok){
                const data = await response.json();
                console.log('Authentication succesful', data)
            }else{
                const errorData = await response.json()
                throw new Error(errorData || 'Authentication Failed')
            }

        } catch (error) {
            console.log('Authentication failed', error.message)
        }
    }

  return (
    <section className='d-flex align-item-center justify-content-center mt-5'>
            <Row>
                <Card>
                <CardBody>
                        <Card.Title className='text-center'>SignUp</Card.Title>
                    <Form onSubmit={SubmitHandler}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" ref={EmailRef}/>
                        {/* <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text> */}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" ref={PasswordRef}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasiccPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm Password" ref={ConfirmPassRef}/>
                        {/* <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text> */}
                    </Form.Group>
                    <div className='container'>
                        <Button variant="primary" className='form-control' type="submit">
                            Signup
                        </Button>
                    </div>
                    </Form> 
                </CardBody>
                </Card>
                    
                <Card className='mt-3'>
                    <CardBody className='text-center'>
                    Have an account ? login
                    </CardBody>
                </Card>
                
            </Row>
    </section>
  )
}

export default Signup;
