//Create variables here
var dog, happyDog, database, foodS, foodStock;

function preload()
{
  //load images here
  Dog=loadImage("images/dog.png");
	HappyDog=loadImage("images/dogimg.png");
}

function setup() {
  createCanvas(800, 800);
  database = firebase.database();

 dog = createSprite(400,500,5,5);
 dog.addImage(Dog);

  
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
background(46, 139, 87);

if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
 happyDog.addImage(HappyDog);
}
  drawSprites();
  //add styles here
  stroke(255);
  textSize(30);
  fill("red");
text("Note : press UP_ARROW to feed dog",150,40);

stroke(255);
textSize(40);
fill("yellow");
text("food: " + foodS,200,200);
}

function readStock(data){
  foodS = data.val();
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