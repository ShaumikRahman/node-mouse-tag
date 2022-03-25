const coords = document.getElementById("coords");
const body = document.getElementById("body");
const texts = document.getElementsByClassName("text");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const size = 20;

const xSpeed = 15;
const ySpeed = 15;

let currentXSpeed = 0;
let currentYSpeed = 0;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouseX;
let mouseY;

let xPos = 500;
let yPos = 500;



function drawCircle(xPos, yPos) {
  ctx.beginPath();
  ctx.arc(xPos, yPos, size, 0, 360);
  ctx.moveTo(0, 0);
  ctx.closePath();
  ctx.fillStyle = "#0070f0";
  ctx.fill();
  // ctx.strokeStyle = "0070ff";
  // ctx.stroke();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCircle(xPos, yPos);

  

  xPos < mouseX ? xPos = xPos + Math.min(xSpeed, currentXSpeed) : xPos = xPos + Math.max(-xSpeed, currentXSpeed);
  yPos < mouseY ? yPos = yPos + Math.min(ySpeed, currentYSpeed) : yPos = yPos + Math.max(-ySpeed, currentYSpeed);

  xPos < mouseX ? currentXSpeed++ : currentXSpeed--;
  yPos < mouseY ? currentYSpeed++ : currentYSpeed--;

  currentXSpeed > xSpeed ? currentXSpeed = xSpeed : '';
  currentYSpeed > ySpeed ? currentYSpeed = ySpeed : '';

  currentXSpeed < -xSpeed ? currentXSpeed = -xSpeed : '';
  currentYSpeed < -ySpeed ? currentYSpeed = -ySpeed : '';

  console.log(xPos, yPos);

  window.requestAnimationFrame(draw);
}

draw();

window.onmousemove = (e) => {
  coords.textContent = `${e.clientX} x ${e.clientY}`;
  mouseX = e.clientX;
  mouseY = e.clientY;
  drawCircle(e.clientX, e.clientY);
  //requestAnimationFrame(update);
};

window.addEventListener("click", (e) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  console.log("test");
});

window.onresize = (e) => {
  console.log(`${canvas.width} x ${canvas.height}`);
};

window.onclick = (e) => {
  body.classList.toggle("clickable");
  for (let i = 0; i < texts.length; i++) {
    texts[i].classList.toggle("hide");
  }
};
