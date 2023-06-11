import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import "./Order.css";
import rex from '../../assets/rsz_rex_big.jpg';
import Coldplay from '../../assets/Coldplay.png';
import Bruno from '../../assets/Bruno.jpeg';
import Westlife from '../../assets/rsz_weslife_big.jpg';

const Order = () => {
  const navigate = useNavigate();
  const { konserId } = useParams();
  const [concert, setConcert] = useState(null);
  const [accommodation, setAccommodation] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchConcert();
    fetchUser();
  }, [konserId]);

  const isConcert = (data) => {
    return data.konser_id.toString() === konserId;
  };

  const fetchUser = () => {
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

  const handlePay = async () => {
    const username = document.getElementById("username").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const email = document.getElementById("email").value;

    let harga_akomodasi = 0;
    if (accommodation === "hotel") {
      harga_akomodasi = 400000;
    } else if (accommodation === "vila") {
      harga_akomodasi = 600000;
    }

    let totalPayment = concert.harga_tiket + harga_akomodasi;

    if (paymentMethod === "GOPAY") {
      totalPayment *= 0.9; // Apply 10% discount for GOPAY
    }

    const orderData = {
      nama_pemesan: username,
      no_telpon: phoneNumber,
      email,
      jenis_accomodation: accommodation,
      harga_akomodasi,
      metode_pembayaran: paymentMethod
    };

    try {
      const response = await fetch(`http://localhost:4000/konser/${konserId}/order`, {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const data = await response.json();
        // Handle successful payment
        // For example, navigate to a different page or show a success message
        console.log('Payment successful!');
        console.log('Order ID:', data.order_id);
        console.log('Total Payment:', data.Total_payment);
        setShowSuccessModal(true);
        navigate('/');
      } else {
        // Handle payment error
        // For example, display an error message to the user
        console.error('Payment failed.');
        setShowFailureModal(true);
      }
    } catch (error) {
      // Handle any network or server errors
      console.error('An error occurred during payment:', error);
    }
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

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    navigate('/');
  };

  const handleCloseFailureModal = () => {
    setShowFailureModal(false);
  };

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

        {user && user.status_user !== "normal" && (
          <div className="Accomodation">
            <Form.Select id="accommodation" aria-label="Accommodation" onChange={handleAccommodationChange}>
              <option>Accommodation</option>
              <option value="hotel">hotel</option>
              <option value="vila">vila</option>
            </Form.Select>
          </div>
        )}

        <div className="PaymentMethod">
          <Form.Select id="PaymentMethod" aria-label="PaymentMethod" onChange={handlePaymentMethodChange}>
            <option>Payment Method</option>
            <option value="GOPAY">GOPAY</option>
            <option value="BCA">BCA</option>
          </Form.Select>
        </div>
        <div className="Price">
          <p>Ticket Price: {concert.harga_tiket} IDR</p>
          <p>Accommodation Price: {accommodation === "hotel" ? "400,000" : accommodation === "vila" ? "600,000" : "0"} IDR</p>
          <p>
            Payment Total: {paymentMethod === "GOPAY"
              ? (concert.harga_tiket + (accommodation === "hotel" ? 400000 : accommodation === "vila" ? 600000 : 0)) * 0.9
              : concert.harga_tiket + (accommodation === "hotel" ? 400000 : accommodation === "vila" ? 600000 : 0)
            } IDR
          </p>
        </div>
        <div className="PayButton" onClick={handlePay}>
          Submit Payment
        </div>
      </div>
      <Modal show={showSuccessModal} onHide={handleCloseSuccessModal}>
        <Modal.Header closeButton>
          <Modal.Title>Payment Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Payment was successful!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseSuccessModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showFailureModal} onHide={handleCloseFailureModal}>
        <Modal.Header closeButton>
          <Modal.Title>Payment Failed</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Payment failed. Please try again.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseFailureModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Order;
