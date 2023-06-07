import React, { useState, useEffect } from 'react';
import './Konser.css';
import { useNavigate, useParams } from 'react-router-dom';

const Konser = () => {
  const { konserId } = useParams();
  const [concert, setConcert] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchConcert();
  }, []);

  const fetchConcert = async () => {
    try {
      const response = await fetch(`http://localhost:4000/konser/${konserId}`);
      const data = await response.json();
      setConcert(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleBuyNow = () => {
    // Handle buy now functionality
  };

  const handleViewProfile = () => {
    // Handle view profile functionality
  };

  if (!concert) {
    return <div>Loading...</div>;
  }

  return (
    <div className="KonserPage">
      <div className="Gambar">
        <img src={concert.image} alt={concert.nama_konser} />
      </div>
      <div className="KonserInfoCard">
        <div className="ViewProfileButton" onClick={handleViewProfile}>
          View Performer
        </div>
        <h1>Details</h1>
        <div className="details">
          <p>Performer: {concert.nama_konser}</p>
          <p>City: {concert.kota_perform}</p>
          <p>Venue: {concert.venue}</p>
          <p>Date: {concert.tanggal_perform}</p>
        </div>
      </div>
      <div className="BuyCard">
        <p>Only {concert.harga_tiket} idr!</p>
        <div className="BuyNowButton" onClick={handleBuyNow}>
          Reserve Now
        </div>
      </div>
      <div className="Description">
        <h1>Description</h1>
        <p>{concert.deskripsi}</p>
      </div>
    </div>
  );
};

export default Konser;
