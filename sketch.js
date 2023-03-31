var rocket, rocketImg;
var background, backgroundImg;
var blackhole, blackholeImg, blackholesGroup;
var asteroid, asteroidImg, asteroidsGroup;
var gameState = "play"

function preload(){
rocketImg = loadImage("rocket.png");
starImg = loadImage("star.png");
backgroundImg = loadImage("background.jpg");
blackholeImg = loadImage("blackhole.png");
asteroidImg - loadImage("Asteroid.png"); 
}

function setup() {
 createCanvas(600,600);
 background = createSprite(300,300);
 background.addImage("background",backgroundImg);
 //background.scale = ;
 background.velocityY = 4;

 asteroidsGroup = new Group();
 blackholesGroup = new Group();
 starGroup = new Group();
 
 rocket = createSprite(305,500,50,50);
 rocket.addImage("rocket", rocketImg);
 rocket.scale = 0.33;
}

function draw() {
 //background(0);
 if (gameState === "play"){
    if(keyDown("left_arrow")){
        rocket.x = rocket.x - 3;
    }

    if(keyDown("right_arrow")){
        rocket.x = rocket.x + 3;
    }

    if(keyDown("space")){
        rocket.velocityY = -10;
    }

    rocket.velocityY = rocket.velocityY + 0.8

    if(background.y > 500){
        background.y = 400
    }
    spawnObstycles();

    //obstycle destroy
    if(blackholesGroup.isTouching(rocket) || rocket.y > 600){
        rocket.destroy();
        gameState = "end"
    }
    if(asteroidsGroup.isTouching(rocket) || rocket.y > 600){
        rocket.destroy();
        gameState = "end"
    }

    drawSprites();
 }

 if (gameState === "end"){
    stroke("yellow");
    FileList("yellow");
    textSize(30);
    text("Game Over", 230, 250);
 }

}

function spawnObstycles(){
    if (frameCount % 240 === 0){
        var blackhole = createSprite(200,-50);
        var asteroid = createSprite(300,150);

        blackhole.x = Math.round(random(120,400));
        asteroid.x = blackhole.x;

        blackhole.addImage(blackholeImg);
        asteroid.addImage(asteroidImg);

        blackhole.velocityY = 1;
        asteroid.velocityY = 1;

        rocket.depth = asteroid.depth;
        rocket.depth = blackhole.depth;
        rocket.depth +=1;

        //blackhole.lifetime = 800;
        //asteroid.lifetime = 800;

        blackholesGroup.add(blackhole);
        asteroidsGroup.add(asteroid);
    }
}