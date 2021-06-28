var corona,corona1,corona2,corona3,corona4,corona5,coronaGroup,warrior,warriorImage,warriorCough,warrior_dead,bg,spray,sprayImage,cash,cashImage,cashGroup,spraySound,cashSound;
var health = 100;
var volume = 100;
var money = 0;
var button;
var PLAY = 0;
var END = 1;
var gameState = PLAY;

function preload (){
  warriorImage = loadImage("warrior.png");

  corona1 = loadImage("virus1.png");
  corona2 = loadImage("virus2.png");
  corona3 = loadImage("virus3.png");
  corona4 = loadImage("virus4.png");
  corona5 = loadImage("virus5.png");
  bg = loadImage("bg.jpg");
  sprayImage = loadImage("spray.png")
  cashImage = loadImage("cash.png");
  warrior_dead = loadImage("warrior_dead.png");
  spraySound = loadSound("spraySound.mp3");
  warriorCough = loadSound("man cough.mp3");
  cashSound = loadSound("cashSound.mp3");
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  warrior = createSprite(width/3,height-250,50,50);
  warrior.addImage(warriorImage);
 // warrior.addImage(warrior_dead);
  //warrior.debug = true;
  warrior.setCollider("rectangle",0,0,warrior.width-250,warrior.height);
  coronaGroup = new Group();
  cashGroup = new Group();
 
 }

function draw() {
  background(bg);
  textSize(30);
  fill("red");
  text("❤" + health,15,80);
  fill("green");
  rect(15,100,health*2,10);
fill("blue")
  text("🧴" + volume,15,180);
  rect(15,200,volume*2,10);
  fill("yellow")
  text("💵" + money,15,280);
  text("PRESS (SPACE) TO SPRAY",width/2,height-10)
 // if(gameState === 'PLAY'){

  
if(keyWentDown("SPACE")){
  spray = createSprite(warrior.x+300,warrior.y-120,50,50);
  spray.addImage(sprayImage);
  spray.scale = 0.5;
  spray.debug = true;
  spraySound.play();
  volume = volume-5;

}
if(keyWentUp("SPACE")){
  spray.destroy();
  spraySound.stop();
}
if(volume === 0|| volume < 0){
  volume = 0;
  spray.destroy();
}
  if(coronaGroup.isTouching(warrior)){
    health = health-20;
    coronaGroup[0].destroy();
    warriorCough.play();
  }else if(coronaGroup.isTouching(spray)){
    coronaGroup[0].destroy();
    volume = volume-20;
  }
  
  
 
  if(cashGroup.isTouching(warrior)){
    money = money + 1;
    cashGroup[0].destroy();
    cashSound.play();
  }

  if(volume === 0 && money === 3){
    button = createButton("REFILL DISINFECTENT")
    button.position(15,300);
    button.mousePressed(function(){
      volume = 100;
      money = money-3;
    
    })
  }
if(money === 0 || money < 0){
  money = 0;
  //button.hide();
}
  if(health === 0 || health < 0 ){
    health = 0;
    coronaGroup.setVelocityXEach = 0;
    textSize(40);
    fill("red")
    text("You'r dead",width/2,height/2);
   // coronaGroup[0].destroy();
    coronaGroup.setVelocityXEach(0);
    warrior.addImage(warrior_dead);
  }
//}
  spawnCash();
  spawnObstacles();  
  drawSprites();
}

function spawnObstacles(){
  if(frameCount% 100 === 0){
    corona = createSprite(width,height-300,50,50);
    corona.velocityX = -10;

    var rand = Math.round(random(1,5));
    switch(rand) {
      case 1: corona.addImage(corona1);
              break;
      case 2: corona.addImage(corona2);
              break;
      case 3: corona.addImage(corona3);
              break;
      case 4: corona.addImage(corona4);
              break;
      case 5: corona.addImage(corona5);
              break;
     default: break;
    }
    //corona.debug = true;

    corona.lifeTime = 300;
    coronaGroup.add(corona);
  }
}

function spawnCash(){
  if(frameCount%200 === 0){
    cash = createSprite(width,height-300,50,50);
    cash.velocityX = -10;
    cash.addImage(cashImage);
    cash.lifeTime = 300;
cashGroup.add(cash);
  }
}  