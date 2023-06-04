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

    
    return (
        <div className="KonserPage">
            <div className="Gambar">
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
            </div>
    </div>
    );
  };
  
  export default Order;