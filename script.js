// Config file for game
const config = {
    width: 720,
    height: 720,
    scene: {
      create: create,
      update: update,
    },        
    scale: {
      mode: Phaser.Scale.FIT,
      autocenter: Phaser.Scale.CENTER_HEIGHT,},
    transparent: true,
};
// Create game scene
const game = new Phaser.Game(config);

// Global variables    
let time = 0;
let rev = 1;
let count = 0;

function spin1 () {
  // Get variables from HTML
  this.rotatespeed = document.getElementById("rspdrng").value;
  this.div = document.getElementById("arca").value;
  // Must uncomment in HTML to work
  // this.clrwhl = document.getElementById("colorwheel").value;
  // this.clrwhl = hsl(this.colorwheel, 100, 50);
  // Reverse speed
  document.getElementById("revspd").onclick = function() {revspd()};
  function revspd(){
    rev*=-1;
  };
    
  // Declare time
  time = (time+this.rotatespeed*rev)%360;
  console.log(time);
    
  // Clears the lines
  this.graphics.clear();
  this.arcs.clear();
  for(var k=-3; k<3;k++){
    // Draws black arcs in white
    for(var i=0;i<this.div;i++) {
    this.arcs.beginPath();
    this.arcs.arc(
      config.width/2,
      config.height/2,
      i*((config.height-10)/2)/this.div,
      Phaser.Math.DegToRad(30*k+time+(90/this.div)*i),
      Phaser.Math.DegToRad(30*k+time+((90)/this.div)*(1+i)),
      false
    );
    this.arcs.strokePath();
    // console.log("I made ", i, " black arcs ", this.div, this.clrwhl);
      };
    for(var i=0;i<this.div;i++) {
  this.arcs.beginPath();
  this.arcs.arc(    
    config.width/2,
    config.height/2,
    i*((config.height-10)/2)/this.div,
    Phaser.Math.DegToRad(30*k+180+time+(90/this.div)*i),
    Phaser.Math.DegToRad(30*k+180+time+(90/this.div)*(1+i)),
    false
  );
  this.arcs.strokePath();
  // console.log("I made ", i, " black arcs on the other side");
    };
  };

    //Draws large white arc fills
    for(var i=0; i<2; i++){
    this.graphics.beginPath();
    this.graphics.arc(
    config.width/2, 
    config.height/2, 
    config.height/2-2.5, 
    Phaser.Math.DegToRad(time+90+180*i), 
    Phaser.Math.DegToRad(time+0+180*i),
    false
    );
    this.graphics.arc(
    config.width/2,
    config.height/2,
    0,
    Phaser.Math.DegToRad(time+180*i+90),
    Phaser.Math.DegToRad(time+180*i+0),
    true
    );
    this.graphics.fillPath();
    // console.log("I ran ", i, " : I made a large white arc");  
    };

    //Draws large black arcs fill
  for(var k=-1; k<4; k++){
    for(var i=0; i<2; i++){
  this.arcs.beginPath();
  this.arcs.arc(
    config.width/2, 
    config.height/2, 
    config.height/2-2.5, 
    Phaser.Math.DegToRad(45*k+time+180+180*i), 
    Phaser.Math.DegToRad(45*k+time+165+180*i),
    true
  );
  this.arcs.arc(
    config.width/2,
    config.height/2,
    0,
    Phaser.Math.DegToRad(time+180*i+180),
    Phaser.Math.DegToRad(time+180*i+165),
    false
  );
  this.arcs.fillPath();
  // console.log("I ran ", i, " : I made a large black arc");  
  };};
};

function create() {
  this.graphics = this.add.graphics({ 
    lineStyle: {color: 0xFFaaFF, width: 25}, 
    fillStyle: {color: 0xFFaaFF, alpha: 1} });
  this.arcs = this.add.graphics({ 
    lineStyle: {color: 0x000000, width: 15}, 
    fillStyle: {color: 0x000000, alpha: 1} }); 
};

// find out new ways to change the color of the objects.

function update() {
    if(count%100 == 0){
      console.log(count);
      this.arcs.defaultStrokeColor+=0x113355;
      this.arcs.defaultFillColor+=0x113355;
      this.graphics.defaultStorkeColor+=0x113355;
      this.graphics.defaultFillColor+=0x551133;
      count++;
    }
    else{
      count+=1;
    }
  spin1.call(this);
  console.log(this.rotatespeed, " ", this.div, " ", this.arcs.defaultStrokeColor);
};
