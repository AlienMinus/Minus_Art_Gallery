const canvas = document.getElementById("drawCanvas");
const ctx = canvas.getContext("2d");
let drawing = false;
let currentColor = "black";
let brushSize = 3;
let lastX = 0,
  lastY = 0;
let isErasing = false;

function setColor(color) {
  currentColor = color;
  isErasing = false;
}

function setBrushSize(size) {
  brushSize = size;
}

function toggleErase() {
  isErasing = !isErasing;
  currentColor = isErasing ? "white" : currentColor;
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function saveCanvas() {
  const link = document.createElement("a");
  link.download = "my_drawing.png";
  link.href = canvas.toDataURL();
  link.click();
}

function resizeCanvas() {
  const width = document.getElementById("canvasWidth").value;
  const height = document.getElementById("canvasHeight").value;
  canvas.width = width;
  canvas.height = height;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Function to get mouse or touch position on the canvas, accounting for scaling
function getPosition(event) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width; // Scale factor for width
  const scaleY = canvas.height / rect.height; // Scale factor for height
  if (event.touches) {
    return {
      x: (event.touches[0].clientX - rect.left) * scaleX,
      y: (event.touches[0].clientY - rect.top) * scaleY,
    };
  }
  return {
    x: (event.clientX - rect.left) * scaleX,
    y: (event.clientY - rect.top) * scaleY,
  };
}

// Mouse and touch events
canvas.addEventListener("mousedown", (event) => {
  drawing = true;
  const position = getPosition(event);
  lastX = position.x;
  lastY = position.y;
});

canvas.addEventListener("mouseup", () => (drawing = false));
canvas.addEventListener("mouseout", () => (drawing = false));
canvas.addEventListener("mousemove", (event) => draw(event));

canvas.addEventListener("touchstart", (event) => {
  event.preventDefault(); // Prevents scrolling
  drawing = true;
  const position = getPosition(event);
  lastX = position.x;
  lastY = position.y;
});

canvas.addEventListener("touchend", () => (drawing = false));
canvas.addEventListener("touchmove", (event) => draw(event));

function draw(event) {
  if (!drawing) return;
  const position = getPosition(event);
  ctx.strokeStyle = currentColor;
  ctx.lineWidth = brushSize;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(position.x, position.y);
  ctx.stroke();
  lastX = position.x;
  lastY = position.y;
}
