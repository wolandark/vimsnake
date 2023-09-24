var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var grid = 16;
var eatenApples = 0;

var snake = {
  x: 160,
  y: 160,
  dx: grid,
  dy: 0,
  cells: [],
  maxCells: 4,
};

var apple = {
  x: 320,
  y: 320,
};

var count = 0; // Initialize the count variable

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function drawEatenApplesCount() {
  context.fillStyle = 'white';
  context.font = '20px Arial';
  context.fillText('Apples Eaten: ' + eatenApples, 10, 30);
}

function loop() {
  requestAnimationFrame(loop);

  if (++count < 4) {
    return;
  }

  count = 0;
  context.clearRect(0, 0, canvas.width, canvas.height);

  snake.x += snake.dx;
  snake.y += snake.dy;

  if (snake.x < 0) {
    snake.x = canvas.width - grid;
  } else if (snake.x >= canvas.width) {
    snake.x = 0;
  }

  if (snake.y < 0) {
    snake.y = canvas.height - grid;
  } else if (snake.y >= canvas.height) {
    snake.y = 0;
  }

  snake.cells.unshift({x: snake.x, y: snake.y});

  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }

  context.fillStyle = 'red'; // Choose a color for the apple
  context.beginPath();
  context.arc(apple.x + grid / 2, apple.y + grid / 2, grid / 2, 0, Math.PI * 2);
  context.fill();

context.fillStyle = 'green';
snake.cells.forEach(function (cell, index) {
  // Calculate the center coordinates of the circle
  var centerX = cell.x + grid / 2;
  var centerY = cell.y + grid / 2;

  // Draw a circle
  context.beginPath();
  context.arc(centerX, centerY, grid / 2, 0, Math.PI * 2);
  context.fill();

  if (cell.x === apple.x && cell.y === apple.y) {
    snake.maxCells++;
    eatenApples++;
    apple.x = getRandomInt(0, 25) * grid;
    apple.y = getRandomInt(0, 25) * grid;
  }

  for (var i = index + 1; i < snake.cells.length; i++) {
    if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
      snake.x = 160;
      snake.y = 160;
      snake.cells = [];
      snake.maxCells = 4;
      snake.dx = grid;
      snake.dy = 0;
      apple.x = getRandomInt(0, 25) * grid;
      apple.y = getRandomInt(0, 25) * grid;
      eatenApples = 0; // Reset the eaten apples count on collision
    }
  }
});

  // Draw the eaten apples count
  drawEatenApplesCount();
}

document.addEventListener('keydown', function(e) {
  if (e.which === 72 && snake.dx === 0) {
    snake.dx = -grid;
    snake.dy = 0;
  } else if (e.which === 75 && snake.dy === 0) {
    snake.dy = -grid;
    snake.dx = 0;
  } else if (e.which === 76 && snake.dx === 0) {
    snake.dx = grid;
    snake.dy = 0;
  } else if (e.which === 74 && snake.dy === 0) {
    snake.dy = grid;
    snake.dx = 0;
  }
});

requestAnimationFrame(loop);
