const coords = document.getElementById("coords");
const body = document.getElementById("body");
const play = document.getElementById('play');
const online = document.getElementById('online');
const join = document.getElementById('join');
const texts = document.getElementsByClassName("text");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const size = window.innerWidth >= 1440 ? '30' :'20';

const xSpeed = window.innerWidth >= 1440 ? 14 : 9;
const ySpeed = window.innerWidth >= 1440 ? 14 : 9;

const turn = window.innerWidth >= 1440 ? 5 : 1.5;

let playing = false;

let currentXSpeed = 0;
let currentYSpeed = 0;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouseX;
let mouseY;

let xPos = randy(1, window.innerWidth);
let yPos = randy(1,window.innerHeight);

function randy(min, max) {
min = Math.ceil(min);
max = Math.floor(max);
return Math.floor(Math.random() * (max -min + 1)+ min)
}

function startGame() {
  body.classList.remove('show-cursor');
  body.classList.add('hide-cursor');

  draw();
}

function endGame() {
  ctx.globalAlpha = 0.25;
  body.classList.add("show-cursor");
  body.classList.remove('hide-cursor');

  for (let i = 0; i < texts.length; i++) {
    texts[i].classList.remove("hide");
  }

  console.log(`p: ${mouseX}x${mouseY}`, `e: ${xPos}x${yPos}`);
  playing = false;
}

function drawCircle(xPos, yPos, type) {
  ctx.beginPath();
  ctx.arc(xPos, yPos, size, 0, 360);
  ctx.moveTo(0, 0);
  ctx.closePath();
  if (type === 'enemy') {
    ctx.fillStyle = "#ff5656";
  ctx.fill();
  } else {
    ctx.fillStyle = "#0070f0";
  ctx.fill();
  }
}

function draw() {
  if (playing) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1;
    drawCircle(xPos, yPos, 'enemy');
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

    xPos < mouseX ? currentXSpeed+=turn : currentXSpeed-=turn;
    yPos < mouseY ? currentYSpeed+=turn : currentYSpeed-=turn;

    currentXSpeed > xSpeed ? (currentXSpeed = xSpeed) : "";
    currentYSpeed > ySpeed ? (currentYSpeed = ySpeed) : "";

    currentXSpeed < -xSpeed ? (currentXSpeed = -xSpeed) : "";
    currentYSpeed < -ySpeed ? (currentYSpeed = -ySpeed) : "";

  

    window.requestAnimationFrame(draw);
  } else {
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    ctx.globalAlpha = 0.35;
    drawCircle(xPos, yPos, 'enemy');
    drawCircle(mouseX, mouseY);
  }
}

online.onclick = (e) => {
  join.value ? console.log(join.value) : alert('no code');
}

window.onresize = (e) => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.onmousemove = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  console.log(playing, !!playing);
};

canvas.onclick = (e) => {

  ctx.clearRect(0, 0, canvas.width, canvas.height);


  mouseX = e.clientX;
  mouseY = e.clientY;

  if (playing) {


  for (let i = 0; i < texts.length; i++) {
    texts[i].classList.remove("hide");
  }

    playing = false;
    endGame();
  } else {

  for (let i = 0; i < texts.length; i++) {
    texts[i].classList.add("hide");
  }

    playing = true;
    startGame();
  }

  
};
