// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;


const counter = document.getElementById("ball-counter");
// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}


//Ball class
function Ball(x, y, velocityX, velocityY, color, size){
  this.x = x;
  this.y = y;
  this.velocityX = velocityX;
  this.velocityY = velocityY;
  this.color = color;
  this.size = size;
}

//drawing Ball
Ball.prototype.draw = function(){
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI); //(x,y) position, radius, 0 to 2pi radians
  ctx.fill();
}


Ball.prototype.update = function(){
  //inverting velocity to "bounce" off window borders & split & bcm smaller
  if ((this.x + this.size) >= width){
    this.velocityX = -(this.velocityX);

    this.size = this.size >= 2 ? this.size / 2 : 1

    if (!(this.size <= 1)){
    let size = this.size;
    let ball = new Ball((this.x - 2 * this.size), (this.y - 2 * this.size), random(-7,7), random(-7,7), this.color, size);

    balls.push(ball);
    counter.innerHTML = `${balls.length}`;
  }
  }

  if ((this.x-this.size) <= 0){
    this.velocityX = -(this.velocityX);

    this.size = this.size >= 2 ? this.size / 2 : 1

    if (!(this.size <= 1)){
    let size = this.size;
    let ball = new Ball((this.x + 2 * this.size), (this.y - 2 * this.size), random(-7,7), random(-7,7), this.color, size);

    balls.push(ball);
    counter.innerHTML = `${balls.length}`;
  }
  }

  if ((this.y + this.size) >= height){
    this.velocityY = -(this.velocityY);

    this.size = this.size >= 2 ? this.size / 2 : 1

    if (!(this.size <= 1)){
    let size = this.size;
    let ball = new Ball((this.x - 2 * this.size), (this.y - 2 * this.size), random(-7,7), random(-7,7), this.color, size);

    balls.push(ball);
    counter.innerHTML = `${balls.length}`;
  }
  }

  if ((this.y - this.size) <= 0){
    this.velocityY = -(this.velocityY);

    this.size = this.size >= 2 ? this.size / 2 : 1

    if (!(this.size = 1)){
    let size = this.size;
    let ball = new Ball((this.x - 2 * this.size), (this.y + 2 * this.size), random(-7,7), random(-7,7), this.color, size);

    balls.push(ball);
    counter.innerHTML = `${balls.length}`;
  }
  }

  //moving according to velocity
  this.x += this.velocityX; 
  this.y += this.velocityY;
}

//creating balls
let balls = [];

//collision detection
Ball.prototype.collisionDetect = function(){
 balls.forEach(ball => {

  if(!(this === ball)){ //if not the same ball
    const dx = this.x - ball.x;
    const dy = this.y - ball.y;
    const distance = Math.sqrt(dx * dx + dy * dy); //calculating distance -> Pythagorean Theorem

    if (distance < this.size + ball.size){ //collision = become same random color

      this.velocityX = -(this.velocityX); //problem might be when velocity for x or y is the same sign
      this.velocityY = -(this.velocityY);

      ball.velocityX = -(ball.velocityX);
      ball.velocityY = -(ball.velocityY);
      
    }
  }

 })
}



while (balls.length < 21){
  let size = random(10,20);
  let ball = new Ball(random(0 + size, width - size),random(0 + size, height - size), random(-7,7), random(-7,7), `rgb(${random(0,255)}, ${random(0,255)}, ${random(0,255)})`, size);

  balls.push(ball);
}
counter.innerHTML = `${balls.length}`;

//animation
function loop(){
  ctx.fillStyle = `rgba(0, 0, 0, 0.25)`; //background
  ctx.fillRect(0, 0, width, height);

  balls.forEach(ball => { //updating ball position
    ball.draw();
    ball.update();
    ball.collisionDetect();
  })

  requestAnimationFrame(loop);
}

loop();