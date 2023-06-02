import Registerlogin from "./Registerlogin"
import Navibar from "./components/Navibar"
import Footer from "./components/footer/Footer"
import Home from "./Pages/home/Home"
import Profile from './Pages/profile/Profile'
import Topup from './Pages/Topup/Topup'
import Userprofile from './Pages/userprofile/Userprofile'
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
          <Route path ="/userprofile" element = {<Userprofile/>}/>
          <Route path ="/Topup" element = {<Topup/>}/>
        </Routes>
      </Router>
      <Footer/>
      </div>
    </div>
  )
}

export default App
