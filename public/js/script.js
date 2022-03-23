const coords = document.getElementById('coords');
const body = document.getElementById('body');
const texts = document.getElementsByClassName('text');

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function drawCircle(xPos, yPos) { ctx.beginPath(); ctx.arc(xPos, yPos, 50, 0, 360); ctx.moveTo(0, 0); ctx.closePath(); ctx.fillStyle = 'white'; ctx.fill(); ctx.strokeStyle = "red"; ctx.stroke();}

window.onmousemove = (e) => {
    coords.textContent = `${e.clientX} x ${e.clientY}`;
    drawCircle(e.clientX, e.clientY);
}

window.onresize = (e) => {
    console.log(`${canvas.width} x ${canvas.height}`);
}

window.onclick = (e) => {
    body.classList.toggle('clickable');
    for (let i = 0; i < texts.length; i++) {
        texts[i].classList.toggle('hide');
    }
}