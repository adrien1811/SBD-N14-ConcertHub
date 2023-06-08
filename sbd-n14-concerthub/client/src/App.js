import Registerlogin from "./Registerlogin"
import Navibar from "./components/Navibar"
import Footer from "./components/footer/Footer"
import Home from "./Pages/home/Home"
import Performer from './Pages/profile/Performer'
import Topup from './Pages/Topup/Topup'
import Konser from './Pages/Konser/Konser'
import Userprofile from './Pages/userprofile/Userprofile'
import Order from './Pages/Order/Order'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const App = () => {
  return (
    <div>
      <Navibar/>
      <div className="Background">
      <Router>
        <Routes >
          <Route path ="/" element = {<Home/>}/>
          <Route path="/Performer/:id" element={<Performer />} />
          <Route path ="/Registerlogin" element = {<Registerlogin/>}/>
          <Route path="/userprofile/:user_id" element={<Userprofile />} />
          <Route path ="/Topup" element = {<Topup/>}/>
          <Route path="/konser/:konserId" element={<Konser />} />
          <Route path ="/Order" element = {<Order/>}/>
          <Route path="/order/:konserId" element={<Order />} />
        </Routes>
      </Router>
         <Footer/>
      </div>
    </div>
  )
}

export default App
