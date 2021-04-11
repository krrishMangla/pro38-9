var PLAY  = 1;
var END = 0;
var gameState = PLAY;

var player,pIMG;
var c1;
var c1IMG,c2IMG,c3IMG;

var invisibleGround;

var bg,bgIMG;

var score = 0;

var cyclerG; 

var gameOver,gameOverIMG;

function preload()
{
    pIMG = loadAnimation("cycler1.png");

    c1IMG = loadImage("cycler2.png");
    c2IMG = loadImage("cyccler3.png");
    c3IMG = loadImage("cycler4.png");

    gameOverIMG = loadImage("gameOver.png");

    bgIMG = loadImage("track.jpg");

}


function setup()
{
  var canvas = createCanvas(windowWidth,windowHeight);
 
    bg = createSprite(displayWidth*1.5,393,displayWidth,displayHeight);
    bg.addImage("bgImage",bgIMG);
    bg.velocityX = -7; 
    
    player = createSprite(200,300);
    player.addAnimation("plrIMG",pIMG);
    player.scale = 0.18;
    //player.debug= true;
    player.setCollider("rectangle",0,0,900,900);

    gameOver = createSprite(800,300,20,20);
    gameOver.addImage(gameOverIMG);
    gameOver.scale = 4;
 
    cyclerG = createGroup();


}


function draw()
{
  background(1);
    
    if(gameState === PLAY) 
    {
       
      gameOver.visible  = false;
      if(bg.x < 100)
       {
        bg.x = displayWidth*1.5;
       }
    
    
       if(keyDown("UP_ARROW") && player.y > 110)
       {
        player.y -= 3 
       }
       if(keyDown("DOWN_ARROW") && player.y < 550)
       {
        player.y += 3 
       }
       if(keyDown("RIGHT_ARROW") && player.x < 1500)
       {
        player.x += 3 
       }
       if(keyDown("LEFT_ARROW") && player.x > 80)
       {
        player.x -= 3 
       }
     
         spawnCyclers();     
         
        if(cyclerG.isTouching(player))
        {
          gameState= END;

        }
    }
    if(gameState === END) 
    {
      player.visible = false;
      
      background("lightGrey");

      gameOver.visible = true;
      
      bg.velocityX = 0;
      bg.visible = false; 
      
      cyclerG.setVelocityXEach(0);
      cyclerG.destroyEach();
    } 
    
    
  drawSprites();

  if (gameState === END)
  {
    stroke("red");
    fill("black");
    textSize(50); 
    text("Salman Khan Again!!",550,500) 
  }
}

function spawnCyclers()
{
  
 if(frameCount % 250 === 0)
 {
  c1 = createSprite(500,500,20,20);
  c1.velocityX = 3;
  c1.x = Math.round(random(80,90));
  c1.y = Math.round(random(110,550));
   
    var rand = Math.round(random(1,3))
    switch(rand)
    {
      case 1: c1.addImage(c1IMG);
              c1.scale = 0.35;
              c1.setCollider("rectangle",0,0,500,440);
        break;
      case 2: c1.addImage(c2IMG);
              c1.x = Math.round(random(1450,1500));
              c1.scale = 0.25;
              c1.setCollider("rectangle",0,0,500,580);
              c1.velocityX = -3;
         break;
      case 3: c1.addImage(c3IMG);
              c1.scale = 0.45;     
              c1.setCollider("rectangle",0,0,270,350);
        break;         
    }

    cyclerG.add(c1);
 }
}