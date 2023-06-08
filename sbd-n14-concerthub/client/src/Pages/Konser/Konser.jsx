import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './Konser.css';
import rex from '../../assets/rsz_rex_big.jpg';
import Coldplay from '../../assets/Coldplay.png';
import Bruno from '../../assets/Bruno.jpeg';
import Westlife from '../../assets/rsz_weslife_big.jpg';

const Konser = () => {
  const { konserId } = useParams();
  const [concert, setConcert] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchConcert();
  }, [konserId]);

  const isConcert = (data) => {
    return data.konser_id.toString() === konserId;
  };

  const fetchConcert = async () => {
    try {
      const response = await fetch('http://localhost:4000/getkonser');
      if (!response.ok) {
        throw new Error('Failed to fetch concert data');
      }
      const data = await response.json();
      const index = data.findIndex(isConcert);

      setConcert(data[index]);
      console.log(data[index]); // Process the data as needed
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!concert) {
    return <div>Loading...</div>;
  }

  const getImageByKonserId = (konserId) => {
    const imageMap = {
      3: rex,
      1: Coldplay,
      2: Bruno,
      4: Westlife,
    };

    return imageMap[konserId] || null;
  };

  const handleBuyNow = () => {
    navigate(`/order/${concert.konser_id}`);
    // Handle buy now functionality
  };

  const handleViewProfile = () => {
    navigate(`/performer/${concert.performer_id}`);
  };

  const konserImage = getImageByKonserId(concert.konser_id);

  return (
    <div className="KonserPage">
      <div className="Gambar">
        <img src={konserImage} alt={concert.nama_konser} />
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
        <p>Only {concert.harga_tiket} IDR!</p>
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
