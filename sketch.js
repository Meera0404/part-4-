var PLAY = 1;
var END = 0;
var gameState = PLAY;
var clouds,cloud,cloud1,cloud2,cloudimg;
var chimmy,chimmyimg;
var backgimg,backg;
var bt21,bt21img;
var eagle,eagleimg;
var obs,obsgroup;
var bird,birdimg;


function preload(){
  backgimg  = loadImage("images/blue.png");  
  bt21img   = loadImage("images/pc.png");  
  eagleimg  = loadImage("images/1.png")
  cloudimg  = loadImage("images/cloud.png");
  birdimg   = loadImage("images/bird.png");
  
}

function setup(){
  createCanvas(1300,700);

  backg = createSprite(1000,1000,10,10);
  backg.addImage(backgimg);
  backg.scale = 4;
  backg.velocityX = -4;

  bt21 = createSprite(200,300,20,20);
  bt21.addImage(bt21img);
  bt21.scale = 1.8;
  bt21.debug = true;
  bt21.setCollider("circle",0,0,50);

  clouds   = new Group();
  obsgroup = new Group();

  


}

function draw(){
background(backgimg)

if(gameState === PLAY){
  
  if(backg.x<0){
    backg.x = backg.width/2;
  }

  if(keyDown("up")){
    bt21.velocityY = -3;
  }
  bt21.velocityY = bt21.velocityY-0.1 ;


  if(keyDown("down")){
    bt21.velocityY = 3;
  }
  bt21.velocityY = bt21.velocityY+0.1 ;

  spawnClouds();
  spawnObs();

  if(obsgroup.isTouching(bt21)){
    gameState = END;
  }
}
  drawSprites(); 

  if(gameState === END){
    backg.velocityX = 0;
    bt21 .velocityY = 0;
    obsgroup.setVelocityXEach(0); 
    clouds.setVelocityXEach(0); 
  }
}

function spawnClouds() {
  if (frameCount % 60 === 0) {
    var cloud = createSprite(1000,200,40,10);
    cloud.y   = Math.round(random(80,700));
    cloud.addImage(cloudimg);
    cloud.velocityX = -3;     
    cloud.lifetime = 400;
    cloud.depth = bt21.depth;
    bt21.depth  = bt21.depth + 1;
    clouds.add(cloud);
  }
}

function spawnObs() {
  if (frameCount % 300 === 0) {
    var obs = createSprite(1000,200,40,10);
    obs.addImage(birdimg);
    obs.y   = Math.round(random(800,200));
    obs.scale = 0.3;
    obs.velocityX = -5;     
    obs.lifetime = 400;
    obs.depth   = bt21.depth;
    bt21.depth  = bt21.depth + 1;
    obsgroup.add(obs);
}
}