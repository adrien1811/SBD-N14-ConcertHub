import Registerlogin from "./Registerlogin"
import Navibar from "./components/Navibar"
import Footer from "./components/footer/Footer"
import Home from "./Pages/home/Home"
import Profile from './Pages/profile/Profile'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const App = () => {
  return (
    <div>
      <Navibar/>
      <div className="Background">
      <Router>
        <Routes >
          <Route path ="/" element = {<Home/>}/>
          <Route path="/profile/:id" element={<Profile />} />
          <Route path ="/Registerlogin" element = {<Registerlogin/>}/>
        </Routes>
      </Router>
      <Footer/>
      </div>
    </div>
  )
}

export default App
