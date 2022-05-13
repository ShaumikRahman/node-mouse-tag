const ROOM_ID = Math.floor(Math.random() * 1000000000);

const coords = document.getElementById("coords");
const body = document.getElementById("body");
const play = document.getElementById('play');
const online = document.getElementById('online');
const join = document.getElementById('join');
const texts = document.getElementsByClassName("text");

join.value = ROOM_ID;

const socket = io();

socket.emit('initial-room', ROOM_ID);

socket.on("set-host", (id) => {
  if (id == ROOM_ID) {
    console.log(`hosting ${id}`)
    hosting = true;
  }
})

socket.on('enemy-coords', coords => {
  if (hosting) {
    console.log(coords);
  }
})

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// const size = window.innerWidth >= 1440 ? '30' :'20';
const size = '20';

const xSpeed = window.innerWidth >= 1440 ? 14 : 9;
const ySpeed = window.innerWidth >= 1440 ? 14 : 9;

const turn = window.innerWidth >= 1440 ? 5 : 1.5;

let playing = false;
let sending = false;
let hosting = false;

let currentXSpeed = 0;
let currentYSpeed = 0;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouseX;
let mouseY;

let xPos = randy(1, window.innerWidth);
let yPos = randy(1,window.innerHeight);

let onlineXPos;
let onlineYPos;

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
    hosting ? drawCircle(onlineXPos, onlineYPos, 'enemy') : drawCircle(xPos, yPos, 'enemy');
    drawCircle(mouseX, mouseY);
// fix
    collisionCalc();


    computerOpponentCalc();

    window.requestAnimationFrame(draw);
  } else {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.globalAlpha = 0.35;
    drawCircle(xPos, yPos, 'enemy');
    drawCircle(mouseX, mouseY);
  }
}

function collisionCalc() {
  const collisionX = xPos - mouseX;
    const collisionY = yPos - mouseY;

    const distance = Math.sqrt(
      collisionX * collisionX + collisionY * collisionY
    );

    distance <= size * 2 ? endGame() : "";

}

function computerOpponentCalc() {
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
}

online.onclick = (e) => {
  join.value && join.value != ROOM_ID ? joinRoom(join.value, ROOM_ID) : alert(`enter enemy ID`);
}

function joinRoom(id, currentRoom) {
  socket.emit('join-room', id, currentRoom);
  sending = true;

  online.classList.add('hide');
  join.classList.add('hide');
  play.textContent = 'Waiting for host';
}

window.onresize = (e) => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.onmousemove = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  if (sending && playing) {
    socket.emit('coords', ({mouseX, mouseY}));
  }
};

canvas.onclick = (e) => {

  ctx.clearRect(0, 0, canvas.width, canvas.height);


  mouseX = e.clientX;
  mouseY = e.clientY;

  if (playing) {

    showText();

    playing = false;
    endGame();
  } else {

  hideText();

    playing = true;
    startGame();
  }

  
};

function showText() {
  for (let i = 0; i < texts.length; i++) {
    texts[i].classList.remove("hide");
  }
}

function hideText() {
  for (let i = 0; i < texts.length; i++) {
    texts[i].classList.add("hide");
  }
}
