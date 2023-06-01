import React from 'react';
import Bids from '../../components/bids/Bids';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

const Home = () => {
  return (
    <div>
      <Header />
      <Bids title="Event Choices" />
    </div>
  );
};

export default Home;
