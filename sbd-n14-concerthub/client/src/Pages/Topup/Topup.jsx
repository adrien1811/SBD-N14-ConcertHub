import React from 'react';
import './Topup.css';
import Logo from '../../assets/Group1.png';
import Form from 'react-bootstrap/Form';


const TopUp = () => {
  const handleTopup = () => {

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
