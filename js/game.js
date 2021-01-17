const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")

const ground = new Image()
ground.src = 'img/background.png'

const foodImg = new Image()
foodImg.src = 'img/food.png'

let box = 32

let score = 0

let food = {
  x: Math.floor((Math.random() * 17 + 1)) * box,
  y: Math.floor((Math.random() * 15 + 3)) * box
}

let snake = []
snake[0] = {
  x: 9 * box,
  y: 10 * box
}


document.addEventListener('keydown', direction)

let dir

function direction(e){
  if(e.keyCode == 37 && dir != 'right')
  dir = 'left'
  else if (e.keyCode == 38 && dir != 'down')
  dir = 'up'
  else if (e.keyCode == 39 && dir != 'left')
  dir = 'right'
  else if (e.keyCode == 40 && dir != 'up')
  dir = 'down'

}

function eatTail(golova, masiv){
  for(let i = 0; i < masiv.length; i++){
    if(golova.x == masiv[i].x && golova.y == masiv[i].y)
    stopGame(game)
  }

}

function drawGame() {
	ctx.drawImage(ground, 0, 0)

  ctx.drawImage(foodImg, food.x, food.y)

  for(let i=0; i<snake.length; i++){
    ctx.fillStyle = i == 0 ? 'green' : 'orange'
    ctx.fillRect(snake[i].x, snake[i].y, box, box)
  }

  ctx.fillStyle = 'white',
  ctx.font = '50px Arial',
  ctx.fillText(score, box * 2.5, box * 1.7)

  let snakeX = snake[0].x
  let snakeY = snake[0].y

  if(snakeX == food.x && snakeY == food.y) {
    score++
    food = {
      x: Math.floor((Math.random() * 17 + 1)) * box,
      y: Math.floor((Math.random() * 15 + 3)) * box
    }
    if (score == 3) {console.log('3333');}

  } else {
    snake.pop()

  }

  if(snakeX < box || snakeX > box * 17 || snakeY < 3 * box || snakeY > box * 17)
  stopGame()


  if(dir == 'left') snakeX -= box
  if(dir == 'right') snakeX += box
  if(dir == 'up') snakeY -= box
  if(dir == 'down') snakeY += box

  let newHead = {
    x: snakeX,
    y: snakeY
  }

  eatTail(newHead, snake)

  snake.unshift(newHead)
}

function stopGame() {
  if (confirm('Wanto to continue?')){
  document.location.reload(false)
  }else{

  clearInterval(game)
 }
}


let game = setInterval(drawGame, 100); // Вызов функции из вне
