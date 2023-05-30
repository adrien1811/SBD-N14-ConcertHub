import React, { useState } from "react";

const MainPage = () => {

    const [popupStyle, showpopup] = useState("hide")

    const popup = () => {
        showpopup("login-popup")
        setTimeout(() => showpopup("hide"), 3000)
    }

    return (
      halo
    )
  }
  
  export default MainPage