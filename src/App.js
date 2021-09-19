import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { MdDashboard, MdInsertChart, MdVideocam, MdPhotoCamera, MdAccountCircle } from "react-icons/md";
import Dashboard from "./pages/Dashboard.js";
import Cameras from "./pages/Cameras.js";
import Logo from "./Hive-HQ_Logo.png";

function App() {
  const activeClass = (route) => { return window.location.pathname === route ? "link active" : "link" };
  
  return (
    <div className="App">
      <BrowserRouter>
        <div className="sidebar">
          <img className="logo" alt="logo" src={Logo} />
          <ul className="links">
            <a href="/"><li className={activeClass("/")}><MdDashboard className="icon" />Dashboard</li></a>
            <div className="inactive-wrapper">
              <a href="/analytics" className="inactive"><li className={activeClass("/analytics")}><MdInsertChart className="icon" />Analytics</li></a>
              <a href="/liveview" className="inactive"><li className={activeClass("/liveview")}><MdVideocam className="icon" />Live View</li></a>
            </div>
            <a href="/cameras"><li className={activeClass("/cameras")}><MdPhotoCamera className="icon" />Cameras</li></a>
            <hr />
            <div className="inactive-wrapper">
              <a href="/profile" className="inactive"><li className={activeClass("/profile")}><MdAccountCircle className="icon" />Profile</li></a>
            </div>
          </ul>
        </div>
        <div className="content">
            <Switch>
              <Route path="/" component={Dashboard} exact />
              <Route path="/cameras" component={Cameras} />
            </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
