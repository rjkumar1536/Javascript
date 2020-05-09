var  canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
class Circle{
    constructor(x , y , vx , vy , radius , color){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.vx = vx;
        this.vy = vy;
    }
}
Circle.prototype.draw = function(){
    context.beginPath();
    context.arc(this.x , this.y , this.radius , 0,7);
    context.fillStyle = this.color;
//    context.lineWidth = 5;
    context.fill();
    context.stroke();
}
function getRandomColor(){
    let color = '#';
    let letters = '0123456789ABCDEF';
    for(let i = 0;i < 6;i++){
        color += letters[Math.floor(Math.random()*16)];
    }
    return color;
}
let circles = [];
for( let i = 0 ; i < 100;i++ ){
    let x = Math.random()*innerWidth;
    let y = Math.random()* innerHeight;
//    let vx = 2 + Math.random()*6;
    let vx = 0
    let vy = 2 + Math.random()*6;
    let radius = 10 + Math.random()*40;
    let color = getRandomColor();
    let circle = new Circle(x ,y, vx , vy ,radius , color);
    circle.draw();
    circles.push(circle);
}
var gravity = 1;
var friction = 0.9;
function update(){
    context.clearRect(0,0,innerWidth, innerHeight);
    for( let circle of circles){
//        if( circle.x + circle.radius > innerWidth || circle.x - circle.radius < 0)
//        circle.vx = -circle.vx;
        if( circle.y + circle.radius > innerHeight){
            circle.vy = -friction*circle.vy;
        }
        else{
                circle.vy = circle.vy + gravity;  
            }
        circle.x += circle.vx;
        circle.y += circle.vy;
        circle.draw();
    }
    requestAnimationFrame(update);
}
update();

