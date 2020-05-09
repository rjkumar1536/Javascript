var  canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');
canvas.width = window.innerWidth-5;
canvas.height = window.innerHeight-10;

class Circle{
    constructor(x ,y, radius , color , angle , velocity){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.angle = angle;
        this.velocity = velocity;
        this.last = {x : this.left , y :this.top }
    }
    draw(){
        context.beginPath();
        context.strokeStyle = this.color;
        context.lineWidth = 5;
        context.moveTo(this.last.x , this.last.y);
        context.lineTo(this.x , this.y)
        context.stroke();
//        context.closePath();
    }
    update(){
        this.last.x = this.x;
        this.last.y = this.y;
        this.y = mouse.lastY +  this.radius * Math.cos(this.angle);
        this.x = mouse.lastX + this.radius *  Math.sin(this.angle)
        this.angle = this.angle + this.velocity;
        this.draw();
    }
}
var mouse = {
    x : undefined,
    y : undefined,
    lastX : 0,
    lastY : 0
}
addEventListener("mousemove", event=>{
    mouse.x = event.clientX;
    mouse.y = event.clientY;
    mouse.lastX += (mouse.x - mouse.lastX)*0.05
    mouse.lastY += (mouse.y - mouse.lastY) * 0.05;
})
addEventListener("resize", event=> {
    canvas.width = event.clientX;
    canvas.height = event.clientY;
})
var circles = [];
function getRandomColor(){
    let color = '#';
    let letters = '0123456789ABCDEF';
    for(let i = 0;i < 6;i++){
        color += letters[Math.floor(Math.random()*16)];
    }
    return color;
}
function animate(){
    requestAnimationFrame(animate);
    context.fillStyle = 'rgba(255 , 255 , 255, 0.03)';
    context.fillRect(0 ,0 , canvas.width, canvas.height);
    circles.forEach( circle => {
        circle.update();
    })
}
function init(center ,distance,  n , gap){
    context.clearRect(0,0, canvas.width , canvas.height);
    for(let i = 0;i < n ;i++){
        let angle = Math.random() * 2 * Math.PI;
        let circle = new Circle(center.x , center.y ,distance ,getRandomColor() ,angle, 0.05 );
        circle.draw();
        circles.push(circle);
        distance += gap;
    }
}
init({x : canvas.width/2 , y : canvas.height/2},50, 50 , 2)
animate()