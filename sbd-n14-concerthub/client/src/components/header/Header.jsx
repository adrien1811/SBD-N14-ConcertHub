import React, { useState, useEffect } from 'react'
import './header.css'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import verify from '../../assets/verify.png'
import gojek from '../../assets/Gojek.png'
import rexorange from '../../assets/Rex.jpeg';
import Coldplays from '../../assets/Coldplay.png';
import Brunomajor from '../../assets/Bruno.jpeg';
import Weslife from '../../assets/weslife.jpeg';
import { Link  } from 'react-router-dom';

import seller1 from '../../assets/rsz_coldplays.jpg'
import seller2 from '../../assets/rsz_bruno.jpg'
import seller3 from '../../assets/rexorange.jpg'
import seller4 from '../../assets/westlife.jpg'

const Header = () => {
  const [performer, setPerformer] = useState([]);

  useEffect(() => {
    fetchPerformer();
  }, []);

  const fetchPerformer = async () => {
    try {
      const response = await fetch('http://localhost:4000/getperformer');
      if (!response.ok) {
        throw new Error('Failed to fetch performer data');
      }
      const data = await response.json();
      setPerformer(data);
      console.log(data); // Process the data as needed
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const performerPhotos = {
    1: seller1,
    2: seller2,
    3: seller3,
    4: seller4,
  };

  const getPerformertPhoto = (performer_id) => {
    return performerPhotos[performer_id]; 
  };



  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    swipeToSlide:true,
    responsive: [
      {
        breakpoint: 1160,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          swipeToSlide:true,
        }
      },
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          swipeToSlide:true,
        }
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        }
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 470,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          variableWidth: true,
        }
      }
    ]
  };
  return (
    <div className='header section__padding'>
      <div className="header-content">
        <div>
          <h1>10% Discount for every Gopay puchases</h1>
          <img className='shake-vertical' src={gojek} alt="" />
        </div>
      </div>
      
      <div className="header-slider">
        <h1>Top Performer</h1>
       <Slider {...settings} className='slider'>
       {performer.map((performer) => (
            <div className='slider-card' key={performer.performer_id}>
              <p className='slider-card-number'>{}</p>
              <div className="slider-img">
                <img src={getPerformertPhoto(performer.performer_id)} alt="" />
                <img src={verify} className='verify' alt="" />
              </div>
              <Link to={`/Performer/${performer.performer_id}`}>
              <p className='slider-card-name'>{performer.nama_performer}</p>
              </Link>
            </div>
            ))}
        </Slider>
      </div>
    </div>
  )
}

export default Header
