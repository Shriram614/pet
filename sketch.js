//Create variables here
var dog, happyDog, database, foodS, foodStock,milk1;
var feed,addFood;
var feedTime,lastFed;
var foodObj,readGameState,changingGameState;
var Washroom,bedRoom,garden;

function preload()
{
  //load images here
  Dog=loadImage("dog.png");
  HappyDog=loadImage("dogimg.png");
  Washroom=loadImage("Wash Room.png");
  bedRoom=loadImage("Bed Room.png");
  garden=loadImage("Garden.png");
  sadDog=loadImage("deadDog.png")
 
}

function setup() {
  createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();

 dog = createSprite(500,500,5,5);
 dog.addImage(Dog);

 foodObj = new Food();

 feed=createButton("Feed The Dog");
 feed.position(700,95);
 feed.mousePressed(feedDog);
 feed.mouseReleased(FeedDog);

 addFood=createButton("addfood");
 addFood.position(800,95);
 addFood.mousePressed(addFoods);

rect(670,120,40,80);
  
  foodStock = database.ref('food');
  foodStock.on("value",readStock);

  readGameState=database.ref('gameState');
  readGameState.on("value",function(data){
    gameState=data.val();
  });
}


function draw() {  

background(46, 139, 87);
foodObj.display();

feedTime= database.ref('feedTime');
feedTime.on("value",function(data){
  lastFed= data.val();
});

fill(255,255,254);
textSize(15);
if(lastFed>=12){
  text("last Feed : " +lastFed%12+ "PM",350,30);
} else if(lastFed==0) {
  text("last Feed : 12 Am",350,30);
} else{
  text("last Feed : "+lastFed+"AM",350,30);
}

if(gameState!="Hungry"){
  feed.hide();
  addFood.hide();
  dog.remove();
}else{
  feed.show();
  addFood.show();
  dog.addImage(sadDog);
}
currentTime=hour();
if(currentTime==(lastFed+1)){
  update("Playing");
  foodObj.garden();
}else if(currentTime==(lastFed+2)){
  update("Sleeping");
  foodObj.bedRoom();
}else if(currentTime==(lastFed+2)&& currentTime==(lastFed+4)){
  update("Bathing");
  foodObj.Washroom();
}else{
  update("Hungry");
  foodObj.display();
}


  drawSprites();
  //add styles here
  

stroke(255);
textSize(40);
fill("yellow");
text("food: " + foodS,380,150);

strokeWeight(4);
stroke(46, 139, 87);
fill(46, 139, 87);
rect(700,110,190,140);
stroke(255);
textSize(40);
;

}

function update(state){
  database.ref('/').update({
    gameState:state
  });
}
function feedDog(){
dog.addImage(HappyDog);
dog.x=100;
dog.y=460;

foodObj.updateFoodStock(foodObj.getFoodStock()-1);
database.ref('/').update({
 food: foodObj.getFoodStock(),
 feedTime:hour()
})
}

function FeedDog(){
  dog.x=500;
  dog.y=500;
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    food:foodS
  })
dog.addImage(Dog);
}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function writeStock(x){

if(x<=0){
  x=0;
}else{
  x=x-1;
}
  database.ref('/').update({
    'Food':x
  })
}