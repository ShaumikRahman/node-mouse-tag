const coords = document.getElementById('coords');
const body = document.getElementById('body');
const texts = document.getElementsByClassName('text');

window.onmousemove = (e) => {
    coords.textContent = `${e.clientX} x ${e.clientY}`;
}

window.onclick = (e) => {
    body.classList.toggle('clickable');
    for (let i = 0; i < texts.length; i++) {
        texts[i].classList.toggle('hide');
    }
}