var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');
// c.fillRect(0,0,innerWidth,innerHeight);
// c.fillStyle = "green";

// c.fillStyle = "red";
let colorFill = true;
//c.beginPath();
// for (let y = 10; y < 100; y += 10) {
//     c.moveTo(10, y);
//     c.lineTo(90, y);
//   }
// c.stroke();

//c.moveTo(100,100);
//c.lineTo(100,200);
//c.lineTo(200,200);
//c.fill();
//c.moveTo(10,90);
//c.quadraticCurveTo(60,10,150,90);
//c.bezierCurveTo(10,10,90,10,50,90);
//c.lineTo(90,10)
//c.lineTo(10,10);
//c.arc(50,50,40,0,0.5 * Math.PI);
//c.lineTo(60,10);
//c.closePath();
//c.stroke();
// for(let i = 0; i < 10;i++ ){
// 	x = x + 50;
// 	y = y + 50;
// 	c.fillRect(x,y, 50, 50)
// 	c.fillStyle = colorFill ? "red" : "black";
// 	colorFill = colorFill ? false :true;
// 	c.strokeRect(x,y, 50,50);
// 	c.strokeStyle = "white";
// 	c.lineWidth = 5;
// }

// for(let i = 0; i < 10;i++ ){
// 	x = x + 50;
// 	y = y - 50;
// 	c.fillRect(x ,y, 50, 50)
// 	c.fillStyle = colorFill ? "red" : "black";
// 	colorFill = colorFill ? false :true;
// 	c.strokeRect(x,y, 50,50);
// 	c.strokeStyle = "white";
// 	c.lineWidth = 5;
// }
//const results = [
//  {name: "Satisfied", count: 1043, color: "lightblue"},
//  {name: "Neutral", count: 563, color: "lightgreen"},
//  {name: "Unsatisfied", count: 510, color: "pink"},
//  {name: "No comment", count: 175, color: "silver"}
//];
//let currentAngle = -0.5 * Math.PI;
//let sum = results.reduce((sum , {count}) => sum = sum + count,0);
//for( let result of results){
//    c.beginPath();
//    let sliceAngle = (result.count / sum) * 2 *   Math.PI;
//    c.arc(100,100,100,currentAngle , currentAngle + sliceAngle );
//    currentAngle = currentAngle + sliceAngle;
//    c.lineTo(100,100);
//    c.fillStyle = result.color;
//    c.fill();
//}
function flipHorizontally(context, around) {
  context.translate(around, 0);
  context.scale(-1, 1);
  context.translate(-around, 0);
}
//let img = document.createElement('img');
//let spriteW = 40, spriteH = 150;
//img.src = 'player_big.png'
//img.addEventListener("load", event =>{
//    let cycle = 0;
//    flipHorizontally(c, 100);
//    c.drawImage(img, 0, 0, spriteW, spriteH,
//                 100, 0, spriteW, spriteH);
////    setInterval(()=>{
////        c.clearRect(0,0,spriteW,spriteH);
////        c.drawImage(img, cycle * spriteW ,0 , spriteW ,spriteH , 0 ,0, spriteW , spriteH);
////        cycle = (cycle + 1) % 8;
////    },120);
//});

//function branch(length, angle, scale) {
//    c.lineWidth = 10;
//    c.fillStyle = "green"
//    c.fillRect(0, 0, 1, length);
//    if (length < 8) return;
//    c.save();
//    c.translate(0, length);
//    c.rotate(-angle);
//    branch(length * scale, angle, scale);
//    c.rotate(2 * angle);
//    branch(length * scale, angle, scale);
//    c.scale(1,-1)
//    c.restore();
//  }
//  c.translate(300, 300);
//  branch(60, 0.5, 0.8);    

let circleColor = ["red" , "green" ,"yellow" ,"blue" ,"black" , "brown" ,"pink" , "grey" , "gold" ,"silver" ,"iron" ,"copper" ,"brass"]
let radius = 20;
//for( let i = 0; i < 1000;i++ ){
//    let index = Math.floor(Math.random() * circleColor.length);
//    console.log(index)
//    c.beginPath();
//    let x = Math.random() * innerWidth;
//    let y = Math.random() * innerHeight;
//    c.arc( x, y , radius , 0 ,7);
//    c.strokeStyle = circleColor[index];
//    c.lineWidth = 5;
//    c.fillStyle = circleColor[index]
//    c.stroke();
//}
let x = 200;
let y = 200;
let flip = true;
let dx = 4;
let dy = 4;
function Circle(x , y ,dx , dy ,radius){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.draw = function(){
        c.beginPath();
        c.arc(this.x , this.y ,this.radius , 0 , 2* Math.PI);
        if( this.x + this.radius > innerWidth || this.x - this.radius < 0)
        this.dx = -this.dx;
        if( this.y + this.radius > innerHeight || this.y - this.radius < 0)
            this.dy = -this.dy;
        this.x += this.dx;
        this.y += this.dy;
//        if(this.x - mouse.x > -30 && this.x - mouse.x < 30 && this.y - mouse.y > -30 && this.y - mouse.y < 30 ){
//            if(this.radius < 30){
//                this.radius += 1;
//            }
//        }
//        else if(this.radius > 10){
//            this.radius -= 1;
//        }
//        c.strokeStyle = circleColor[Math.floor(Math.random() * circleColor.length)];
        c.fillStyle = circleColor[Math.floor(Math.random() * circleColor.length)];
        c.lineWidth = 10;
//        c.stroke();
        c.fill();
    }
}
let mouse = {
    x : undefined,
    y : undefined
}
window.addEventListener('mousemove' , event=> {
    mouse.x = event.x;
    mouse.y = event.y;
})
let circles = [];
for( let i = 0 ;i < 100 ; i++){
    let x = Math.random() * innerWidth;
    let y = Math.random() * innerHeight;
    let radius = 5 + Math.floor(Math.random()*30);
    let dx = Math.floor(Math.random()*4);
    let dy = Math.floor(Math.random()*4);
    let circle = new Circle(x , y , dx , dy , radius);
    circles.push(circle);
}
function animate(){
    c.clearRect(0,0,innerWidth,innerHeight)
    for( let circle of circles){
        circle.draw();
    }
//    c.beginPath();
//    c.arc(x , y , radius , 0 ,2 * Math.PI);
//    if( x + radius > innerWidth || x - radius < 0)
//        dx = -dx;
//    if( y + radius > innerHeight || y - radius < 0)
//        dy = -dy;
//    x += dx;
//    y += dy;
//    c.strokeStyle = circleColor[Math.floor(Math.random() * circleColor.length)];
//    c.lineWidth = 10;
//    c.stroke();
    requestAnimationFrame(animate);
}
animate();
  