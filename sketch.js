let ground;
let lander;
var lander_img;
var bg_img;
var obstaclesGroup
var gameOver_img
var gameOver
var score=0
var reset
var reset_img

var vx = 0;
var g = 0.05;
var vy = 0;
var PLAY=1
var END =0
var gameState=PLAY
var obs1,obs2
var obstacle
function preload()
{
  lander_img = loadImage("normal.png");
  bg_img = loadImage("bg.png");
  obs1 = loadImage("1.png");
  obs2 = loadImage("2.png");
  gameOver_img = loadImage("3.png");
  reset_img = loadImage("4.png");
}

function setup() {
  createCanvas(1000,700);
  frameRate(80);

  lander = createSprite(100,50,30,30);
  lander.addImage(lander_img);
  lander.scale = 0.1;
 ground= createSprite(500,660,1000,50)
 obstaclesGroup=new Group ()
lander.debug=false

lander.setCollider("rectangle",0,0,100,200);

gameOver= createSprite(450,400)
 gameOver.addImage(gameOver_img)

 reset= createSprite(450,500)
 reset.addImage(reset_img)

  rectMode(CENTER);
  textSize(15);
}

function draw() 
{
  background(51);
  image(bg_img,0,0);
  push()
  fill(255);
  text(" score : "+score,800,75);
  pop();
  lander.collide(ground);
  if (gameState==PLAY) {
    score = score + Math.round(getFrameRate()/60);
    gameOver.visible=false
    reset.visible=false
  if(keyDown("left")) {
    lander.x=lander.x-4
  }

  if(keyDown("right")) {
    lander.x=lander.x+4
  }

  if(keyDown("up")) {
    lander.y=lander.y-4
  }

  if(keyDown("down")) {
    vy +=g;
  lander.position.y+=vy;
  }
  spawnObstacles()

}
  if(obstaclesGroup.isTouching(lander)){
    gameState = END;
}
else if (gameState === END) {
 // ground.velocityX = 0;
 
 gameOver.visible=true
reset.visible=true

 obstaclesGroup.setVelocityXEach(0);
 //cloudsGroup.setVelocityXEach(0);
 //trex.changeAnimation("collided",trex_collided)
 obstaclesGroup.setLifetimeEach(-1)
}

if (mousePressedOver(reset)){
Reset()
}

  //fall down
  
  drawSprites();
}
  function spawnObstacles(){
    if (frameCount % 60 === 0){
       obstacle = createSprite(500,165,10,40);
      obstacle.velocityX = -6;
       obstacle.x = Math.round(random(1,1000));
       obstacle.y = Math.round(random(1,700));

       obstacle.debug=true

  obstacle.setCollider("rectangle",0,0,300,400);
       //generate random obstacles
       var rand = Math.round(random(1,2));
       switch(rand) {
         case 1: obstacle.addImage(obs1);
                 break;
         case 2: obstacle.addImage(obs2);
         break;
         default: break;
       }
      
       //assign scale and lifetime to the obstacle           
       obstacle.scale = 0.4;
       obstacle.lifetime =600;
      
      //add each obstacle to the group
    
       obstaclesGroup.add(obstacle);

    }
   }
function Reset (){
gameState=PLAY
score=0
gameOver.visible=false
reset.visible=false
obstaclesGroup.destroyEach()
}


