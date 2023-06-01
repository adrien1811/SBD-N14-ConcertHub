import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import "./Registerlogin.css"
import Navibar from "./components/Navibar";

const Registerlogin = () => {
  const navigate = useNavigate()

    const [popupStyle, showpopup] = useState("hide")

    const popup = () => {
        showpopup("login-popup")
        setTimeout(() => showpopup("hide"), 3000)
    }

    return (
      <div className="page">
      <div className="logincover">
        <h1>Log to Account</h1>
        <input type="text" placeholder="Username" required />
        <input type="password" placeholder="Password" required />

        <div className="loginbutton" onClick={popup}>Login</div>

        <p className = "or-text">didn't have account?</p>
        <h2>Sign Up</h2>
        <input type="text" placeholder="Username" required />
        <input type="text" placeholder="Email" required/>
        <input type="password" placeholder="Password" required/>
        <input type="int" placeholder="Phone Number" required/>
        
        <div className="form_select">  
        <Form.Select  aria-label="jenis akun" >
          <option>User Type</option>
          <option value="normal">Normal</option>
          <option value="privilege">Privilege</option>
        </Form.Select>
        </div>

        <div className="registerbutton" onClick={() => navigate('/')}>Register</div>

        <div className={popupStyle}>
          <h3>Login Failed</h3>
          <p>Username or Password incorrect</p>
        </div>
        
      </div>
      </div>
    )
  }
  
  export default Registerlogin