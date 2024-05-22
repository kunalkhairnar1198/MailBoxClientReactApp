import React, { useRef, useState } from 'react'
import {Button, Card, CardBody, Col, Form, Nav, NavLink, Row, Spinner} from 'react-bootstrap';
import classes from './Signup.module.css';   
import {useDispatch, useSelector}  from 'react-redux'
import { LoaderActions } from '../../../Store/UI-Slice/loader-slice';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { AuthActions } from '../../../Store/Auth-Slice/auth-slice';

const Signup = () => {
    
    const EmailRef = useRef()
    const PasswordRef = useRef()
    const ConfirmPassRef = useRef()
    const [islogin, setIsLogin] = useState(false)
    const isLoader = useSelector(state => state.loader.isVisible)
    const dispatch = useDispatch()
    const history = useHistory()

    const switchHandler =()=>{
        setIsLogin(prevState => !prevState)
    }

    const SubmitHandler = async (event) => {
            event.preventDefault()

            const email = EmailRef.current.value;
            const password = PasswordRef.current.value;

        if(islogin){
            const confirmPassword = ConfirmPassRef.current.value;

            if (password !== confirmPassword) {
                console.error('Passwords do not match');
                return;
            }
        }
            // console.log(email, password, confirmPassword)
        
            dispatch(LoaderActions.isLoadingData())

        let url =''

        if(!islogin){

            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC7hFWT415CG0qrbxEA-rWcjlUwQQptWL4';

        }else{

            url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC7hFWT415CG0qrbxEA-rWcjlUwQQptWL4'
        
        }

        try {
            const response = await fetch(url,{
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
                dispatch(LoaderActions.stopIsloading())
                dispatch(AuthActions.loginHandler(data.idToken))
                localStorage.setItem('email', data.email)
                history.replace('/mainnavigation')

            }else{
                const errorData = await response.json()
                throw new Error(errorData || 'Authentication Failed')
            }

        } catch (error) {
            console.log('Authentication failed', error.message)
            alert('Authentication failed')
            dispatch(LoaderActions.stopIsloading())
        }
    }

  return (
    <> <h1 className='text-7xl text-center'>MailBox Client </h1>
    <section className='d-flex align-item-center justify-content-center mt-5 '>
            <Row>
                <Col className={classes.col}>  
                    <Card className={classes.card}>
                        <CardBody>
                                <Card.Title className='text-center'>{islogin ? 'SignUp' : 'SignIn'}</Card.Title>
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

                            {islogin && <Form.Group className="mb-3" controlId="formBasiccPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" placeholder="Confirm Password" ref={ConfirmPassRef}/>
                                {/* <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                                </Form.Text> */}
                            </Form.Group>}
                            <div className='container'>
                                <Button variant="primary" className='form-control rounded-5' type="submit">
                                {isLoader ? <Spinner /> : (islogin ? 'Signup' : 'Signin')}
                                </Button>
                            </div>

                            <Nav className='mt-3'>
                                <Nav.Link as={NavLink}  className='w-100 text-center'>
                                   {!islogin ? 'Forgot password':''}
                                </Nav.Link>
                            </Nav>
                            </Form> 
                        </CardBody>
                    </Card>
                    <div className='mt-3'>
                        <Card className={classes.card}>

                            <Nav>
                                <Nav.Link as={NavLink} onClick={switchHandler} className='w-100 text-center'>
                                   {islogin ? `Have an account ? login` : `Don't have an account ? Register`}
                                </Nav.Link>
                            </Nav>
                
                        </Card>
                    </div>    
                </Col>
                
            </Row>
    </section>
    </>
  )
}

export default Signup;
