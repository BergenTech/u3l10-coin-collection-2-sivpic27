// Game variables 
let playerX, playerY;
let coinX, coinY;
let obstacleX, obstacleY;
let score = 0;
let gameOver = false;
let obstacleSpeed = 3.5
let hits = 0

function setup() {
  createCanvas(400, 400);
  initializeGame();
}

function initializeGame() {
  // Initialize player position (bottom center)
  playerX = width / 2;
  playerY = height - 20;

  // Initialize coin position
  newCoin();

  // Initialize obstacle position
  obstacleX = 0;
  obstacleY = random(20, height - 20);
}

function draw() {
  background(220);

  if (gameOver) {
    displayGameOver();
  } else {
    // Draw game elements
    drawPlayer();
    drawCoin();
    drawObstacle();

    // Handle movement
    movePlayer();
    moveObstacle();

    // Check for collisions
    checkCoinCollection();
    checkCollisions();

    // Display game stats
    displayStats();
  }
}

function drawPlayer() {
  fill(0, 0, 255);  // Blue player
  circle(playerX, playerY, 20);
}

function drawCoin() {
  fill(255, 255, 0);  // Yellow coin
  circle(coinX, coinY, 10);
}

function drawObstacle() {
  fill(255, 0, 0);  // Red obstacle
  rect(obstacleX, obstacleY, 20, 20);
}

// Basic left/right and up/down movement
function movePlayer() {
  if (keyIsDown(LEFT_ARROW)) {
    playerX -= 5;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    playerX += 5;
  }
  if (keyIsDown(UP_ARROW)) {
    playerY -= 5;
  }
  if (keyIsDown(DOWN_ARROW)) {
    playerY += 5;
  }
}

function moveObstacle() {
  // Moves the obstacle up and down and resets if passes bottom boundry
  obstacleY += obstacleSpeed
  if (obstacleY > height) {
    obstacleY = 0
    obstacleSpeed += 0.5
    obstacleX = random(10, width - 10)
  }
}

function checkCoinCollection() {
  // checks if coin has been collected
  distance_between = dist(playerX, playerY, coinX, coinY)
  if (distance_between <= 15) {
    score += 1
    newCoin()
    obstacleSpeed += 0.5
  }
}

function checkCollisions() {
  // checks if the obstace is hit 3 times
  distance_to_obs = dist(playerX, playerY, obstacleX, obstacleY)
  if (distance_to_obs < 20) {
    hits += 1
    initializeGame()
    if (hits >= 3) {
      gameOver = true
    }
  }
}

function displayStats() {
  // displays game stats
  fill(0);
  textSize(16);
  text("Score: " + score, 15, 20);
  text("Hits: " + hits, 175, 20)
  text("Speed: " + obstacleSpeed, 300, 20)
}

function displayGameOver() {
  if (gameOver) {
    textAlign(CENTER, CENTER)
    textSize(50)
    text("GAME OVER", width / 2, height / 2)
    textSize(20)
    text("Score: " + score, width / 2, 245)
    text("Press R to restart", width / 2, 275)
  }
}

function newCoin() {
  // Generate random position for coin
  coinX = random(20, width - 20);
  coinY = random(20, height - 20);
}

function resetGame() {
  initializeGame();
  score = 0
  hits = 0
  obstacleSpeed = 3.5
  gameOver = false
}

function keyPressed() {
  if (gameOver) {
    if (key === 'r' || key === 'R') {
      resetGame();
    }
  }
  // TODO: Check for 'R' key to restart game
  // HINT: Use key === 'r' || key === 'R'
  // Only works when game is over
}

// Helper function you might need
function distance(x1, y1, x2, y2) {
  return dist(x1, y1, x2, y2);
}