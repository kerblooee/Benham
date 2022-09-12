// window.location.replace("http://www.codejems.me");

// Config file for game
const config = {
    width: 720,
    height: 720,
    scene: {
      create: create,
      update: update,
    },        
    // physics:{ 
    //   fps: { // not sure if this is even doing anything
    //     max: 67,
    //     min: 20,
    //     target: 67,
    //   }},
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

function spin1 () {
  // Get variables from HTML
  this.rotatespeed = document.getElementById("rspdrng").value;
  this.div = document.getElementById("arca").value;
  // Reverse speed
  document.getElementById("revspd").onclick = function() {revspd()};
  function revspd(){
    rev*=-1;
    console.log(rev);
  };
    
  // Declare time
  time = (time+this.rotatespeed*rev)%360;
  console.log(time);
    
  // Clears the lines
  this.graphics.clear();
  this.arcs.clear();
    
    // Draws black arcs in white
    for(var i=0;i<this.div;i++) {
    this.arcs.beginPath();
    this.arcs.arc(
      config.width/2,
      config.height/2,
      i*((config.height-10)/2)/this.div,
      Phaser.Math.DegToRad(time+(90/this.div)*i),
      Phaser.Math.DegToRad(time+((90)/this.div)*(1+i)),
      false
    );
    this.arcs.strokePath();
    // console.log("I made ", i, " black arcs ", this.div);
      };
    for(var i=0;i<this.div;i++) {
  this.arcs.beginPath();
  this.arcs.arc(    
    config.width/2,
    config.height/2,
    i*((config.height-10)/2)/this.div,
    Phaser.Math.DegToRad(180+time+(90/this.div)*i),
    Phaser.Math.DegToRad(180+time+(90/this.div)*(1+i)),
    false
  );
  this.arcs.strokePath();
  // console.log("I made ", i, " black arcs on the other side");
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
    // console.log("I ran ", i, " : I made a large white arc");  
    };

    //Draws large black arcs fill
    for(var i=0; i<2; i++){
  this.arcs.beginPath();
  this.arcs.arc(
    config.width/2, 
    config.height/2, 
    config.height/2-2.5, 
    Phaser.Math.DegToRad(time+180+180*i), 
    Phaser.Math.DegToRad(time+90+180*i),
    true
  );
  this.arcs.arc(
    config.width/2,
    config.height/2,
    0,
    Phaser.Math.DegToRad(time+180*i+180),
    Phaser.Math.DegToRad(time+180*i+90),
    false
  );
  this.arcs.fillPath();
  // console.log("I ran ", i, " : I made a large black arc");  
  };
};

function create() {
  this.graphics = this.add.graphics({ 
    lineStyle: {color: 0xFFFFFF, width: 5}, 
    fillStyle: {color: 0xFFFFFF, alpha: 1} });
  this.arcs = this.add.graphics({ 
    lineStyle: {color: 0x000000, width: 8}, 
    fillStyle: {color: 0x000000, alpha: 1} }); 



  };

function update() {
  spin1.call(this);
  console.log(this.rotatespeed, " ", this.div);
};
