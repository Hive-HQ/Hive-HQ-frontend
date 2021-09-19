import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { MdDashboard, MdInsertChart, MdVideocam, MdSettings, MdAccountCircle } from "react-icons/md";
import Dashboard from "./pages/Dashboard.js";
import Analytics from "./pages/Analytics.js";
import Settings from "./pages/Settings.js";

function App() {
  const activeClass = (route) => { return window.location.pathname === route ? "link active" : "link" };
  
  return (
    <div className="App">
      <BrowserRouter>
        <div className="sidebar">
          <ul className="links">
            <a href="/"><li className={activeClass("/")}><MdDashboard className="icon" />Dashboard</li></a>
            <a href="/analytics"><li className={activeClass("/analytics")}><MdInsertChart className="icon" />Analytics</li></a>
            <hr />
            <a href="/liveview"><li className={activeClass("/liveview")}><MdVideocam className="icon" />Live View</li></a>
            <a href="/settings"><li className={activeClass("/settings")}><MdSettings className="icon" />Settings</li></a>
            <a href="/profile"><li className={activeClass("/profile")}><MdAccountCircle className="icon" />Profile</li></a>
          </ul>
        </div>
        <div className="content">
            <Switch>
              <Route path="/" component={Dashboard} exact />
              <Route path="/analytics" component={Analytics} />
              <Route path="/settings" component={Settings} />
            </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
