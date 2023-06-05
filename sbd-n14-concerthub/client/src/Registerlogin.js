import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import "./Registerlogin.css";
import logo from './Group1.png'


const Registerlogin = () => {
  const navigate = useNavigate();
  const [popupStyle, showPopup] = useState("hide");
  const [registerVisible, setRegisterVisible] = useState(false);
  const [registerFinished, setRegisterFinished] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userType, setUserType] = useState("");

  const popup = () => {
    showPopup("login-popup");
    setTimeout(() => showPopup("hide"), 3000);
  };

  const toggleRegisterVisibility = () => {
    setRegisterVisible(!registerVisible);
  };

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:4000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status_user: userType,
          username,
          password,
          email,
          no_telpon: phoneNumber,
          balance_BCA: 0, // You can set initial balance values here
          balance_GOPAY: 0
        })
      });

      if (response.ok) {
        const data = await response.json();
        const insertedUserId = data.user_id;
        // Handle successful registration
        // For example, navigate to a different page or show a success message
        console.log('Registration successful!');
        console.log('User ID:', insertedUserId);
        setRegisterFinished(true);
        setRegisterVisible(false);
      } else {
        // Handle registration error
        // For example, display an error message to the user
        console.error('Registration failed.');
      }
    } catch (error) {
      // Handle any network or server errors
      console.error('An error occurred during registration:', error);
    }
  };
  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password
        })
      });

      if (response.ok) {
        const data = await response.json();
        const userId = data.user_id;
        // Handle successful login
        // For example, navigate to a different page or show a success message
        console.log('Login successful!');
        console.log('User ID:', userId);
        navigate('/');
      } else {
        // Handle login error
        // For example, display an error message to the user
        showPopup("login-popup");
        setTimeout(() => showPopup("hide"), 3000);
        console.error('Login failed.');
      }
    } catch (error) {
      // Handle any network or server errors
      console.error('An error occurred during login:', error);
    }
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
            <input type="text" placeholder="Username" required value={username} onChange={e => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)} />
            <div className="loginbutton" onClick={handleLogin}>Login</div>
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
            <input type="text" placeholder="Username" required value={username} onChange={e => setUsername(e.target.value)} />
            <input type="text" placeholder="Email" required value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)} />
            <input type="int" placeholder="Phone Number" required value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
            <div className="form_select">
              <Form.Select aria-label="jenis akun" value={userType} onChange={e => setUserType(e.target.value)}>
                <option>User Type</option>
                <option value="normal">Normal</option>
                <option value="privillege">Privillege</option>
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
            <input type="text" placeholder="Username" required value={username} onChange={e => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)} />
            <div className="loginbutton" onClick={handleLogin}>Login</div>
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
