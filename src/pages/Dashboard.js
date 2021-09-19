import { MdZoomIn, MdZoomOut, MdFullscreen, MdRefresh } from "react-icons/md";
import { BASE_URL } from "../services/camera.service.js";

const Dashboard = () => {
  return(
    <div className="dashboard">
      <h1 className="heading">Dashboard</h1>
      <h2 className="heading">Live Foot Traffic - Heat Map</h2>
      <div className="heat-map">
        <img width="640" height="480" alt="heat map" src={`${BASE_URL}/heatmap.mjpg`} />
        <br />
        <button className="icon-button zoom-in"><MdZoomIn /></button>
        <button className="icon-button zoom-out"><MdZoomOut /></button>
        <button className="icon-button fullscreen"><MdFullscreen /></button>
      </div>
      <hr className="divider" />
      <h2 className="heading">Live Stats - Number of Customers
        <span><button className="icon-button refresh-stats"><MdRefresh /> </button></span>
      </h2>
      <div className="infocard">
        <p className="infocard-label">Current</p>
        <p className="infocard-stat">13</p>
      </div>
      <div className="infocard">
        <p className="infocard-label">Past Hour</p>
        <p className="infocard-stat">51</p>
      </div>
      <div className="infocard">
        <p className="infocard-label">Past 3 Hours</p>
        <p className="infocard-stat">137</p>
      </div>
      <div className="infocard">
        <p className="infocard-label">Today</p>
        <p className="infocard-stat">298</p>
      </div>
    </div>
  );
}

export default Dashboard;
