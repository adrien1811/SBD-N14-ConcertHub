import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import "./Registerlogin.css"

const Registerlogin = () => {

    const [popupStyle, showpopup] = useState("hide")

    const popup = () => {
        showpopup("login-popup")
        setTimeout(() => showpopup("hide"), 3000)
    }

    return (
      <div className="logincover">
        <h1>Login</h1>
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="password" />

        <div className="loginbutton" onClick={popup}>Login</div>

        <p className = "or-text">didn't have account?</p>
        <h1>Register</h1>
        <input type="text" placeholder="username" />
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="password" />
        <input type="int" placeholder="nomor telepon" />
        
        <div className="form_select">  
        <Form.Select  aria-label="jenis akun" >
          <option>Jenis akun</option>
          <option value="normal">Normal</option>
          <option value="privilege">Privilege</option>
        </Form.Select>
        </div>

        <div className="registerbutton">Register</div>

        <div className={popupStyle}>
          <h3>Login Failed</h3>
          <p>Username or Password incorrect</p>
        </div>
        
      </div>
    )
  }
  
  export default Registerlogin