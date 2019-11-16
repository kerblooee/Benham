
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
  
// Create game scene
const game = new Phaser.Game(config);

function preload() {
  console.log("hello");
};


function create() {
  this.graphics = this.add.graphics({ lineStyle: {color: 0xFFFFFF, width: 5}, fillStyle: {color: 0xFFFFFF, alpha: 1} });
  
  
  // console.log("1");
  // console.log("2");
  // Draw disk
  // var disk = new Phaser.Geom.Circle(config.width/2,config.height/2,config.height/2-2.5);
  // var graphics = this.add.graphics({ lineStyle: {color: 0xFFFFFF, width: 5}, fillStyle: {color: 0xFFFFFF, alpha: 1} });
  // graphics.strokeCircleShape(disk);
  // Draw Arc
  // graphics.beginPath();
  // graphics.arc(config.width/2,config.height/2,config.height/2-2.5,Phaser.Math.DegToRad(0),Phaser.Math.DegToRad(-45),true);
  // graphics.strokePath();
};


function spin() {
  const time = -((new Date)/1)%360;
  this.graphics.clear();
  // Draw arcs  
  for(var i=0; i<3; i++){
  // Use these variables for adjustable portions
  var r1, r2, r3;
  var ang1, ang2, ang3;
  //Draw first set of 3 arcs
  this.graphics.beginPath();
  this.graphics.arc(config.width/2,config.height/2,config.height/2-5-60*i,Phaser.Math.DegToRad(-40+time+20*i),Phaser.Math.DegToRad(-75+time+20*i),true);
  this.graphics.strokePath();
  this.graphics.beginPath();
  this.graphics.arc(config.width/2,config.height/2,config.height/2-5-60*i-10,Phaser.Math.DegToRad(-40+time+20*i),Phaser.Math.DegToRad(-75+time+20*i),true);
  this.graphics.strokePath();
  this.graphics.beginPath();
  this.graphics.arc(config.width/2,config.height/2,config.height/2-5-60*i-20,Phaser.Math.DegToRad(-40+time+20*i),Phaser.Math.DegToRad(-75+time+20*i),true);
  this.graphics.strokePath();
  
  //Draw second set of 3 arcs, 180 degrees offset
  this.graphics.beginPath();
  this.graphics.arc(config.width/2,config.height/2,config.height/2-5-60*i,Phaser.Math.DegToRad(-40+time+20*i+180),Phaser.Math.DegToRad(-75+time+20*i+180),true);
  this.graphics.strokePath();
  this.graphics.beginPath();
  this.graphics.arc(config.width/2,config.height/2,config.height/2-5-60*i-10,Phaser.Math.DegToRad(-40+time+20*i+180),Phaser.Math.DegToRad(-75+time+20*i+180),true);
  this.graphics.strokePath();
  this.graphics.beginPath();
  this.graphics.arc(config.width/2,config.height/2,config.height/2-5-60*i-20,Phaser.Math.DegToRad(-40+time+20*i+180),Phaser.Math.DegToRad(-75+time+20*i+180),true);
  this.graphics.strokePath();
  console.log("I ran ", i, " : I made a small arc");
  };
  
  // Draw white fill arcs
  for(var i=0; i<2; i++){
  this.graphics.beginPath();
  this.graphics.arc(config.width/2,config.height/2,config.height/2-2.5,Phaser.Math.DegToRad(0+time+90+180*i),Phaser.Math.DegToRad(-90+time+90+180*i),true);
  this.graphics.arc(config.width/2,config.height/2,0,Phaser.Math.DegToRad(0+time+180*i+90),Phaser.Math.DegToRad(-90+time+180*i+90),false);
  this.graphics.fillPath();
  console.log("I ran ", i, " : I made a large arc");  
  };

};
  

function update() {
  spin.call(this);
};