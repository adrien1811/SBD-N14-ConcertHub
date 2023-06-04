import React from 'react';
import './Konser.css';
import Coldplay from '../../assets/Coldplay.png'
import { useNavigate } from "react-router-dom";

const Konser = () => {
    const navigate = useNavigate();
    const handleBuyNow = () => {

    };
    const HandleViewProfile = () => {
    };

    
    return (
      <div className="KonserPage">
       <div className="Gambar">
        <img src={Coldplay} alt="Coldplay" />
      </div>
      <div className="KonserInfoCard">
      <div className="ViewProfileButton" onClick={() => navigate('/profile/rian')}>View Performer</div>
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
      <div className="BuyNowButton" onClick={() => navigate('/order')}>Reserve Now</div>
      </div>
      <div className="Description">
      <h1>Description</h1>
      <p> Jakarta, 9 May 2023 - Coldplay have announced their hugely-anticipated return to Asia and Australia with a special run of stadium shows in November 2023, as part of their record-breaking Music Of The Spheres World Tour. The announcement marks the band’s first ever show in Jakarta, taking place on 15 November at Gelora Bung Karno Stadium.

 

Since the tour’s first date in March 2022, the band have sold more tickets than any other artist in the world, receiving rave reviews from fans and critics alike and picking up accolades including Favorite Touring Artist at the 2022 AMAs and Tour of The Year at the 2023 iHeartRadio Awards.

 

The dates feature Coldplay’s first Tokyo shows since 2017, their first ever dates in Kaohsiung, Jakarta and Kuala Lumpur and a special one-off performance in Perth, their first in Western Australia since 2009.

</p>
      </div>
      </div>
    );
  };
  
  export default Konser;
  