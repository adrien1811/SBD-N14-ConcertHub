import React, { useState, useEffect } from 'react';
import './userprofile.css';
import { useNavigate } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';

const Userprofile = (props) => {
  const userId = props.userId;
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/user', { credentials: 'include' })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Response data:', data); // Log the response data received from the backend
        setUser(data);
      })
      .catch(error => {
        console.log('Error occurred during fetch:', error);
      });
  }, []);

  return (
    <div className="item section__padding">
      <div className="item-content">
        <div className="item-content-title">
          <h1>Profile</h1>
        </div>
        {user && (
          <div className="item-content-detail">
            <h4>User Status: {user.status_user}</h4>
            <h4>Name: {user.username}</h4>
            <h4>Email: {user.email}</h4>
            <h4>Phonenumber: {user.no_telpon}</h4>
            <h4>Gopay Balance: {user.balance_gopay}</h4>
            <h4>BCA Balance: {user.balance_bca}</h4>
          </div>
        )}
        <div className="item-content-buy">
          <button className="primary-btn" onClick={() => navigate('/Topup')}>
            Topup Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Userprofile;
