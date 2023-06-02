import React from 'react';
import './Konser.css';
import Coldplay from '../../assets/Coldplay.png'

const Konser = () => {
    const handleBuyNow = () => {

    };
    return (
      <div className="KonserPage">
       <div className="Gambar">
        <img src={Coldplay} alt="Coldplay" />
      </div>
      <div className="KonserInfoCard">
        <h1>Details</h1>
        <div className="details">
        <p>Performer : Coldplay</p>
        <p>City      : Jakarta</p>
        <p>Venue     : Gelora Bung Karno Stadium</p>
        <p>Date      : 15 November 2023</p>
        </div>
      </div>
      <div className="BuyCard">
      <p> Only 500.000 idr!</p>
      <div className="BuyNowButton" onClick={handleBuyNow}>
              Reserve Now!
            </div>
      </div>
      </div>
    );
  };
  
  export default Konser;
  