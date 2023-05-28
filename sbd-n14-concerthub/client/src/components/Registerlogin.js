import React, { useState } from "react";
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

        <div className="registerbutton">Register</div>

        <div className={popupStyle}>
          <h3>Login Failed</h3>
          <p>Username or Password incorrect</p>
        </div>
        
      </div>
    )
  }
  
  export default Registerlogin