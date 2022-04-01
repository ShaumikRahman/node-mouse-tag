const coords = document.getElementById("coords");
const body = document.getElementById("body");
const texts = document.getElementsByClassName("text");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const size = 20;

const xSpeed = 10;
const ySpeed = 10;

let playing = false;

let currentXSpeed = 0;
let currentYSpeed = 0;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouseX;
let mouseY;

let xPos = 500;
let yPos = 500;

function startGame() {
  body.classList.add("cursor");

  console.log("started");
  draw();
}

function endGame() {
  body.classList.remove("cursor");

  for (let i = 0; i < texts.length; i++) {
    texts[i].classList.remove("hide");
  }

  console.log(`p: ${mouseX}x${mouseY}`, `e: ${xPos}x${yPos}`);
  playing = false;
}

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
  if (playing) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCircle(xPos, yPos);
    drawCircle(mouseX, mouseY);

    const collisionX = xPos - mouseX;
    const collisionY = yPos - mouseY;

    const distance = Math.sqrt(
      collisionX * collisionX + collisionY * collisionY
    );

    distance <= size * 2 ? endGame() : "";

    xPos < mouseX
      ? (xPos = xPos + Math.min(xSpeed, currentXSpeed))
      : (xPos = xPos + Math.max(-xSpeed, currentXSpeed));
    yPos < mouseY
      ? (yPos = yPos + Math.min(ySpeed, currentYSpeed))
      : (yPos = yPos + Math.max(-ySpeed, currentYSpeed));

    xPos < mouseX ? currentXSpeed++ : currentXSpeed--;
    yPos < mouseY ? currentYSpeed++ : currentYSpeed--;

    currentXSpeed > xSpeed ? (currentXSpeed = xSpeed) : "";
    currentYSpeed > ySpeed ? (currentYSpeed = ySpeed) : "";

    currentXSpeed < -xSpeed ? (currentXSpeed = -xSpeed) : "";
    currentYSpeed < -ySpeed ? (currentYSpeed = -ySpeed) : "";

    

    console.log(currentXSpeed, currentYSpeed);

    window.requestAnimationFrame(draw);
  }
}

window.onmousemove = (e) => {
  //coords.textContent = `${e.clientX} x ${e.clientY}`;
  mouseX = e.clientX;
  mouseY = e.clientY;
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

  if (playing) {
  body.classList.remove("cursor");

  for (let i = 0; i < texts.length; i++) {
    texts[i].classList.remove("hide");
  }

    playing = false;
    endGame();
  } else {
  body.classList.add("cursor");

  for (let i = 0; i < texts.length; i++) {
    texts[i].classList.add("hide");
  }

    playing = true;
    startGame();
  }

  
};
