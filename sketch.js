
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

var stone, stoneImg;
var tree, treeImg;
var boy, boyImg;
var kamen, kamenChain;

function preload()
{
	boyImg=loadImage("boy.png");
	treeImg=loadImage("tree.png");
}

function setup() {
	createCanvas(800, 700);


	engine = Engine.create();
	world = engine.world;

	mango1 = new Mango(500, 400, 50, 50);
	mango2 = new Mango(500, 500, 50, 50);
	mango3 = new Mango(650, 500, 50, 50);
	mango4 = new Mango(750, 400, 50, 50);

	tree = createSprite(600, 500, 10, 10)
	tree.addImage(treeImg, "tree");
	tree.scale = 0.3;

	boy = createSprite(200, 650, 10, 10)
	boy.addImage(boyImg, "boy");
	boy.scale = 0.07;

	kamen = new Stone(200, 200, 50, 50);
	kamenChain = new SlingShot(kamen.body, {x:170, y:630});

	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  background("cyan");

  detectCollision(kamen,mango1);
  detectCollision(kamen,mango2);
  detectCollision(kamen,mango3);
  detectCollision(kamen,mango4);

  kamen.display();

  mango1.display();
  mango2.display();
  mango3.display();
  mango4.display();
  
  drawSprites();

}

function keyPressed(){
	if(keyCode === 32){
		Matter.Body.setPosition(kamen.body, {x:170, y:630})
		kamenChain.attach(kamen.body)
	}
}

function mouseDragged(){
    Matter.Body.setPosition(kamen.body, {x: mouseX , y: mouseY});
}


function mouseReleased(){
    kamenChain.fly();
}

function detectCollision(lkamen, lmango){
	mangoBodyPosition=lmango.body.position
	kamenBodyPosition=lkamen.body.position

	var distance=dist(kamenBodyPosition.x, kamenBodyPosition.y, mangoBodyPosition.x, mangoBodyPosition.y)
		if(distance<=lmango.r+lkamen.r)
		{
			Matter.Body.setStatic(lmango.body,false);
		}
}



