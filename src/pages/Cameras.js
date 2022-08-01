import React from "react";
import { MdAddCircle, MdRemoveCircle, MdClose, MdEdit } from "react-icons/md";
import Popup from "reactjs-popup";
import Collapsible from 'react-collapsible';
import { addCamera, removeCamera, getCameras, setBoundingBoxes, setOutBoundingBoxes, BASE_URL } from "../services/camera.service.js";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const Settings = () => {
  const [addCameraURL, setAddCameraURL] = React.useState("");
  const [coordinate, setCoordinate] = React.useState({ x: null, y: null });
  const [BBCamID, setBBCamID] = React.useState(999);
  const [OutBBCamID, setOutBBCamID] = React.useState(999);
  const [imageBoundingBoxCoords, setImageBoundingBoxCoords] = React.useState({
    x0_pls_ignore: undefined,
    x1: undefined,
    x2: undefined,
    x3: undefined,
    x4: undefined,

    y0_pls_ignore: undefined,
    y1: undefined,
    y2: undefined,
    y3: undefined,
    y4: undefined,
  });

  const [cameras, setCameras] = React.useState([]);

  // Sort of sketch but shh
  const [updateCount, setUpdateCount] = React.useState(0);
  const [isFirstRender, setIsFirstRender] = React.useState(true);
  const [isFirstOutRender, setIsFirstOutRender] = React.useState(true);


  const toastifySuccess = () => {
    toast.success("Success!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      transition: Slide,
    });
  };

  const handleUpdateCoords = (e) => {
    let temp = imageBoundingBoxCoords;
    let at = 0;
    console.log("in handleUpdateCoords BBCamId set to:", BBCamID)

    let rect = e.target.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    if (temp.x1 === undefined) {at = 0}
    else if (temp.x2 === undefined) {at = 1}
    else if (temp.x3 === undefined) {at = 2}
    else if (temp.x4 === undefined) {at = 3}

    temp[`x${at + 1}`] =  e.clientX - rect.left;
    temp[`y${at + 1}`] = e.clientY - rect.top;
    setImageBoundingBoxCoords(temp);
    if (at === 3) {
      console.log("[INFO] Done getting coords");
      setBoundingBoxes(BBCamID, temp);
      window.removeEventListener("click", handleUpdateCoords);
      setImageBoundingBoxCoords({
        x0_pls_ignore: undefined,
        x1: undefined,
        x2: undefined,
        x3: undefined,
        x4: undefined,
        
        y0_pls_ignore: undefined,
        y1: undefined,
        y2: undefined,
        y3: undefined,
        y4: undefined,
      })
    }
  }

  const handleOutUpdateCoords = (e) => {
    let temp = imageBoundingBoxCoords;
    let at = 0;

    let rect = e.target.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;


    if (temp.x1 === undefined) {at = 0}
    else if (temp.x2 === undefined) {at = 1}
    else if (temp.x3 === undefined) {at = 2}
    else if (temp.x4 === undefined) {at = 3}

    temp[`x${at + 1}`] =  e.clientX - rect.left;
    temp[`y${at + 1}`] = e.clientY - rect.top;
    setImageBoundingBoxCoords(temp);
    if (at === 3) {
      console.log("[INFO] Done getting coords");
      setOutBoundingBoxes(OutBBCamID, temp);
      window.removeEventListener("click", handleOutUpdateCoords);
      setImageBoundingBoxCoords({
        x0_pls_ignore: undefined,
        x1: undefined,
        x2: undefined,
        x3: undefined,
        x4: undefined,

        y0_pls_ignore: undefined,
        y1: undefined,
        y2: undefined,
        y3: undefined,
        y4: undefined,
      })
    }
  }

  const startUpdateCoords = async (cam) => {
    setBBCamID(cam);
    console.log("[INFO] startUpdateCoords called")
  }

  React.useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }
    console.log("[INFO] Set BBCamID to", BBCamID)
    console.log("[INFO] Starting to capture clicks (React.useEffect)")
    console.log("el: ",document.getElementById(`cam-video-${BBCamID}`))
    document.getElementById(`cam-video-${BBCamID}`).addEventListener("click", handleUpdateCoords)
  }, [BBCamID]);

  React.useEffect(() => {
    if (isFirstOutRender) {
      setIsFirstOutRender(false);
      return;
    }
    console.log("[INFO] Out Set BBCamID to", BBCamID)
    console.log("[INFO] Starting to capture clicks Out (React.useEffect)")
    console.log("out el: ",document.getElementById(`cam-video-out-${BBCamID}`))
    document.getElementById(`cam-video-out-${OutBBCamID}`).addEventListener("click", handleOutUpdateCoords)
  }, [OutBBCamID]);



  const startUpdateOutCoords = cam => {
    setOutBBCamID(cam);
    console.log(cam);
    console.log("[INFO] Starting to out capture clicks");
    document.getElementById(`cam-video-${cam}`).addEventListener("click", handleOutUpdateCoords)
  }

  const handleAddChange = e => {
    setAddCameraURL(e.target.value);
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    await addCamera(addCameraURL);
    setUpdateCount(updateCount + 1);
    toastifySuccess();
  };

  // React.useEffect(() => {
  //   window.addEventListener("mousemove", updateCoordinate);
  //   return () => window.removeEventListener("mousemove", updateCoordinate);
  // });

  React.useEffect(() => {
    async function fetchData() {
      const cams = await getCameras();
      console.log("[INFO] Getting cameras");
      setCameras(cams);  
    }
    fetchData();
  }, [addCameraURL, updateCount]);


  return(
    <div className="settings">
      <h1 className="heading">Cameras</h1>
      <h2 className="heading">Add a Camera</h2>

      <Popup modal trigger={<button className="button-with-icon"><MdAddCircle className="icon" />Add Camera</button>} className="settings-popup">
        {close => (
          <div className="modal">
            <button className="close" onClick={close}><MdClose /></button>
            <h2 className="heading">Add Camera</h2>
            <form className="camera-settings" onSubmit={handleAddSubmit}>
              <label htmlFor="add-camera">Camera URL</label>
              <input id="add-camera" name="camera-url" type="text" placeholder="Enter camera URL" onChange={handleAddChange} value={addCameraURL} required></input>
              <button type="submit" value="Submit">Add</button>
            </form>
          </div>
        )}
      </Popup>
      <hr />

      <h2 className="heading">Camera List</h2>
      <ul>
        {cameras.map(function(cam) {
          return (
            <div key={cam} className="camera-item heading">{`Camera #${cam}`}: 
              {/* <button className="button-with-icon" onClick={() => {removeCamera(cam) && setUpdateCount(updateCount + 1); toastifySuccess()}} >
                <MdRemoveCircle className="icon" />Delete Camera
              </button> */}
              <Collapsible trigger="Annotated Stream (click to open)" className="collapsible heading">
                <img width="640" height="480" alt="Annotated stream" src={`${BASE_URL}/camera/${cam}/video.mjpg`} id={`cam-video-${cam}`} />
                {/* <button className="button-with-icon" onClick={() => startUpdateCoords(cam)}><MdEdit className="icon" />Edit</button> */}
              </Collapsible>
              <Collapsible trigger="Floor Plan (click to open)" className="collapsible heading">
                <img width="640" height="480" alt="Plotted floorplan" src={`${BASE_URL}/camera/${cam}/plot.mjpg`} id={`cam-video-out-${cam}`} />
                {/* <button className="button-with-icon" onClick={() => startUpdateOutCoords(cam)}><MdEdit className="icon" />Edit</button> */}
              </Collapsible>
            </div>
          )
        })}
      </ul>
      <ToastContainer>
      </ToastContainer>
    </div>
  );
}

export default Settings;
