const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
let snake = [{ x: 200, y: 200 }];
let direction = { x: 0, y: 0 };
let food = { x: 300, y: 300 };
let score = 0;

function drawRect(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, gridSize, gridSize);
}

function getRandomGridPosition() {
    return {
        x: Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize,
        y: Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize,
    };
}

function update() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    if (head.x === food.x && head.y === food.y) {
        food = getRandomGridPosition();
        score += 10;
    } else {
        snake.pop();
    }

    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || isCollision(head)) {
        resetGame();
        return;
    }

    snake.unshift(head);
}

function isCollision(position) {
    for (let segment of snake) {
        if (segment.x === position.x && segment.y === position.y) {
            return true;
        }
    }
    return false;
}

function resetGame() {
    snake = [{ x: 200, y: 200 }];
    direction = { x: 0, y: 0 };
    food = getRandomGridPosition();
    score = 0;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawRect(food.x, food.y, "red");

    for (let segment of snake) {
        drawRect(segment.x, segment.y, "green");
    }

    ctx.fillStyle = "black";
    ctx.fillText("Score: " + score, 10, canvas.height - 10);
}

function gameLoop() {
    update();
    draw();
}

document.addEventListener("keydown", event => {
    switch (event.key) {
        case "ArrowUp":
            if (direction.y === 0) direction = { x: 0, y: -gridSize };
            break;
        case "ArrowDown":
            if (direction.y === 0) direction = { x: 0, y: gridSize };
            break;
        case "ArrowLeft":
            if (direction.x === 0) direction = { x: -gridSize, y: 0 };
            break;
        case "ArrowRight":
            if (direction.x === 0) direction = { x: gridSize, y: 0 };
            break;
    }
});

setInterval(gameLoop, 100);
