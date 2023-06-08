import React, { useState, useEffect } from 'react';
import './bids.css';
import { AiFillHeart } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import rex from '../../assets/Rex.jpeg';
import Coldplay from '../../assets/Coldplay.png';
import Bruno from '../../assets/Bruno.jpeg';
import Westlife from '../../assets/weslife.jpeg';

const Bids = ({ title }) => {
  const [concerts, setConcerts] = useState([]);

  useEffect(() => {
    fetchConcerts();
  }, []);

  const fetchConcerts = async () => {
    try {
      const response = await fetch('http://localhost:4000/getkonser');
      const data = await response.json();
      setConcerts(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Mapping between konser_id and photo URLs
  const concertPhotos = {
    3: rex,
    1: Coldplay,
    2: Bruno,
    4: Westlife,
  };

  const getConcertPhoto = (konserId) => {
    return concertPhotos[konserId]; 
  };

  return (
    <div className="bids section__padding">
      <div className="bids-container">
        <div className="bids-container-text">
          <h1>{title}</h1>
        </div>
        
        <div className="bids-container-card">
          {concerts.map((concert) => (
            <div className="card-column" key={concert.konser_id}>
              <div className="bids-card">
                <div className="bids-card-top">
                  <img
                    src={getConcertPhoto(concert.konser_id)}
                    alt={`Concert ${concert.konser_id}`}
                  /> {/* Use the getConcertPhoto function to retrieve the appropriate photo URL */}
                  <Link to={`/konser/${concert.konser_id}`}>
                    <p className="bids-title">{concert.nama_konser}</p>
                  </Link>
                </div>
                <div className="bids-card-bottom">
                  <p>
                    {concert.kapasitas_privilege === 0
                      ? 'Unlimited seats'
                      : 'Limited seats'}
                  </p>
                  <p>
                    <AiFillHeart /> {concert.rating}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bids;