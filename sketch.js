var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
 
var particles = [];
var plinkos = [];
var divisions =[];
var divisionHeight=300;
var score =0;
var gameState = "start";
var count = 0;

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);

  //create division objects
  for (var k = 0; k <=width; k = k + 80) {
    divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
  }



  //create 1st row of plinko objects
  for (var j = 70; j <=width; j=j+50) { 
    plinkos.push(new Plinko(j,70));
  }

  //create 2nd row of plinko objects
  for (var j = 45; j <=width-10; j=j+50) 
  {
    plinkos.push(new Plinko(j,170));
  }

  for (var j = 20; j <=width-10; j=j+50) 
  {
    plinkos.push(new Plinko(j,270));
  }

  //create 3rd row of plinko objects
  for (var j = 5; j <=width-10; j=j+50) 
  {
    plinkos.push(new Plinko(j,370));
  }
  
  //create 4th row of plinko objects
  for (var j = -20; j <=width-10; j=j+50) 
  {
    plinkos.push(new Plinko(j,475));
  }

  //create particle objects
  
    
}
 


function draw() {
  background("black");
  textSize(20)
 
  Engine.update(engine);
  ground.display();

  if(frameCount %60 === 0){
    particles.push(new Particle(random(width/2-30,width/2+30),10,10));
  }

  textSize(20);
  text("score"+score,50,50);

  textSize(30);
  text(" 500 ", 5, 550);
  text(" 500 ", 80, 550);
  text(" 500 ", 160, 550);
  text(" 500 ", 240, 550);
  text(" 100 ", 320, 550);
  text(" 100 ", 400, 550);
  text(" 100 ", 480, 550);
  text(" 200 ", 560, 550);
  text(" 200 ", 640, 550);
  text(" 200 ", 720, 550);

  if(gameState ="over"){

    textSize(100);
    fill("red");
    text("game over",400,400);

  }
  if(particles!=null)
  {
     particles.display();
      
      if (particles.body.position.y>760)
      {
           
  if (particles.body.position.x < 300) 
            {
                score=score+500;      
                particles=null;
               
   if ( count>= 5) gameState ="end";                          
            }


            else if (particles.body.position.x < 600 && particles.body.position.x > 301 ) 
            {
                  score = score + 100;
                  particles=null;
}      
            
      }

    }

  
  //display the plinkos 
  for (var i = 0; i < plinkos.length; i++) {
    plinkos[i].display();   
  }

 // for (var h = 0; h < plinkos.length; h++) {
   // plinkos[h].display();   
  //}
   
  //display the divisions
  for (var k = 0; k < divisions.length; k++) {
    divisions[k].display();
  }

  for (var k = 0; k < particles.length; k++) {
    particles[k].display();
  }

  

  //display the paricles 

}

function mousePressed()
{
  if(gameState!=="end")
  {
      count++;
     particles=new Particle(mouseX, 10, 10, 10); 
  }   
}