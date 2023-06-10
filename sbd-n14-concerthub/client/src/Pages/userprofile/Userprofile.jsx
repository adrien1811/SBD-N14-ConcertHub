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
        setUser(data);
      })
      .catch(error => {
        console.log('Error occurred during fetch:', error);
      });
  }, []);

  return (
    <div className="item section__padding">
      <div className="History_Header">
        <h1>History</h1>
        <div className="item-image">
          <ListGroup as="ol" numbered>
            <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Subheading</div>
                Cras justo odio
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Subheading</div>
                Cras justo odio
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Subheading</div>
                Cras justo odio
              </div>
            </ListGroup.Item>
          </ListGroup>
        </div>
      </div>
      <div className="item-content">
        <div className="item-content-title">
          <h1>Profile</h1>
        </div>
        {user && (
          <div className="item-content-detail">
            <h4>Name: {user.username}</h4>
            <h4>Email: {user.email}</h4>
            <h4>Phonenumber: {user.no_telpon}</h4>
            <h4>Gopay Balance: {user.balance_GOPAY}</h4>
            <h4>BCA Balance: {user.balance_BCA}</h4>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book
            </p>
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
