const coords = document.getElementById('coords');
const body = document.getElementById('body');

window.onmousemove = (e) => {
    coords.textContent = `${e.clientX} x ${e.clientY}`;
}

window.onclick = (e) => {
    body.classList.toggle('clickable');
}