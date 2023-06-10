import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";

const Navibar = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    fetchSessionData();
  }, []);

  const fetchSessionData = async () => {
    try {
      const response = await fetch('http://localhost:4000/dashboard', { credentials: 'include' });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (data && data.username) {
        setUsername(data.username);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:4000/logout', { credentials: 'include' });
      if (!response.ok) {
        throw new Error('Logout failed');
      }
      setUsername('');
    } catch (error) {
      console.log(error);
    }
  };

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
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
          </Nav>
          <Nav>
            {username ? (
              <>
                <Nav.Link href="/userprofile">{username}</Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            ) : (
              <Nav.Link href="/RegisterLogin">Login/Register</Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Navibar;
