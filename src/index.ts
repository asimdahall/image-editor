import { PaintBoard } from "./PaintBoard";

window.addEventListener("load", init);

function init() {
  //selectors
  const canvas = <HTMLCanvasElement>document.getElementById("paint");
  const fileUploadButton = <HTMLInputElement>(
    document.getElementById("image-upload")
  );
  const zoomIn = <HTMLButtonElement>document.getElementById("zoom-in");
  const zoomOut = <HTMLButtonElement>document.getElementById("zoom-out");
  const download = <HTMLButtonElement>document.getElementById("download");
  const rotateIn = <HTMLButtonElement>document.getElementById("rotate-in");
  const rotateOut = <HTMLButtonElement>document.getElementById("rotate-out");
  const colorInput = <HTMLInputElement>document.getElementById("color-select");

  //initialize canvas
  const paintBoard = new PaintBoard(canvas as HTMLCanvasElement);

  // @canvas event-listeners
  canvas.addEventListener("mousedown", paintBoard.start);
  canvas.addEventListener("mouseup", paintBoard.finish);
  canvas.addEventListener("mousemove", paintBoard.draw);
  canvas.addEventListener("mouseout", paintBoard.finish);

  // @file-upload event-listener
  fileUploadButton.addEventListener("change", (e)=>paintBoard.addImage(e.target.files[0));
  zoomIn.addEventListener("click", console.log);
  zoomOut.addEventListener("click", console.log);
  rotateIn.addEventListener("click", paintBoard.rotatePlus);
  rotateOut.addEventListener("click", paintBoard.rotateMinus);
  download.addEventListener("click", paintBoard.downloadImage);
  colorInput.addEventListener("change", (e) =>
    paintBoard.setPenColor(e.target.value)
  );
}
