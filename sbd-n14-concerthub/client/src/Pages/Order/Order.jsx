import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import { useParams, useNavigate } from "react-router-dom";
import "./Order.css";
import rex from '../../assets/rsz_rex_big.jpg';
import Coldplay from '../../assets/Coldplay.png';
import Bruno from '../../assets/Bruno.jpeg';
import Westlife from '../../assets/rsz_weslife_big.jpg';

const Order = () => {
  const { konserId } = useParams();
  const navigate = useNavigate();
  const [concert, setConcert] = useState(null);
  const [accommodation, setAccommodation] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  useEffect(() => {
    fetchConcert();
  }, [konserId]);

  const isConcert = (data) => {
    return data.konser_id.toString() === konserId;
  };

  const fetchConcert = async () => {
    try {
      const response = await fetch('http://localhost:4000/getkonser');
      if (!response.ok) {
        throw new Error('Failed to fetch concert data');
      }
      const data = await response.json();
      const index = data.findIndex(isConcert);

      setConcert(data[index]);
      console.log(data[index]); // Process the data as needed
    } catch (error) {
      console.error('Error:', error);
    }
  };

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

    const totalPayment = concert.harga_tiket + harga_akomodasi;
    let discountedPayment = totalPayment;

    if (paymentMethod === 'GOPAY') {
      discountedPayment = totalPayment * 0.9; // 10% discount for GOPAY
    }

    const orderData = {
      nama_pemesan: username,
      no_telpon: phoneNumber,
      email,
      jenis_accomodation: accommodation,
      jumlah_payment: discountedPayment,
      metode_pembayaran: paymentMethod
    };

    console.log(orderData);
    // Rest of the code remains the same
  };

  const handleAccommodationChange = (event) => {
    setAccommodation(event.target.value);
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  if (!concert) {
    return <div>Loading...</div>;
  }

  const getImageByKonserId = (konserId) => {
    const imageMap = {
      1: Coldplay,
      2: Bruno,
      3: rex,
      4: Westlife
    };

    return imageMap[konserId] || rex;
  };

  const konserImage = getImageByKonserId(concert.konser_id);

  return (
    <div className="KonserPage">
      <div className="KonserImage">
        <img src={konserImage} alt="Concert" className="gmbr" />
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
        </div>
        <div className="PaymentMethod">
          <Form.Select id="paymentMethod" aria-label="PaymentMethod" onChange={handlePaymentMethodChange}>
            <option>Payment Method</option>
            <option value="GOPAY">GOPAY</option>
            <option value="BCA">BCA</option>
          </Form.Select>
        </div>
        <div className="Price">
          <p>Ticket Price: {concert.harga_tiket} IDR</p>
          <p>Accomodation Price: {accommodation === "Hotel" ? "400,000" : accommodation === "Vila" ? "600,000" : "0"} IDR</p>
          <p>Payment Total: {paymentMethod === 'GOPAY' ? concert.harga_tiket * 0.9 : concert.harga_tiket} IDR</p>
        </div>
        <div className="PayButton" onClick={handlePay}>
          Submit Payment
        </div>
      </div>
    </div>
  );
};

export default Order;
