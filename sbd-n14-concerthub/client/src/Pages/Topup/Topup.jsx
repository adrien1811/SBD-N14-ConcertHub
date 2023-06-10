import React, { useState, useEffect } from 'react';
import './Topup.css';
import Logo from '../../assets/Group1.png';
import Form from 'react-bootstrap/Form';

const TopUp = () => {
  const [amount, setAmount] = useState('');
  const [selectedBalance, setSelectedBalance] = useState('');
  const [gopayBalance, setGopayBalance] = useState(0);
  const [bcaBalance, setBcaBalance] = useState(0);

  useEffect(() => {
    fetch('http://localhost:4000/user/balance', { credentials: 'include' })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        setGopayBalance(data.gopayBalance);
        setBcaBalance(data.bcaBalance);
      })
      .catch(error => {
        console.log('Error occurred during fetch:', error);
      });
  }, []);

  const handleTopup = () => {
    // Check if the amount and selectedBalance are not empty
    if (amount && selectedBalance) {
      // Make the HTTP request to the backend API based on the selected balance
      if (selectedBalance === 'Gopay') {
        topUpBalance('TopUpGOPAY');
      } else if (selectedBalance === 'BCA') {
        topUpBalance('TopUpBCA');
      }
    }
  };

  const topUpBalance = async (endpoint) => {
    try {
      const response = await fetch(`http://localhost:4000/user/${endpoint}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topUpAmount: parseInt(amount) }),
      });

      // Handle the response from the backend
      if (response.ok) {
        const data = await response.json();
        // Display a success message and update the balance in the frontend
        console.log(data.message);
        console.log('New balance:', data.newBalance);
        setGopayBalance(data.newGopayBalance);
        setBcaBalance(data.newBcaBalance);
      } else {
        // Handle the error from the backend
        const errorData = await response.json();
        console.error(errorData.error);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className="TopUpPage">
      <div className="background">
        <div className="logo-container">
          <img className="logo-img" src={Logo} alt="logo" />
        </div>
        <div className="Infocover">
          <div className="heading1">
            <h1>Balance Information</h1>
          </div>
          <div className="Balance">
            <p>Balance Gopay: Rp. {gopayBalance}</p>
            <p>Balance BCA: Rp. {bcaBalance}</p>
          </div>
          <div className="heading2">
            <h1>Top Up Now!</h1>
          </div>
          <div className="Topup">
            <input type="text" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} required />
          </div>
          <div className="Dropdown">
            <Form.Select aria-label="Dropdown" value={selectedBalance} onChange={e => setSelectedBalance(e.target.value)}>
              <option>Select Balance</option>
              <option value="Gopay">Gopay</option>
              <option value="BCA">BCA</option>
            </Form.Select>
          </div>
          <div className="TopupButton" onClick={handleTopup}>
            Top Up
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopUp;
