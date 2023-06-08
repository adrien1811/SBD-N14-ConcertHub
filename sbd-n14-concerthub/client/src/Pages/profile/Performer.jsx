import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './Performer.css'
import profile_banner from '../../assets/profile_banner.png'
import profile_pic from '../../assets/profile.jpg'

import seller1 from '../../assets/coldplays.jpg'
import seller2 from '../../assets/bruno.jpg'
import seller3 from '../../assets/rexorange.jpg'
import seller4 from '../../assets/westlife.jpg'

const Performer = () => {
  const { id } = useParams(); // Access the parameter from the URL
  const [performer, setPerformer] = useState([]);

  function isPerformer(data) {
    return data.performer_id.toString() === id;
  }

  useEffect(() => {
    getperformer();
  },[id]);

  const performerPhotos = {
    1: seller1,
    2: seller2,
    3: seller3,
    4: seller4,
  };

  const getPerformertPhoto = (id) => {
    return performerPhotos[id]; 
  };

  const getperformer = async () => {
    try {
      const response = await fetch('http://localhost:4000/getperformer');
      if (!response.ok) {
        throw new Error('Failed to fetch performer data');
      }
      const data = await response.json();
      const index = data.findIndex(isPerformer);
      setPerformer(data[index]);
      console.log(data[index]); // Process the data as needed
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <div className='profile section__padding' >
      <div className="profile-top">
        <div className="profile-banner">
          <img src={profile_banner} alt="banner" />
        </div>
        <div className="profile-pic">
            <img src={getPerformertPhoto(id)} alt="profile" />
            <h3>{performer.nama_performer}</h3>
        </div>
      </div>
      <div className="profile-bottom">
        <p className="Description">
        {performer.deskripsi}
        </p>
      </div>
    </div>
  );
};

export default Performer;
