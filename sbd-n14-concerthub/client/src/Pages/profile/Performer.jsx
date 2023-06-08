import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './Performer.css'
import profile_banner from '../../assets/profile_banner.png'
import profile_pic from '../../assets/profile.jpg'

const Performer = () => {
  const { id } = useParams(); // Access the parameter from the URL
  const [performer, setPerformer] = useState([]);

  useEffect(() => {
    getperformer();
  },[id]);

  const getperformer = async () => {
    try {
      const response = await fetch('http://localhost:4000/getperformer');
      if (!response.ok) {
        throw new Error('Failed to fetch performer data');
      }
      const data = await response.json();
      setPerformer(data[id-2]);
      console.log(data[id]); // Process the data as needed
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
            <img src={profile_pic} alt="profile" />
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
