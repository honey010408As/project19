var monkey, monkeyImage, obstacle, obstacleGroup, obstacleImage, bg, bgImage, banana, bananaImage, score, IG, bananaGroup, bg2, bg2Img, Play, PlayImg, back, backImg, back2, back2Img;

var die = 0;

var score = 0;

var condition = 220;

var GameOver, gameOverImg;

var back, backImg;

var gameState = "Menu";

var jump, hit, score;

var lost, lostImg;


function preload() {
  bgImage = loadImage("jungle.jpg");
  monkeyImage = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  obstacleGroup = new Group();
  bananaGroup = new Group();
  gameOverImg = loadImage("GameOver.png");
  backImg = loadImage("Back.png");
  bg2Img = loadImage("bg2.jpg");
  PlayImg = loadImage("Play.png");
  lostImg = loadImage("lost.jpg");
  backImg = loadImage("Back.png");
  back2Img = loadImage("restart.png");

}

function setup() {
  createCanvas(400, 300);
  bg = createSprite(200, 150, 20, 20);
  bg.addImage(bgImage);
  bg.scale = 1.8;
  bg.velocityX = -15;
  bg.x = bg.width / 2;
  monkey = createSprite(50, 260, 20, 20);
  monkey.scale = 0.1;
  monkey.addAnimation("monkey", monkeyImage);
  monkey.velocityY = 0;
  IG = createSprite(0, 270, 400, 5);
  IG.visible = false;
  GameOver = createSprite(200, 100, 20, 20);
  GameOver.addImage(gameOverImg);
  GameOver.scale = 0.2;
  score = 0;
  GameOver.visible = false;
  bg2 = createSprite(200, 200, 20, 20);
  bg2.addImage(bg2Img);
  bg2.scale = 0.3;
  Play = createSprite(200, 200, 20, 20);
  Play.addImage(PlayImg);
  Play.scale = 0.5;
  lost = createSprite(200, 150, 20, 20);
  lost.addImage(lostImg);
  lost.scale = 0.3;
  back = createSprite(55, 30, 20, 20);
  back.addImage(backImg);
  back.scale = 0.2;
  back2 = createSprite(200, 220, 20, 20);
  back2.addImage(back2Img);
  back2.scale = 0.13;
  jump = loadSound("Jump.mp3");
  hit = loadSound("die.mp3");
  score1 = loadSound("checkPoint.mp3");
}


function draw() {

        switch (score) {
        case 10:
          monkey.scale = 0.12;
          break;
        case 20:
          monkey.scale = 0.14;
          break;
        case 30:
          monkey.scale = 0.16;
          break;
        case 40:
          monkey.scale = 0.18;
          break;
        default:
          break;
      }
  
  if (gameState == "Menu") {
    bg2.display();
    bg2.visible = true;
    Play.display();
    Play.visible = true;
    if (mousePressedOver(Play) && gameState == "Menu") {
      gameState = "Game";
      bg2.visible = false;
      Play.visible = false;
      bg.visible = true;
      monkey.visible = true;
      score = 0;

    }
  }

  if (gameState == "Game") {

    IG.y = 270;
    condition = 220;
    monkey.display();
    monkey.visible = true;
    monkey.collide(IG);
    back2.visible = false;
    bg2.visible = false;
    lost.visible = false;
    Play.visible = false;
    if (bg.x < 0) {
      bg.x = bg.width / 2;
    }

    if (keyDown("space") && monkey.y > condition) {
      monkey.velocityY = -12;
      jump.play();
    }
    monkey.velocityY = monkey.velocityY + 0.8;
    monkey.collide(IG);
    drawSprites();
    if (gameState == "Game") {
      Banana();
      Obstacles();
    }

    if (obstacleGroup.isTouching(monkey)) {
      monkey.scale = 0.1;
      die = die + 1;
      hit.play();

      if (die > 20) {
        gameState = "Lost";
      }





    }

    textSize(20);
    textFont("Verdana");
    textStyle("bold");
    textStyle("italic");
    fill(255);
    stroke(255);
    text("Score :  " + score, 250, 50);

    if (bananaGroup.isTouching(monkey)) {
      score = score + 2;
      bananaGroup.destroyEach();
      score1.play();
    }

    if (mousePressedOver(back)) {
      gameState = "Menu";
      bg.visible = false;
      monkey.visible = false;
      bg2.depth = bg2.depth + 2;
    }

    if (mousePressedOver(back)) {
      gameState = "Menu";
      bg.visible = false;
      monkey.visible = false;
      bg2.depth = bg2.depth + 2;
      bg2.y = 150;
    }

  }

  if (gameState == "Lost") {
    IG.display();
    IG.visible = false;
    monkey.display();
    monkey.visible = false;
    monkey.collide(IG);
    condition = 220;
    lost.display();
    lost.visible = true;
    back2.display();
    back2.visible = true;
    if (mousePressedOver(back2) && gameState == "Lost") {
      gameState = "Game";
      back.x = 55;
      back.y = 30;
      back2.visible = false;
      lost.visible = false;
      score = 0;
    }

  }

}

function Banana() {
  if (frameCount % 60 === 0) {
    banana = createSprite(400, random(100, 220), 20, 20);
    banana.addImage(bananaImage);
    banana.velocityX = -3
    banana.lifetime = 133;
    banana.scale = 0.05;
    bananaGroup.add(banana);
    if (die > 20) {
      banana.visible = false;
    }
    if (mousePressedOver(back2) && gameState == "Lost") {
      banana.visible = true;
    }

    if (gameState == "Game") {
      banana.visible = true;
      monkey.visible = true;
    }
  }
}

function Obstacles() {
  if (frameCount % 150 === 0) {
    obstacle = createSprite(350, 250, 20, 20);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -6;
    obstacle.lifetime = 67;
    obstacle.scale = 0.25;
    obstacle.setCollider("circle", 0, 0, 150);
    obstacleGroup.add(obstacle);
    if (die > 20) {
      obstacle.visible = false;
    }
    if (mousePressedOver(back2) && gameState == "Lost") {
      obstacle.visible = true;
    }

    if (gameState == "Game") {
      obstacle.visible = true;
      monkey.visible = true;
    }
  }
}