import React, { useState } from 'react';
import './Topup.css';
import Logo from '../../assets/Group1.png';
import Form from 'react-bootstrap/Form';


const TopUp = () => {
  const [amount, setAmount] = useState(''); // State for storing the top-up amount
  const [selectedBalance, setSelectedBalance] = useState(''); // State for storing the selected balance option

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
      // Make the HTTP request to the backend API
      const response = await fetch('http://localhost:4000/Topup', {
        method: 'PUT',
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
            <p>Balance Gopay : Rp. 100.000</p>
            <p>Balance BCA : Rp. 100.000</p>
        </div>
        <div className="heading2">
            <h1>Top Up Now!</h1>
          </div>
          <div className="Topup">
          <input type="text" placeholder="Amount" required />
          </div>
          <div className="Dropdown">
          <Form.Select aria-label="Dropdown">
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
