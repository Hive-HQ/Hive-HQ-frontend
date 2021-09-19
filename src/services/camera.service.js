const axios =  require("axios");

const BASE_URL = "http://34.139.178.241:5500";

/**
 * Asks the server to create an AI thread for a camera
 * 
 * Args:
 *  - ip: string -> url of the camera (its not an ip, but whatever)
 * 
 * Returns:
 *  id: int -> worker_id of the camera
 */
export async function addCamera(ip) {
    const res = await axios.post(BASE_URL + "/add_camera", {
        ip,
    })
    if (res.status === 200) {
        console.log("[INFO] Added camera with id", res.data)
        return res.data; // Camera ID
    } else {
        return Promise.reject(`Error adding camera: ${res}`);
    }
}

/**
 * Asks the server to delete an AI thread for a camera
 * 
 * Args:
 *  - id: uuid -> url of the camera
 * 
 * Returns:
 *  deleted: bool -> whether or not it succesed
 */
 export async function removeCamera(id) {
    const res = await axios.post(BASE_URL + "/camera/" + id + "/stop")

    if (res.statusCode === 200) {
        return true;
    } else {
        return Promise.reject(`Error removing camera: ${res}`);
    }
}

/**
 * Get cameras
 * TODO
 */
export async function getCameras() {
    const res = await axios.get(BASE_URL + "/get_cameras/")
    console.log(res)
    console.log(res.data)
    if (res.statusCode === 200) {
        return res.data;
    } else {
        return Promise.reject(`Error removing camera: ${res}`);
    }
}
