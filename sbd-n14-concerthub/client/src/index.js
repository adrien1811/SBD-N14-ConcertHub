import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css';

export {default as Navbar} from './components/navbar/Navbar';
export {default as Header} from './components/header/Header';
export {default as Bids} from './components/bids/Bids';
export {default as Footer} from './components/footer/Footer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
