// Config file for game
const config = {
    width: 800,
    height: 400,
    type: Phaser.AUTO,
      physics: {
        default: 'arcade',
        arcade: {
        gravity: {y: 0},
      // use this to debug physics in system. Don't forget to add comma to conitnue statements
        //debug: true
}},
    scene: {
      preload: preload,
      create: create,
      update: update,
    }
};
// Global variables    

// Create game scene
const game = new Phaser.Game(config);

function preload() {
  console.log("hello");
};

function create() {
  this.graphics = this.add.graphics({ lineStyle: {color: 0xFFFFFF, width: 5}, fillStyle: {color: 0xFFFFFF, alpha: 1} });
  this.arcs = this.add.graphics({ lineStyle: {color: 0x000000, width: 3}, fillStyle: {color: 0x000000, alpha: 1} });  
  this.control = this.add.graphics({ lineStyle: {color: 0x00ff55, width: 1}});
  // create control bar
  this.controller = new Phaser.Geom.Line(50,100,70,100);
  this.divisionsBar = new Phaser.Geom.Line(90,100,110,100);
  this.lengthBar = new Phaser.Geom.Line(75,10,75,30);
  // turn on inputs
  this.input.on('pointerup', onPointerUp, this); 
  this.input.on('pointerdown', onPointerDown, this);
  this.speedDial = new Phaser.Geom.Line(60,50,60,250);
  this.divisionsDial = new Phaser.Geom.Line(100,50,100,250);
  this.lengthDial= new Phaser.Geom.Line(50,20,250,20);
};

//commented out until I want to work more on inputs

function onPointerMove(pointer) {
  if((pointer.x<250&&pointer.x>50)&&(pointer.y<45&&pointer.y>5)){    
    this.lengthBar.setTo(pointer.x,10,pointer.x,30);
    this.lBar = (pointer.x-50)/2;
  };  

  if((pointer.x<80&&pointer.x>40)&&(pointer.y<250&&pointer.y>50)){    
    this.controller.setTo(50,pointer.y,70,pointer.y);
    this.y = pointer.y;
  };
  if((pointer.x<120&&pointer.x>80)&&(pointer.y<250&&pointer.y>50)){
    this.divisionsBar.setTo(90,pointer.y,110,pointer.y);
    this.div=((pointer.y-50)/25)+2;
  }
  console.log('moving', pointer.x, ' ', pointer.y);
  
}

function onPointerDown(pointer)  {
  // this.x = pointer.x;
  // this.y = pointer.y;
  // Check to make sure clicked on bar. 
  this.input.on('pointermove', onPointerMove, this);

  console.log('down', pointer.x, ", ", pointer.y);
}

function onPointerUp(pointer) {
  this.input.off('pointermove', onPointerMove, this); 
  console.log('up ', pointer.x, ", ", pointer.y);
}

function spin() {  
  // Create time, spin opposite direction by changing +/- sign and speed by changing divisor
  const time = +((new Date))%360;
  this.graphics.clear();
  
  // Draw arcs  
  for(var i=0; i<3; i++){
  
  // Use these variables for adjustable portions
  var r1, r2, r3;
  var ang1, ang2, ang3;
    
  //Draw first set of 3 arcs
  this.graphics.beginPath();
  this.graphics.arc(
    config.width/2,
    config.height/2,
    config.height/2-5-60*i,
    Phaser.Math.DegToRad(-40+time+20*i),
    Phaser.Math.DegToRad(-75+time+20*i),
    true
  );
  this.graphics.strokePath();
  
  this.graphics.beginPath();
  this.graphics.arc(
    config.width/2,
    config.height/2,
    config.height/2-5-60*i-10,
    Phaser.Math.DegToRad(-40+time+20*i),
    Phaser.Math.DegToRad(-75+time+20*i),
    true
  );
  this.graphics.strokePath();
  
  this.graphics.beginPath();
  this.graphics.arc(
    config.width/2,
    config.height/2,
    config.height/2-5-60*i-20,
    Phaser.Math.DegToRad(-40+time+20*i),
    Phaser.Math.DegToRad(-75+time+20*i),
    true
  );
  this.graphics.strokePath();
  
  //Draw second set of 3 arcs, 180 degrees offset
  this.graphics.beginPath();
  this.graphics.arc(
    config.width/2,
    config.height/2,
    config.height/2-5-60*i,
    Phaser.Math.DegToRad(-40+time+20*i+180),
    Phaser.Math.DegToRad(-75+time+20*i+180),
    true
  );
  this.graphics.strokePath();
  
  this.graphics.beginPath();
  this.graphics.arc(
    config.width/2,
    config.height/2,
    config.height/2-5-60*i-10,
    Phaser.Math.DegToRad(-40+time+20*i+180),
    Phaser.Math.DegToRad(-75+time+20*i+180),
    true
  );
  this.graphics.strokePath();
  
  this.graphics.beginPath();
  this.graphics.arc(
    config.width/2,
    config.height/2,
    config.height/2-5-60*i-20,
    Phaser.Math.DegToRad(-40+time+20*i+180),
    Phaser.Math.DegToRad(-75+time+20*i+180),
    true
  );
  this.graphics.strokePath();
    
  console.log("I ran ", i, " : I made 6 small arcs");
  };
  
  // Draw white fill arcs
  for(var i=0; i<2; i++){
  this.graphics.beginPath();
  this.graphics.arc(
    config.width/2, 
    config.height/2, 
    config.height/2-2.5, 
    Phaser.Math.DegToRad(0+time+90+180*i), 
    Phaser.Math.DegToRad(-90+time+90+180*i),
    true
  );
  this.graphics.arc(
    config.width/2,
    config.height/2,
    0,Phaser.Math.DegToRad(0+time+180*i+90),
    Phaser.Math.DegToRad(-90+time+180*i+90),
    false
  );
  this.graphics.fillPath();
  console.log("I ran ", i, " : I made a large white arc");  
  };

};

function spin2 () {
  //  Try to set  this.y  with an initial value
 if(this.y==null){this.y=100,this.div = 5,this.lBar = 0};
const time = +((new Date)*(this.y/200))%360;
  // Clears the graphics
  this.graphics.clear();
  // Clears the arcs
  this.arcs.clear();
  //You must mention each one of these for them to clear. This could be useful in the future!
  
  // Use these variables for adjustable portions
  var r1, r2, r3;
  var ang1, ang2, ang3;
  // Draw black arcs  
  //   for(var i=0;i<4;i++) {
  // this.arcs.beginPath();
  // this.arcs.arc(
  //   config.width/2,
  //   config.height/2,
  //   config.height/2-22.5-35*i,
  //   Phaser.Math.DegToRad(0+time+(90/4)*i),
  //   Phaser.Math.DegToRad((90/4)+time+(90/4)*i),
  //   false
  // );
  // this.arcs.strokePath();
  // //console.log("I made ", i, " black arcs");
  //   };
  //   for(var i=0;i<4;i++) {
  // this.arcs.beginPath();
  // this.arcs.arc(
  //   config.width/2,
  //   config.height/2,
  //   config.height/2-22.5-35*i,
  //   Phaser.Math.DegToRad(180+time+(90/4)*i),
  //   Phaser.Math.DegToRad(180+(90/4)+time+(90/4)*i),
  //   false
  // );
  // this.arcs.strokePath();
  // //console.log("I made ", i, " black arcs on the other side");
  //   };
  
  // Draw black arcs with custom divisions prototyping
    for(var i=0;i<this.div;i++) {
  this.arcs.beginPath();
  this.arcs.arc(
    config.width/2,
    config.height/2,
    (i*(config.height-10)/2+80)/this.div,
    Phaser.Math.DegToRad(time+(90/this.div)*i),
    Phaser.Math.DegToRad(time+(90/this.div)*(1+i)+this.lBar),
    false
  );
  this.arcs.strokePath();
  //console.log("I made ", i, " black arcs ", this.div);
    };
    for(var i=0;i<this.div;i++) {
  this.arcs.beginPath();
  this.arcs.arc(    
    config.width/2,
    config.height/2,
    (i*(config.height-10)/2+80)/this.div,
    Phaser.Math.DegToRad(180+time+(90/this.div)*i),
    Phaser.Math.DegToRad(180+time+(90/this.div)*(1+i)+this.lBar),
    false
  );
  this.arcs.strokePath();
  //console.log("I made ", i, " black arcs on the other side");
    };
  
  //Drawing large white arc fills
    for(var i=0; i<2; i++){
  this.graphics.beginPath();
  this.graphics.arc(
    config.width/2, 
    config.height/2, 
    config.height/2-2.5, 
    Phaser.Math.DegToRad(time+90+180*i), 
    Phaser.Math.DegToRad(time+0+180*i),
    true
  );
  this.graphics.arc(
    config.width/2,
    config.height/2,
    0,
    Phaser.Math.DegToRad(time+180*i+90),
    Phaser.Math.DegToRad(time+180*i+0),
    false
  );
  this.graphics.fillPath();
  //console.log("I ran ", i, " : I made a large white arc");  
  };
  };


function art() {
  
};

function controller() {
  this.graphics.strokeLineShape(this.controller);
  this.graphics.strokeLineShape(this.divisionsBar);
  this.graphics.strokeLineShape(this.lengthBar);
  this.control.strokeLineShape(this.speedDial);
  this.control.strokeLineShape(this.divisionsDial);
  this.control.strokeLineShape(this.lengthDial);

};

function update() {

  //spin.call(this);
  spin2.call(this);
  //art.call(this);
  controller.call(this);  
};