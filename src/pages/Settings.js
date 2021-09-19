import React from "react";
import { MdAddCircle, MdRemoveCircle, MdClose, MdReplay } from "react-icons/md";
import Popup from "reactjs-popup";
import { addCamera, removeCamera, getCameras } from "../services/camera.service.js";

const Settings = () => {
  const [addCameraURL, setAddCameraURL] = React.useState("");
  const [removeCameraURL, setRemoveCameraURL] = React.useState("");
  const [coordinate, setCoordinate] = React.useState({ x: null, y: null });
  const [imageOneCoords, setImageOneCoords] = React.useState([]);

  const [cameras, setCameras] = React.useState([]);

  const handleAddChange = e => {
    setAddCameraURL(e.target.value);
  };

  const handleRemoveChange = e => {
    setRemoveCameraURL(e.target.value);
  };

  const handleAddSubmit = e => {
    e.preventDefault();
    addCamera(addCameraURL);
  };

  const handleRemoveSubmit = e => {
    e.preventDefault();
    removeCamera(removeCameraURL);
  };

  const updateCoordinate = e => {
    e.preventDefault();
    setCoordinate({ x: e.pageX - e.target.offsetLeft, y: e.pageY - e.target.offsetTop });
  };

  React.useEffect(() => {
    window.addEventListener("mousemove", updateCoordinate);

    return () => window.removeEventListener("mousemove", updateCoordinate);
  });

  React.useEffect(async () => {
    const cams = await getCameras();
    console.log("[INFO] Getting cameras");
    setCameras(cams);
  }, []);


  const handleCoord1SubmitClick = e => {
    e.preventDefault();
  };

  const handleCoord1SubmitForm = e => {
    e.preventDefault();
  };

  return(
    <div className="settings">
      <h1 className="heading">Settings</h1>
      <h2 className="heading">Cameras</h2>

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

      <Popup modal trigger={<button className="button-with-icon"><MdRemoveCircle className="icon" />Remove Camera</button>} className="settings-popup">
        {close => (
          <div className="modal">
            <button className="close" onClick={close}><MdClose /></button>
            <h2 className="heading">Remove Camera</h2>
            <form className="camera-settings" onSubmit={handleRemoveSubmit}>
              <label htmlFor="remove-camera">Camera URL</label>
              <input id="remove-camera" name="camera-url" type="text" placeholder="Enter camera URL" onChange={handleRemoveChange} value={removeCameraURL} required></input>
              <button type="submit" value="Submit">Remove</button>
            </form>
          </div>
        )}
      </Popup>

      <h2 className="heading">Edit Cameras</h2>
      <h3 className="heading">Image 1</h3>
      <p>Click 4 points on the image below. Alternatively, specify the exact coordinate numbers below.</p>
      <img width="640" height="480" alt="setImageOneCoords" onClick={() => setImageOneCoords(x => [...x, coordinate])}></img>
      <br />
      <button className="button-with-icon" type="submit" value="Submit" onClick={handleCoord1SubmitClick}>Submit</button>
      <button className="button-with-icon" onClick={() => setImageOneCoords([])}><MdReplay className="icon" />Reset</button>

      <form className="coord-form" onSubmit={handleCoord1SubmitForm}>
        <label htmlFor="tl1x">Top Left X</label>
        <input id="tl1x" type="number" name="top-left-image-1" className="x-coord" required />
        <label htmlFor="tl1y">Top Left Y</label>
        <input id="tl1y" type="number" name="top-left-image-1" className="y-coord" required />
        <br />

        <label htmlFor="tr1x">Top Right X</label>
        <input id="tr1x" type="number" name="top-right-image-1" className="x-coord" required />
        <label htmlFor="tr1y">Top Right Y</label>
        <input id="tr1y" type="number" name="top-right-image-1" className="y-coord" required />
        <br />

        <label htmlFor="bl1x">Bottom Left Y</label>
        <input id="bl1x" type="number" name="bottom-left-image-1" className="x-coord" required />
        <label htmlFor="bl1y">Bottom Left Y</label>
        <input id="bl1y" type="number" name="bottom-left-image-1" className="y-coord" required />
        <br />

        <label htmlFor="br1x">Bottom Right X</label>
        <input id="br1x" type="number" name="bottom-right-image-1" className="x-coord" required />
        <label htmlFor="br1y">Bottom Right Y</label>
        <input id="br1y" type="number" name="bottom-right-image-1" className="y-coord" required />
        <br />

        <button type="submit" value="Submit">Submit</button>
      </form>
        <ul>
          {cameras.map((cam) => <li>{cam}</li>)}
        </ul>
      <table className="cameras">
      </table>
    </div>
  );
}

export default Settings;
