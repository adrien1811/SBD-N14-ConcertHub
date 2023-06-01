import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import "./Registerlogin.css";
import logo from './Group1.png'
import Navibar from "./components/Navibar";

const Registerlogin = () => {
  const navigate = useNavigate();
  const [popupStyle, showPopup] = useState("hide");
  const [registerVisible, setRegisterVisible] = useState(false);
  const [registerFinished, setRegisterFinished] = useState(false);

  const popup = () => {
    showPopup("login-popup");
    setTimeout(() => showPopup("hide"), 3000);
  };

  const toggleRegisterVisibility = () => {
    setRegisterVisible(!registerVisible);
  };

  const handleRegister = () => {
    // Perform registration logic
    // ...

    // Reset the register fields and show login fields
    setRegisterFinished(true);
    setRegisterVisible(false);
  };

  return (
    <div className="page">
      <div className="logo">
        <img src={logo} alt="Concert Logo" />
      </div>
      <div className="logincover">
        {!registerVisible && !registerFinished && (
          <>
            <h1>Log into Account</h1>
            <input type="text" placeholder="Username" required />
            <input type="password" placeholder="Password" required />
            <div className="loginbutton" onClick={popup}>Login</div>
          </>
        )}

        {!registerVisible && !registerFinished && (
          <p className="or-text" onClick={toggleRegisterVisibility}>
            Don't have an account?
          </p>
        )}

        {registerVisible && !registerFinished && (
          <>
          <div className="registercover">
            <h2 className="register-title">Sign Up</h2>
            <input type="text" placeholder="Username" required />
            <input type="text" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <input type="int" placeholder="Phone Number" required />
            <div className="form_select">
              <Form.Select aria-label="jenis akun">
                <option>User Type</option>
                <option value="normal">Normal</option>
                <option value="privilege">Privilege</option>
              </Form.Select>
            </div>
            <div className="registerbutton" onClick={handleRegister}>
              Register
            </div>
            </div>
          </>
        )}

        {registerFinished && (
          <>
            <h1>Log into Account</h1>
            <input type="text" placeholder="Username" required />
            <input type="password" placeholder="Password" required />
            <div className="loginbutton" onClick={popup}>Login</div>
          </>
        )}

        <div className={popupStyle}>
          <h3>Login Failed</h3>
          <p>Username or Password incorrect</p>
        </div>
      </div>
    </div>
  );
}

export default Registerlogin;
