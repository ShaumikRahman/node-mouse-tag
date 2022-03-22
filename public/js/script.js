const coords = document.getElementById('coords');
const body = document.getElementById('body');
const texts = document.getElementsByClassName('text');

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.onmousemove = (e) => {
    coords.textContent = `${e.clientX} x ${e.clientY}`;    
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