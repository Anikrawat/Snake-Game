let direction = { x: 0, y: 0 };
let snakeArray = [{ x: 10, y: 20 }];
let movingSound = new Audio("moving.wav");
let eating = new Audio("eating.mp3");
let gameover = new Audio("gameover.wav");
let background = new Audio("background.mp3");
let food = { x: 25, y: 15 };
let lastTime = 0;
let speed = 10;
let score = 0;
let hiscoreval = 0;
localStorage.setItem("highScore", score);

function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastTime) / 1000 < 1 / speed) {
    return;
  }
  background.play();
  lastTime = ctime;

  gameEngine();
}

function gameEngine() {
  function isCollide(sarr) {
    for (let i = 1; i < sarr.length; i++) {
      if (sarr[i].x === sarr[0].x && sarr[i].y === sarr[0].y) {
        return true;
      }
    }

    if (sarr[0].x > 70 || sarr[0].x < 0 || sarr[0].y < 0 || sarr[0].y > 70) {
      return true;
    }
    return false;
  }

  //collision logic

  if (isCollide(snakeArray)) {
    gameover.play();
    direction = { x: 0, y: 0 };
    snakeArray = [{ x: 10, y: 20 }];
    alert("Game over press any key to restart");
    score = 0;
  }

  //displaying the score.

  let gameScore = document.getElementById("Score");
  gameScore.innerHTML = "Score: " + score;

  let hiscore = localStorage.getItem("hiscore");
  let highScore = document.getElementById("highScore");
  if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
  } else {
    hiscoreval = JSON.parse(hiscore);
    highScore.innerHTML = "HiScore: " + hiscore;
  }

  //if we have eaten the food.
  let a = 0,
    b = 40;
  if (snakeArray[0].x === food.x && snakeArray[0].y === food.y) {
    eating.play();
    if (score > hiscoreval) {
      hiscoreval = score;
      localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
    }
    snakeArray.push({
      x: snakeArray[0].x + direction.x,
      y: snakeArray[0].y + direction.y,
    });
    score += 1;
    food.x = Math.floor(Math.random() * (a - b + 1)) + b;
    food.y = Math.floor(Math.random() * (a - b + 1)) + b;
  }

  //displaying the body of the snake.

  gameBoard.innerHTML = "";
  snakeArray.forEach((e) => {
    const snake = document.createElement("div");
    snake.classList.add("snakeBody");
    snake.style.gridRowStart = e.y;
    snake.style.gridColumnStart = e.x;
    gameBoard.appendChild(snake);
  });

  //displaying food.
  const foodPos = document.createElement("div");
  foodPos.classList.add("foodPos");
  foodPos.style.gridRowStart = food.y;
  foodPos.style.gridColumnStart = food.x;
  gameBoard.appendChild(foodPos);

  //Moving snake
  for (let i = snakeArray.length - 2; i >= 0; i--) {
    snakeArray[i + 1] = { ...snakeArray[i] };
  }

  snakeArray[0].x += direction.x;
  snakeArray[0].y += direction.y;
}

window.requestAnimationFrame(main);

window.addEventListener("keydown", (e) => {
  highScore.innerHTML = "HiScore: " + hiscoreval;
  movingSound.play();
  switch (e.key) {
    case "ArrowUp":
      direction = { x: 0, y: -1 };
      break;

    case "ArrowDown":
      direction = { x: 0, y: 1 };
      break;

    case "ArrowLeft":
      direction = { x: -1, y: 0 };
      break;

    case "ArrowRight":
      direction = { x: 1, y: 0 };
      break;
  }
});

console.log("Hello World.");