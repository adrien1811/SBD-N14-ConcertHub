import React from 'react'
import './bids.css'
import { AiFillHeart,AiOutlineHeart } from "react-icons/ai";
import bids1 from '../../assets/bids1.png'
import bids2 from '../../assets/bids2.png'
import bids3 from '../../assets/bids3.png'
import bids4 from '../../assets/bids4.png'
import bids5 from '../../assets/bids5.png'
import { Link } from 'react-router-dom';

const Bids = ({ title }) => {
  return (
    <div className='bids section__padding'>
      <div className="bids-container">
        <div className="bids-container-text">
          <h1>{title}</h1>
        </div>
        <div className="bids-container-card">
          <div className="card-column">
            <div className="bids-card">
              <div className="bids-card-top">
                <img src={bids1} alt="" />
                <Link to={`/konser`}>
                  <p className="bids-title">Coldplay</p>
                </Link>
              </div>
              <div className="bids-card-bottom">
                <p>Unlimited seats</p>
                <p> <AiFillHeart /> 92</p>
              </div>
            </div>
          </div>
          <div className="card-column">
            <div className="bids-card">
              <div className="bids-card-top">
                <img src={bids2} alt="" />
                <Link to={`/konser`}>
                  <p className="bids-title">Freedom eternal</p>
                </Link>
              </div>
              <div className="bids-card-bottom">
                <p>Ayo ges beli</p>
                <p> <AiFillHeart /> 25</p>
              </div>
            </div>
          </div>
          <div className="card-column">
            <div className="bids-card">
              <div className="bids-card-top">
                <img src={bids3} alt="" />
                <Link to={`/konser`}>
                  <p className="bids-title">LGHDTV</p>
                </Link>
              </div>
              <div className="bids-card-bottom">
                <p>Beli 1 Gratis 2</p>
                <p> <AiFillHeart /> 55</p>
              </div>
            </div>
          </div>
          <div className="card-column">
            <div className="bids-card">
              <div className="bids-card-top">
                <img src={bids4} alt="" />
                <Link to={`/konser`}>
                  <p className="bids-title">Blackpink</p>
                </Link>
              </div>
              <div className="bids-card-bottom">
                <p>In your area</p>
                <p> <AiFillHeart /> 82</p>
              </div>
            </div>
          </div>
          <div className="card-column">
            <div className="bids-card">
              <div className="bids-card-top">
                <img src={bids5} alt="" />
                <Link to={`/konser`}>
                  <p className="bids-title">lorem ipsum</p>
                </Link>
              </div>
              <div className="bids-card-bottom">
                <p>lorem ipsum</p>
                <p> <AiFillHeart /> 22</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Bids
