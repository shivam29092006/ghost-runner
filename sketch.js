var tower, towerImage

var door, doorImage, doorGroup

var climber, climberImage, climberGroup

var ghost, ghostImage

var invisible, invisibleGroup

var gameState = "play"

function preload (){

  towerImage = loadImage("tower.png")
  
  doorImage = loadImage("door.png")
                         
  climberImage = loadImage("climber.png")

  ghostImage = loadImage("ghost-standing.png")
}

function setup (){
  
createCanvas(600,600)
  
tower = createSprite(300,300);
tower.addImage(towerImage);  
tower.velocityY = 2
  
doorGroup = new Group();  
  
climberGroup = new Group();
  
invisibleGroup = new Group();  
  
ghost = createSprite(200,200,50,50);
ghost.addImage(ghostImage);
ghost.scale = 0.3;
}

function draw (){
  
background(0);
  
if(gameState === "play"){ 

if(tower.y > 400){
  tower.y = 300}  
  
if(keyDown("left")){
  
  ghost.x = ghost.x - 3;
}
  
if(keyDown("right")) {
  
  ghost.x = ghost.x + 3;
} 
  
if(keyDown("space")) {
  
  ghost.velocityY = -3;
}  
  ghost.velocityY = ghost.velocityY+0.8;

if(invisibleGroup.isTouching(ghost)|| ghost.y > 600){
  
  ghost.destroy();
  
  gameState = "end";
  
}
spawnDoor();
    
drawSprites();
    
}
  
if(gameState === "end"){
  
  text("gameOver", 230,250);
}  
  
}

function spawnDoor (){
  
  if(frameCount% 60 === 0){
    
    door = createSprite(200,50);
    door.addImage(doorImage);
    door.x = Math.round(random(120,400));
    door.velocityY = 2;
    door.liftime = 700;
    doorGroup.add(door);
   
    climber = createSprite(200,120);
    climber.addImage(climberImage);
    climber.velocityY = 2;
    climber.x = door.x;
    climber.lifetime = 700;
    climberGroup.add(climber);
    
    invisible = createSprite(200,125);
    invisible.width = climber.width
    invisible.height = 2;
    invisible.velocityY = 2;
    invisible.x = door.x
    invisibleGroup.add(invisible);
    invisible.debug = true;
    
    ghost.depth = door.depth
    ghost.depth = ghost.depth + 1;
  }
}