import jsPDF from "jspdf";

export class PaintBoard {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  paintColor: string;
  strokeWidth: number;
  isPainting: boolean;
  image: HTMLImageElement;
  scaleFactor: number;
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.paintColor = "red";
    this.strokeWidth = 10;
    this.isPainting = false;
    this.scaleFactor = 1;
  }
  getMousePos(e) {
    return {
      x: e.offsetX,
      y: e.offsetY,
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

  onMouseOut = () => {
    if (!this.isPainting) {
      this.isPainting = false;
    }
  };

  onMouseEnter = (e) => {
    if (!this.isPainting) {
      return;
    }
    this.context.beginPath();
    this.draw(e);
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

  rotatePlus = async () => {
    if (!this.image) {
      alert("Please upload image to rotate");
      return;
    }
    this.clearCanvas();
    this.context.translate(600, 0);
    this.context.rotate(Math.PI / 2);
    this.drawImage();
  };
  rotateMinus = () => {
    if (!this.image) {
      alert("Please upload image to rotate");
      return;
    }
    this.clearCanvas();
    this.context.translate(0, 600);
    this.context.rotate(-(Math.PI / 2));
    this.drawImage();
  };
  zoom = () => {
    this.context.scale(this.scaleFactor, this.scaleFactor);
    this.drawImage();
    this.context.setTransform(1, 0, 0, 1, 0, 0);
  };
  zoomIn = () => {
    if (!this.image) {
      alert("Please upload image to zoom in");
      return;
    }
    this.clearCanvas();
    this.scaleFactor += 0.2;
    this.zoom();
  };
  zoomOut = () => {
    if (!this.image) {
      alert("Please upload image to zoom out");
      return;
    }
    this.clearCanvas();
    this.scaleFactor -= 0.2;
    this.zoom();
  };

  setPenColor = (color) => {
    this.paintColor = color;
  };

  setBrushSize = (size: number) => {
    this.strokeWidth = size;
  };
  downloadImage = () => {
    if (!this.image) {
      alert("please upload the image to download");
      return;
    }

    const format: "jpeg" | "png" | "pdf" = prompt(
      "Which format do you want to save the image with? You can choose jpeg, png and pdf."
    ) as "jpeg" | "png" | "pdf";

    if (!["jpeg", "jpg", "png", "pdf"].includes(format.toLowerCase())) {
      alert("Please choose a suitable format.");
      return;
    }

    if (format === "pdf") {
      const imgData = this.canvas.toDataURL("image/png");
      const doc = new jsPDF("p", "mm");
      doc.addImage(imgData, "PNG", 10, 10);
      doc.save("edited.pdf");
    } else {
      const url = this.canvas.toDataURL(`image/${format}`, 1.0);
      const element = document.createElement("a");
      element.download = `downloaded.${format}`;
      element.href = url;
      element.click();
    }
  };
}
