const coords = document.getElementById('coords');

window.onmousemove = (e) => {
    coords.textContent = `${e.clientX} x ${e.clientY}`;
}