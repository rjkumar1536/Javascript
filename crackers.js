var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

class Strip {
    constructor(x , y , radius){
        
    }
    draw(){
        context.beginPath();
        context.moveTo()
        context.lineTo();
        context.stroke();
    }
    update(){
        
    }
}
class Circle {
    constructor(x , y , radius){
        this.x = x;
        this.y = y;
        this.radius = radius;
    }
    draw(){
        context.beginPath();
        context.arc(this.x , this.y , this.radius , 0 , 2* Math.PI);
        context.stroke();
    }
    update(){
        
    }
}
let mouse = {
    x : canvas.width/2,
    y : canvas.height/2
}
addEventListener('mousemove', event=>{
    mouse.x = event.clientX;
    mouse.y = event.clientY;
})
addEventListener('resize', event=>{
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
})
function init(){
     let circle = new Circle(mouse.x , mouse.y , 30);
     circle.draw();
    for(let i = 0; i < 100 ; i++){
        let strip = new Strip()
    }
}
function animate(){
    requestAnimationFrame(animate);
//    context.fillRect(0 , 0 , canvas.width , canvas.height);
//    context.fillStyle = 'rgba(255 , 255 , 255, 1)';
//    let circle = new Circle(mouse.x , mouse.y , 30);
//     circle.draw();
}
init();
animate();