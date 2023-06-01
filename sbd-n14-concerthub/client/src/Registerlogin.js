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
        <h1>Login</h1>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />

        <div className="loginbutton" onClick={popup}>Login</div>

        <p className = "or-text">didn't have account?</p>
        <h1>Register</h1>
        <input type="text" placeholder="Username" />
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <input type="int" placeholder="Phone Number" />
        
        <div className="form_select">  
        <Form.Select  aria-label="jenis akun" >
          <option>Jenis akun</option>
          <option value="normal">Normal</option>
          <option value="privilege">Privilege</option>
        </Form.Select>
        </div>

        <div className="registerbutton" onClick={() => navigate('/MainPage')}>Register</div>

        <div className={popupStyle}>
          <h3>Login Failed</h3>
          <p>Username or Password incorrect</p>
        </div>
        
      </div>
      </div>
    )
  }
  
  export default Registerlogin