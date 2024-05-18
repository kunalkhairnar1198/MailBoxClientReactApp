import React, { useRef, useState } from 'react'
import { Button,  Col,  Form, FormControl, InputGroup, Modal, ModalFooter, Row } from 'react-bootstrap';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import './Compose.css'

const Compose = () => {
    console.log('modal')
    const [show, setShow] = useState(false);
    const emailRef = useRef()
    const subjectRef = useRef()
    const [eidtorState, setEditorState] = useState(EditorState.createEmpty())   
    
    const onEditorStateChange = (newEditorState) => {
        setEditorState(newEditorState);
      };
    
    const sendEmailHandler = (e) =>{
        e.preventDefault()
        const mailid =  emailRef.current.value;
        const subject = subjectRef.current.value;
        const contentState = convertToRaw(eidtorState.getCurrentContent()).blocks[0].text
        console.log(mailid, subject, contentState)
    }
 
  return (
    <>
     <Button variant="light" onClick={() => setShow(true)}>
        Compose
      </Button>
             <Modal
                    size="xl"
                    show={show}
                    onHide={() => setShow(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                >
             <Modal.Header style={{height:'3rem', position:'relative'}} closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                    New Message
                </Modal.Title>
                </Modal.Header>
                <Form>
                <Modal.Body>
                   
                    <Row className="mb-2">
                        <Col xs={10} >
                            <InputGroup >
                                <InputGroup.Text style={{border:'none', boxShadow:'none', backgroundColor:'white'}}>To</InputGroup.Text>
                                <FormControl
                                    type="email"
                                    placeholder="someone@example.com"
                                    style={{border:'none', boxShadow:'none'}}
                                    ref={emailRef}
                                />
                            </InputGroup>
                        </Col>
                            <Col xs={2} className="d-flex align-items-end">
                                <button variant='link' className="btn" data-bs-toggle="button">Cc / Bcc</button>
                            </Col>
                            
                            <div>
                                <div  className='singline'></div>
                            </div>
                    </Row>
                    <Row>
                        <Col xs={10} >
                        <InputGroup >
                            <InputGroup.Text style={{border:'none', boxShadow:'none', backgroundColor:'white'}}>Subject</InputGroup.Text>
                            <FormControl
                                type="text"
                                placeholder="enter the subject"
                                style={{border:'none', boxShadow:'none'}}
                                ref={subjectRef}
                            />
                        </InputGroup>
                        </Col>
                        <div>
                            <div  className='singline'></div>
                        </div>
                    </Row> 
                    <div className="d-flex flex-column email-editor-container">
                        <Row className="flex-grow-1">
                            <Col className="mt-1 editor-col">
                            <Editor
                                        editorState={eidtorState}
                                        onEditorStateChange={onEditorStateChange}
                                        toolbarClassName="toolbarClassName"
                                        wrapperClassName="wrapperClassName"
                                        editorClassName="editorClassName"
                                    />
                            </Col>
                        </Row>
                           
                        </div>
                </Modal.Body >
                <ModalFooter style={{ height: '4rem', position: 'relative' }}>
                <Row className="w-100">
                    <Col className="d-flex justify-content-start align-items-center">
                    <Button variant="primary" className="me-2"  onClick={sendEmailHandler}>Send</Button>
                    <div className="d-flex">
                        <i className="bi bi-link-45deg text-gray-500 mx-1"></i>
                        <i className="bi bi-paperclip text-gray-500 mx-1"></i>
                        <i className="bi bi-emoji-smile text-gray-500 mx-1"></i>
                        <i className="bi bi-image text-gray-500 mx-1"></i>
                        <i className="bi bi-list-task text-gray-500 mx-1"></i>
                        <i className="bi bi-trash text-gray-500 mx-1"></i>
                    </div>
                    </Col>
                </Row>
                </ModalFooter>
                </Form>

        </Modal>

        </>
  )
}

export default Compose;
