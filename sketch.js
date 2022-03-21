scoreR = 5;
score=0;

var gameState="none"
function preload(){
  rocketImg=loadImage("rocketship.png")
  backgroundImg=loadImage("galaxyback.jpg");
  alienImg=loadImage("alienob.png");
  click=loadSound("click.wav");
  playButtonImg=loadImage("play.png");
  startBackgroundImg=loadImage("spaceback.png")
  shootButtonImg=loadImage("shoot.png");
  bulletImg=loadImage("laserreal.png");
  killShot=loadSound("killshot.mp3")
  meteorImg=loadImage("meteior.png");
  gameOverImg=loadImage("gameover.png");
  boomImg=loadImage("boomreal.png");
  restartImg=loadImage("buttonr.png")

}
var invisible;
function setup(){
  
   createCanvas(windowWidth,windowHeight)
   
   backgroundSprite=createSprite(width/2,height/2);
   backgroundSprite.addImage(backgroundImg);
   backgroundSprite.scale=1.2;
   rocket=createSprite(width/2,height-100);
   rocket.addImage(rocketImg);
   rocket.scale=0.4;
   
   startBackground=createSprite(width/2,height/2-100);
   startBackground.addImage(startBackgroundImg)
   startBackground.scale=2.29;
   
   playButton=createSprite(width/2,height/2+200);
  playButton.addImage(playButtonImg);
  playButton.scale=0.65;

  
  gameOver=createSprite(width/2,height/2-80,30,30);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.7;
  gameOver.visible=false;
  restart=createSprite(gameOver.x+0,height/2+20);
  restart.addImage(restartImg)
  restart.scale=0.8
 
  restart.visible=false
 
   bulletGroup=new Group();
   alienGroup=new Group();
   meteorGroup=new Group();

rocket.setCollider("rectangle",0,0,150,340)


boom=createSprite(rocket.x,rocket.y)
boom.addImage(boomImg)
boom.scale=0.7;
boom.visible=false
edges=createEdgeSprites()


}
function draw(){
  rocket.bounceOff(edges[0])
  rocket.bounceOff(edges[1])
  rocket.bounceOff(edges[2])
  rocket.bounceOff(edges[3])
  background("grey");
  if(gameState==="none"){
  
if(mousePressedOver(playButton)){

  click.play();
  gameState="play";


}
drawSprites()
  }
if(gameState==="play"){
  gameOver.visible=false;
    restart.visible=false;
    boom.visible=false;
  
    rocket.visible=true;
  invisible= createSprite(0,height+63,width+3000,10)
 for(var a=0;a<meteorGroup.length;a++){
   var temp=meteorGroup.get(a);
   if(temp.isTouching(invisible)){
     temp.destroy();
     scoreR--
   }
 }
 for(var i=0;i<alienGroup.length;i++){
  var tempa=alienGroup.get(i);
  if(tempa.isTouching(invisible)){
    tempa.destroy();
    scoreR--
  }
}
 
  playButton.destroy()
 startBackground.destroy()
  backgroundSprite.velocityY=3;
  shootButton=createSprite(width-90,height-110);
  shootButton.visible=false;
  shootButton.addImage(shootButtonImg)
  shootButton.scale=0.3
  shootButton.visible=true;
  if(mousePressedOver(shootButton)){
    click.play();
    bullet=createSprite(rocket.x-15,rocket.y-80);
    bullet.velocityY=-3
    if(bullet.isTouching(bullet)){
      bullet.destroy();
      
    }
    bulletGroup.add(bullet)
    bullet.addImage(bulletImg);
    bullet.scale=0.3
    bullet.depth=rocket.depth;
    rocket.depth=rocket.depth+1
  }

  if(bulletGroup.isTouching(alienGroup)){
    alienGroup.destroyEach();
    bulletGroup.destroyEach();
    killShot.play();
    score++

  }
  
  if(bulletGroup.isTouching(meteorGroup)){
    meteorGroup.destroyEach();
    bulletGroup.destroyEach();
    killShot.play()
    score++
  }

if(keyDown("right")){
  rocket.x=rocket.x+8;

}
if(keyDown("left")){
  rocket.x=rocket.x-8
}

if(backgroundSprite.y>height-50){
  backgroundSprite.y=height/15
}
invisible.visible=true

if(alienGroup.isTouching(rocket)){
  gameState="end"
  alienGroup.destroyEach()
 boom.visible=true
  rocket.visible=false
  
  if(mousePressedOver(restart)){
    gameState="play"
    
    
  

  }
  
}
if(meteorGroup.isTouching(rocket)){
  gameState="end"
  meteorGroup.destroyEach()
  boom.visible=true
  
  rocket.visible=false
  
 
}

number = Math.round(random(1,2))
switch(number){
  case 1 : alienSprite();
                   break;
  case 2  : meteorSprite();
                   break;

  default : break;


             
}
if(scoreR===0){
  gameState="end"
  if(mousePressedOver(restart)){
    click.play()
    gameState="play"
    
    
  
  
  }
  

}


  drawSprites()
  stroke("white");
fill("white");
textSize(20);
text("Meteor and Alien Destoyed: "+score,20,30);
text("Chances Remaining: "+scoreR,380,30)
}
if(gameState==="end"){
  meteorGroup.destroyEach()
  alienGroup.destroyEach()
  meteorGroup.setVelocityYEach(0)
  alienGroup.setVelocityYEach(0)
  backgroundSprite.velocityY=0;
 gameOver.visible=true
 restart.visible=true
boom.x=rocket.x
boom.y=rocket.y
 if(mousePressedOver(restart)){
  click.play()
  gameState="play"
  scoreR=5
  score=0
  


}
drawSprites()
}

}
function alienSprite(){
  
  if(frameCount%Math.round(random(100,150))===0){
    alien=createSprite(Math.round(random(50,width-150)),-17);
    alien.addImage(alienImg);
    alien.scale=0.2;
    alien.velocityY=3
    shootButton.depth=alien.depth;
    alien.depth=alien.depth+1;
    alienGroup.add(alien);
    alien.lifeTime=height+20;
    //alien.debug=true;
    alien.setCollider("circle",0,0,170)
    
   
   
    

  }
}
function meteorSprite(){
  invisible= createSprite(0,height+13,width,10)
  if(frameCount%Math.round(random(100,150))===0){
  meteor=createSprite(Math.round(random(50,width-150)),-17);
  meteor.addImage(alienImg);
  meteor.scale=0.2;
  meteor.velocityY=3
  meteor.addImage(meteorImg)
  shootButton.depth=meteor.depth;
  shootButton.depth=shootButton.depth+1;
  meteorGroup.add(meteor)
  meteor.lifeTime=height+20
  //meteor.debug=true;
  meteor.setCollider("circle",0,0,100)
 
}
}


   
 
