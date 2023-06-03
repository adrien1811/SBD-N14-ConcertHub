import React from 'react';
import './userprofile.css'
import { useNavigate } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup';

const Userprofile = () => {
  const navigate = useNavigate();


  return( 
      <div className='item section__padding'>
        <div className='History_Header'>
          <h1>History</h1>

        <div className="item-image">
        <ListGroup as="ol" numbered>
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start">
        <div className="ms-2 me-auto">
          <div className="fw-bold">Subheading</div>
          Cras justo odio
        </div>
      </ListGroup.Item>
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start">
        <div className="ms-2 me-auto">
          <div className="fw-bold">Subheading</div>
          Cras justo odio
        </div>
      </ListGroup.Item>
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start">
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
            <div className="item-content-detail">
              <h4>Name:</h4>
              <h4>Email:</h4>
              <h4>Phonenumber:</h4>
              <h4>Gopay Balance:</h4>
              <h4>BCA Balance:</h4>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
            </div>
            <div className="item-content-buy">
              <button className="primary-btn" onClick={() => navigate('/Topup')}>Topup Now</button>
            </div>
          </div>
      </div>
  )
};

export default Userprofile;
