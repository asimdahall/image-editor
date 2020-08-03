import { Console } from "console";
import { read } from "fs";
import { HexBase64BinaryEncoding } from "crypto";

export class PaintBoard {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  paintColor: string;
  strokeWidth: number;
  isPainting: boolean;
  image: HTMLImageElement;
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.paintColor = "red";
    this.strokeWidth = 4;
    this.isPainting = false;
  }
  getMousePos(e) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }
  start = (e) => {
    this.isPainting = true;
    this.draw(e);
  };

  finish = () => {
    this.isPainting = false;
    this.context.beginPath();
  };

  draw = (e) => {
    if (!this.isPainting) return;
    const { x, y } = this.getMousePos(e);
    this.context.strokeStyle = this.paintColor;
    this.context.lineWidth = this.strokeWidth;
    this.context.lineCap = "round";
    this.context.lineTo(x, y);
    this.context.stroke();
    this.context.beginPath();
    this.context.moveTo(x, y);
  };
  clearCanvas = () => {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.restore();
  };
  addImage = (file) => {
    this.clearCanvas();
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("loadend", () => {
      this.drawNewImage(reader.result);
    });
  };

  drawNewImage(imageURL: string | ArrayBuffer) {
    const img = new Image();
    // @ts-ignore
    img.src = imageURL;
    img.addEventListener("load", () => {
      this.image = img;
      this.drawImage();
    });
  }

  drawImage = (image = this.image) => {
    this.context.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
  };

  rotatePlus = () => {
    this.clearCanvas();
    this.context.translate(600, 0);
    this.context.rotate(Math.PI / 2);
    this.drawImage();
    this.context.restore();
  };
  rotateMinus = () => {
    this.clearCanvas();
    this.context.translate(0, 600);
    this.context.rotate(-(Math.PI / 2));
    this.drawImage();
    this.context.restore();
  };
  setPenColor = (color) => {
    this.paintColor = color;
  };
  downloadImage = (format) => {
    const url = this.canvas.toDataURL("application/pdf");
    const element = document.createElement("a");
    element.download = "downloaded.png";
    element.href = url;
    element.click();
  };
}
