import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import "./Order.css";
import Coldplay from '../../assets/Coldplay.png'


const Order = () => {
    const navigate = useNavigate();
    const handleBuyNow = () => {

    };
    const HandleViewProfile = () => {
    };
    const handlePay = () => {

    };

    
    return (
        <div className="KonserPage">
            <div className="Coldplay">
                <img src={Coldplay} alt="Coldplay" />
            </div>
            <div className="Cover">
            <div className="heading1">
            <h1>Order Ticket</h1>
          </div>
            <div className="Username">
          <input type="text" placeholder="Username" required />
          </div>
          <div className="PhoneNumber">
            <input type="int" placeholder="Phone Number" required />
            </div>
            <div className="Email">
            <input type="text" placeholder="Email" required />
            </div>
            <div className="Accomodation">
            <Form.Select aria-label="Accomodation">
                <option>Accomodation</option>
                <option value="Hotel">Hotel</option>
                <option value="Vila">Vila</option>
              </Form.Select>
              <div className="Price">
           <p>Ticket Price : 500.000 idr</p>
           <p>Vila Price   : 400.000</p>
           <p>Payment Total   : 900.000</p>
        </div>
          </div>
          <div className="PayButton" onClick={handlePay}>
              Submit Payment
            </div>
            </div>
    </div>
    );
  };
  
  export default Order;