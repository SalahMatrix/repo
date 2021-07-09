
function script() {

var canvas = document.querySelector("canvas");

canvas.width = innerWidth;
canvas.height = innerHeight;

var c = canvas.getContext('2d');

var gen = 0;
var sweep = -10;
var vert = 290;
var zvert = vert;
var rt = 10;

var inst1 = Math.floor(75 + Math.random() * 101);
var inst2 = Math.floor(20 + Math.random() * 50);
var px = [];
var py = [];
var pos = [];
var peak;
var seg = 1;
var p = 1;

var r = 255;
var g = 0;
var b = 0;
var fill = "black";
var stl = 1;

function update() {
if (sweep - 10 >= innerWidth) {
sweep = -10;
fill = 'rgba(55,255,55,0.3)';
seg = 1;
px = [];
py = [];
} 
else {
++sweep;
}

if(sweep > 0 && sweep % inst1 === 0 && p % 3 === 0) {
peak = zvert - 120;
pulse = 1;
rt = 10;
px[seg] = sweep;
py[seg] = vert;
++seg;
++p;
mjr = 1; 
}
if (sweep > 0 && sweep % inst2 === 0 && p % 3 !== 0) {
peak = zvert - 10;
pulse = 1;
rt = 6; 
px[seg] = sweep;
py[seg] = vert;
++seg;
++p;
mjr = 0; 
}

switch (pulse) {
case 1:
vert -= rt;
if (vert <= peak) {
peak = zvert + ((mjr)?55:10);
pulse = 2;
px[seg] = sweep;
py[seg] = vert;
++seg;
}
break;
case 2:
vert += rt;
if (vert >= peak) {
peak = zvert;
pulse = 3;
px[seg] = sweep;
py[seg] = vert;
++seg;
}
break;
case 3:
vert -= rt;
if (vert <= zvert) {
pulse = 0;
px[seg] = sweep;
py[seg] = vert;
++seg;
inst1 = Math.floor(75 + Math.random() * 101);
inst2 = Math.floor(20 + Math.random() * 50);
}
break;
}

if (r >= 255) {
b -= rt;
g += rt;
}
if (g >= 255) {
r -= rt;
b += rt;
}
if (b >= 255) {
g -= rt;
r += rt;
} 

display();
}

function pulse() {}

function display() {
c.strokeStyle = 'rgb('+r+','+g+','+b+')';
c.beginPath();
c.moveTo(0,zvert); 
for (var j = 0;j <= seg;++j) {
c.lineTo(px[j],py[j]);
}
c.lineTo(sweep,vert);
c.stroke();

c.fillStyle = 'rgba(255,255,255,1)';
c.beginPath();
c.arc(sweep,vert,2,0,360);
c.fill();
c.strokeRect(0,0,innerWidth,innerHeight);
}

function animate() {
if (sweep - 10 < innerWidth) {
c.fillStyle = 'rgba(0,0,0,.3)'
c.fillRect(0,0,sweep + 50,innerHeight);
c.fillRect(0,0,innerWidth,100);
c.strokeStyle = fill;
}

requestAnimationFrame(animate);

update();
}

animate();

}

//mobile
//J