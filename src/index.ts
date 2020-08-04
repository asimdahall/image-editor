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
  const brushSize = <HTMLInputElement>document.getElementById("brush-select");

  //initialize canvas
  const paintBoard = new PaintBoard(canvas as HTMLCanvasElement);

  // @canvas event-listeners
  canvas.addEventListener("mousedown", paintBoard.start);
  canvas.addEventListener("mouseup", paintBoard.finish);
  document.addEventListener("mouseup", paintBoard.finish);
  canvas.addEventListener("mousemove", paintBoard.draw);
  canvas.addEventListener("mouseout", paintBoard.onMouseOut);
  canvas.addEventListener("mouseenter", paintBoard.onMouseEnter);

  // @file-upload event-listener
  fileUploadButton.addEventListener(
    "change",
    (e: Event & { target: HTMLInputElement }) =>
      paintBoard.addImage(e.target.files[0])
  );
  zoomIn.addEventListener("click", paintBoard.zoomIn);
  zoomOut.addEventListener("click", paintBoard.zoomOut);
  rotateIn.addEventListener("click", paintBoard.rotatePlus);
  rotateOut.addEventListener("click", paintBoard.rotateMinus);
  download.addEventListener("click", paintBoard.downloadImage);
  brushSize.addEventListener(
    "change",
    (e: Event & { target: HTMLInputElement }) =>
      paintBoard.setBrushSize(Number(e.target.value))
  );
  colorInput.addEventListener(
    "change",
    (e: Event & { target: HTMLInputElement }) =>
      paintBoard.setPenColor(e.target.value)
  );
}
