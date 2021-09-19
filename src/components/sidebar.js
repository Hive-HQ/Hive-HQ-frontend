import '../App.css';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { MdDashboard, MdInsertChart, MdVideocam, MdSettings, MdAccountCircle } from "react-icons/md";

const Sidebar = () => {
  const activeClass = (route) => { return window.location.pathname === route ? "link active" : "link" };

  return (
    <ul className="links">
      <NavLinkink to= activeClassName="active""/"><li classNa"link"")}><MdDashboard className="icon" />Dashboard</liNavLinkavLink>
      <NavLinkink to="/analyti activeClassName="active"cs"><className="link">")}><MdInsertChart className="icon" />Analytics</liNavLinkavLink>
      <NavLinkink to="/"><li className="link"><MdVideocam className="icon" />Live View</liNavLinkavLink>
      <hr className="divider" />
      <NavLinkink to="/"><li className="link"><MdSettings className="icon" />Settings</liNavLinkavLink>
      <NavLinkink to="/"><li className="link"><MdAccountCircle className="icon" />Profile</liNavLinkavLink>
    </ul>
  );
}

export default Sidebar;
