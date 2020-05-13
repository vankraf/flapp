var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

//-----------------Images------------------//

var bg = new Image();
var fg = new Image();
var bird = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();
var fly = new Audio();
var score_audio = new Audio();

bg.src = 'img/bg.png';
fg.src = 'img/fg.png';
bird.src = 'img/bird.png';
pipeUp.src = 'img/pipeUp.png';
pipeBottom.src = 'img/pipeBottom.png';
fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";

//-------------------var--------------------//

var
  posX = 40,
  posY = 0,
  space = 80,
  score = 0,
  Ypipe = -pipeUp.height + Math.floor(Math.random() * pipeUp.height),
  Xpipe = canvas.width,
  gravity = 1.5,
  max = 0,
  up = 25;

//--------------------Event---------------------//

document.addEventListener('keydown', moveUp);

//--------------------pipes---------------------//

pipe = [];
pipe[0] = {
  x: canvas.width,
  y: -pipeUp.height + Math.floor(Math.random() * pipeUp.height)
};


//--------------------function---------------------//

function moveUp() {
  posY -= up;
  fly.play();
}

function draw() {
  ctx.drawImage(bg, 0, 0);


  for (var i = 0; i < pipe.length; i++) {


    ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeBottom, pipe[i].x, pipeUp.height + space + pipe[i].y);


    pipe[i].x -= 1;
    if (pipe[i].x == 105) {
      pipe.push({
        x: canvas.width,
        y: -pipeUp.height + Math.floor(Math.random() * pipeUp.height)
      });
    }

    if (pipe[i].x == 40) {
      score++;
      if (score >= max)
        max = score;
      score_audio.play();
    }
    ctx.drawImage(bird, posX, posY);




    if (posY + bird.height >= cvs.height - fg.height ||
      posX + bird.width >= pipe[i].x &&
      posX <= pipe[i].x + pipeUp.width &&
      (posY <= pipe[i].y + pipeUp.height ||
        posY + bird.height >= pipe[i].y + pipeUp.height + space)) {
      location.reload();
    }
  }
  posY += gravity;
  ctx.drawImage(fg, 0, cvs.height - fg.height);
  ctx.fillStyle = "#000";
  ctx.font = "24px Verdana";
  ctx.fillText("Счет: " + score, 10, cvs.height - 20);
  //ctx.fillText("Рекорд: " + max, 10, cvs.height - 20);
  requestAnimationFrame(draw);
}


pipeBottom.onload = draw;
