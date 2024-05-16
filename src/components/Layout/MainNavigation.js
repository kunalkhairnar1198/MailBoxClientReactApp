import React from 'react'
import { Container, Navbar} from 'react-bootstrap'
const MainNavigation = () => {
  return (
    <>
        <Navbar expand='lg' bg="dark" variant="dark">
            <Container>
              <Navbar.Brand href="/">Welcome to MailBox</Navbar.Brand>
            </Container>
        </Navbar>
    </>
  )
}

export default MainNavigation
