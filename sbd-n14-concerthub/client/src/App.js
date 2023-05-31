import Registerlogin from "./Registerlogin"
import Navibar from "./components/Navibar"
import Home from "./Pages/Home"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const App = () => {
  return (
    <div>
      <Navibar/>
      <div className="Background">
      <Router>
        <Routes>
          <Route path ="/" element = {<Registerlogin/>}/>
          <Route path ="/MainPage" element = {<Home/>}/>
        </Routes>
      </Router>
      </div>
    </div>
  )
}

export default App
