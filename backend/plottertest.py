import sys

sys.path.insert(0, "./yolov5")

import argparse
import time
from pathlib import Path
import cv2
import torch
import torch.backends.cudnn as cudnn
from flask import Flask, Response
import threading
import numpy as np

server = Flask(__name__)
final_img = None


@server.route("/")
def index():
    return "ok"


@server.route("/video")
def video_feed():
    def generate_next_frame():
        global final_img
        while True:
            ret, jpg = cv2.imencode(
                ".jpg", final_img, [int(cv2.IMWRITE_JPEG_QUALITY), 10]
            )
            frame = jpg.tobytes()
            yield (b"--HTN\r\n" b"Content-Type: image/jpeg\r\n\r\n" + frame + b"\r\n")

    return Response(
        generate_next_frame(), mimetype="multipart/x-mixed-replace; boundary=HTN"
    )


def detect(source, out, device):
    yolo_weights = "yolov5/weights/yolov5s.pt"
    deepsort_config = "deep_sort_pytorch/configs/deep_sort.yaml"
    img_size = 640
    while True:
        time.sleep(0.01)
        plotter = np.zeros((img_size, img_size, 3), np.uint8)
        plotter[:, 0:img_size] = (250, 255, 255)
        global final_img
        final_img = plotter


def start_flask_server():
    server.run(host=args.ip, port=args.port)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--source", type=str, default="0", help="source")
    parser.add_argument("--cuda", action="store_true", help="cuda")
    parser.add_argument("--device", default=None, help="cuda device")
    parser.add_argument("--ip", default="0.0.0.0", help="server ip")
    parser.add_argument("--port", default="5500", help="server port")
    args = parser.parse_args()

    server_thread = threading.Thread(target=start_flask_server)
    server_thread.setDaemon(True)
    server_thread.start()

    with torch.no_grad():
        detect(
            args.source,
            "inference/output",
            args.device if args.device else "0" if args.cuda else "cpu",
        )
