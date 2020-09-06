class Food{
    constructor(){
        this.foodStock=0;
        this.lastFed;
       
        this.image=loadImage("Milk.png");
    }
    bedroom(){
        background(bedRoom,550,500);
        strokeWeight("red");
        stroke("red");
        fill("red");
        text("it's Time to go to bed",200,30);
    }

    washroom(){
        background(Washroom,550,500);
        strokeWeight("red");
        stroke("red");
        fill("red");
        text("it's Time to go to take bath",200,30);
    }

    garden(){
        background(garden,550,500);
        strokeWeight("red");
        stroke("red");
        fill("red");
        text("it's Time to go to play some games",200,30);
    }
    updateFoodStock(foodStock){ 
        this.foodStock=foodStock;
     }
     
getFoodStock(){ 
    return this.foodStock; 
}

deductFood(){ 
    if(this.foodStock>0){ this.foodStock=this.foodStock-1; 
    } 
}
getFedTime(lastFed){ 
    this.lastFed=lastFed; 
}


    display(){

        background(46,139,87);

        var x=80,y=100;

        imageMode(CENTER);
        image(this.image, 720,220,70, 70);
        
fill(255,255,254);
textSize(15);
if(lastFed>=12){
  text("last Feed : " +lastFed%12+ "PM",350,30);
} else if(lastFed==0) {
  text("last Feed : 12 Am",350,30);
} else{
  text("last Feed : "+lastFed+"AM",350,30);
}


        if(this.foodStock!=0){
            for(var i=0;i<this.foodStock;i++){
                if(i%10==0){
                    x=80;
                    y=y+50;
                }
                image(this.image,x,y,50,50);
                x=x+30;
            }
        }
    }

}
