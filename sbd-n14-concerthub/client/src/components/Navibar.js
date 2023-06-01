import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";

const Menu = () => (
  <>
     <Link to="/"><p>Explore</p> </Link>
     <p>My Items</p>
    
  </>
 )

const Navibar = () => {

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">
            <img
              alt=""
              src="../concerlogo.png"
              width="30"
              height=""
              scale
              className="d-inline-block align-top"
            />{' '}
            ConcertHub
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/RegisterLogin">Login/Register</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Navibar;