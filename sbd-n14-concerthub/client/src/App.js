import Registerlogin from "./Registerlogin"
import Navibar from "./components/Navibar"
import Home from "./Pages/home/Home"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const App = () => {
  return (
    <div>
      <Navibar/>
      <div className="Background">
      <Router>
        <Routes >
          <Route path ="/" element = {<Home/>}/>
          <Route path ="/RegisterLogin" element = {<Registerlogin/>}/>
        </Routes>
      </Router>
      </div>
    </div>
  )
}

export default App
