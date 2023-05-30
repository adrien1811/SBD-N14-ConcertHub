import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Navibar() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
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
        </Container>
      </Navbar>
    </>
  );
}

export default Navibar;