var scl = 20;
var speed = 10;

var snake;
var food;
var prevButton;

function setup() {
  createCanvas(600, 600);

  snake = new Snake();
  createFood();
}

function draw() {
  background(0);
  frameRate(speed);

  fill(20);

  if (snake.hasEaten(food)) {
    createFood();
  }
  snake.checkIfAlive();
  snake.draw();

  fill(255, 0, 0);
  rect(food.x, food.y, scl, scl);
}

function keyPressed() {
  if (keyCode === UP_ARROW || keyCode === 87) {
    snake.dir(0, -1);
  } else if (keyCode === DOWN_ARROW || keyCode === 83) {
    snake.dir(0, 1);
  } else if (keyCode === RIGHT_ARROW || keyCode === 68) {
    snake.dir(1, 0);
  } else if (keyCode === LEFT_ARROW || keyCode === 65) {
    snake.dir(-1, 0);
  }
  return false;
}

function mousePressed() {
  snake.total++;
  speed++;
}

function createFood() {
  var cols = floor(width / scl);
  var rows = floor(height / scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}
