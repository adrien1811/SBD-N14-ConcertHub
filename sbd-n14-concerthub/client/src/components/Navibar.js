import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';


const Navibar = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const cookies = new Cookies();
        const userId = cookies.get('userId');
  
        if (userId) {
          const response = await fetch(`http://localhost:4000/dashboard/${userId}`, {
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            }
          });
  
          if (response.ok) {
            const data = await response.json();
            const username = data.username;
  
            // Handle user data
            console.log('Username:', username);
          } else {
            // Handle error
            console.error('Error retrieving user data.');
          }
        }
      } catch (error) {
        // Handle any network or server errors
        console.error('An error occurred:', error);
      }
    };
  
    fetchSessionData();
  }, []);
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:4000/logout', { credentials: 'include' });
      if (response.ok) {
        setUsername('');
      } else {
        throw new Error('Logout failed');
      }
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
            <Nav.Link href="/userprofile">tombol Profile sementara</Nav.Link>
          </Nav>
          <Nav>
            {username ? (
              <>
                <p>Hello, {username}</p>
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
