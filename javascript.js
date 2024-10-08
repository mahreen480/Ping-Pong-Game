const gameContainer = document.querySelector('.game-container');
const paddleLeft = document.getElementById('paddle-left');
const paddleRight = document.getElementById('paddle-right');
const ball = document.getElementById('ball');
const scoreLeft = document.getElementById('score-left');
const scoreRight = document.getElementById('score-right');

let ballX = gameContainer.clientWidth / 2;
let ballY = gameContainer.clientHeight / 2;
let ballSpeedX = 2;
let ballSpeedY = 2;
let leftScore = 0;
let rightScore = 0;
let gameInterval;

function startGame() {
    gameInterval = setInterval(updateGame, 16);
}

function pauseGame() {
    clearInterval(gameInterval);
}

function restartGame() {
    clearInterval(gameInterval);
    ballX = gameContainer.clientWidth / 2;
    ballY = gameContainer.clientHeight / 2;
    ballSpeedX = 2;
    ballSpeedY = 2;
    leftScore = 0;
    rightScore = 0;
    scoreLeft.textContent = leftScore;
    scoreRight.textContent = rightScore;
    startGame();
}

function updateGame() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY <= 0 || ballY >= gameContainer.clientHeight - ball.clientHeight) {
        ballSpeedY = -ballSpeedY;
    }

    if (ballX <= paddleLeft.clientWidth) {
        if (ballY >= paddleLeft.offsetTop && ballY <= paddleLeft.offsetTop + paddleLeft.clientHeight) {
            ballSpeedX = -ballSpeedX;
        } else {
            rightScore++;
            scoreRight.textContent = rightScore;
            resetBall();
        }
    }

    if (ballX >= gameContainer.clientWidth - paddleRight.clientWidth - ball.clientWidth) {
        if (ballY >= paddleRight.offsetTop && ballY <= paddleRight.offsetTop + paddleRight.clientHeight) {
            ballSpeedX = -ballSpeedX;
        } else {
            leftScore++;
            scoreLeft.textContent = leftScore;
            resetBall();
        }
    }

    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';
}

function resetBall() {
    ballX = gameContainer.clientWidth / 2;
    ballY = gameContainer.clientHeight / 2;
    ballSpeedX = -ballSpeedX;
}

document.addEventListener('keydown', (e) => {
    const paddleSpeed = 20;
    if (e.key === 'w' && paddleLeft.offsetTop > 0) {
        paddleLeft.style.top = paddleLeft.offsetTop - paddleSpeed + 'px';
    }
    if (e.key === 's' && paddleLeft.offsetTop < gameContainer.clientHeight - paddleLeft.clientHeight) {
        paddleLeft.style.top = paddleLeft.offsetTop + paddleSpeed + 'px';
    }
    if (e.key === 'ArrowUp' && paddleRight.offsetTop > 0) {
        paddleRight.style.top = paddleRight.offsetTop - paddleSpeed + 'px';
    }
    if (e.key === 'ArrowDown' && paddleRight.offsetTop < gameContainer.clientHeight - paddleRight.clientHeight) {
        paddleRight.style.top = paddleRight.offsetTop + paddleSpeed + 'px';
    }
});