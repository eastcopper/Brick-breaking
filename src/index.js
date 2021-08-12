const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1500;
canvas.height = 700;

let circleX = 750;
let circleY = 350;
let radius = 20;
let speedX = 7;
let speedY = 7;
let playerX = 750;
let playerY = 675;

let game = false;
let death = false;

function circle() {
    ctx.beginPath();
    ctx.arc(circleX, circleY, radius, 0, Math.PI * 2);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
    if (game && !death) {
        if (circleX - radius < 0 || circleX + radius > canvas.width) {
            speedX *= -1;
        }
        if (circleY - radius < 0 || (circleY + radius > playerY && circleX + radius > playerX && circleX - radius < playerX + 250)) {
            speedY *= -1;
        }
        if (circleY + radius > canvas.height) {
            if (!death) {
                let input = confirm('gameover\n다시 하시겠습니까?');
                if (input) {
                    location.reload();
                }
                death = true;
                circleY = canvas.height - radius;
            }
        }
        if (!death) {
            circleY += speedY;
            circleX += speedX; 
        }
    }
}

function bar() {
    if (playerX <= 0) { playerX = 0; }
    if (playerX + 250 >= canvas.width) { playerX = canvas.width - 250; }
    ctx.fillStyle = 'blue';
    ctx.fillRect(playerX, playerY, 250, 20);
}

function onMove(event) {
    playerX = event.offsetX - 125;
}

function start() {
    if (!game && !death) {
        game = true;
    }
}

setInterval(function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    circle();
    bar();
}, 20)

document.addEventListener('click', start);
document.addEventListener('mousemove', onMove);