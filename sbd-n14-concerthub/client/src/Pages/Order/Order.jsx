import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import "./Order.css";
import Coldplay from '../../assets/Coldplay.png';

const Order = () => {
  const navigate = useNavigate();
  const [accommodation, setAccommodation] = useState("");

  const handlePay = () => {
    const username = document.getElementById('username').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const email = document.getElementById('email').value;

    let harga_akomodasi = 0;
    if (accommodation === 'Hotel') {
      harga_akomodasi = 400000;
    } else if (accommodation === 'Vila') {
      harga_akomodasi = 600000;
    }

    const totalPayment = 500000 + harga_akomodasi;

    const orderData = {
      nama_pemesan: username,
      no_telpon: phoneNumber,
      email,
      jenis_accomodation: accommodation,
      jumlah_payment: totalPayment,
      metode_pembayaran: 'GOPAY' // Update with the selected payment method
    };

    // Rest of the code remains the same
  };

  const handleAccommodationChange = (event) => {
    setAccommodation(event.target.value);
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
          <input id="username" type="text" placeholder="Username" required />
        </div>
        <div className="PhoneNumber">
          <input id="phoneNumber" type="number" placeholder="Phone Number" required />
        </div>
        <div className="Email">
          <input id="email" type="email" placeholder="Email" required />
        </div>
        <div className="Accomodation">
          <Form.Select id="accommodation" aria-label="Accomodation" onChange={handleAccommodationChange}>
            <option>Accomodation</option>
            <option value="Hotel">Hotel</option>
            <option value="Vila">Vila</option>
          </Form.Select>
          <div className="Price">
            <p>Ticket Price: 500.000 idr</p>
            <p>Accomodation Price: {accommodation === "Hotel" ? "400.000" : accommodation === "Vila" ? "600.000" : "0"} idr</p>
            <p>Payment Total: {500000 + (accommodation === "Hotel" ? 400000 : accommodation === "Vila" ? 600000 : 0)} idr</p>
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
