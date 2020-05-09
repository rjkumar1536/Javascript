/**
 * Rotates coordinate system for velocities
 *
 * Takes velocities and alters them as if the coordinate system they're on was rotated
 *
 * @param  Object | velocity | The velocity of an individual particle
 * @param  Float  | angle    | The angle of collision between two objects in radians
 * @return Object | The altered x and y velocities after the coordinate system has been rotated
 */

function rotate(velocity, angle) {
    const rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };

    return rotatedVelocities;
}

/**
 * Swaps out two colliding particles' x and y velocities after running through
 * an elastic collision reaction equation
 *
 * @param  Object | particle      | A particle object with x and y coordinates, plus velocity
 * @param  Object | otherParticle | A particle object with x and y coordinates, plus velocity
 * @return Null | Does not return a value
 */

function resolveCollision(particle, otherParticle) {
    const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
    const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

    const xDist = otherParticle.x - particle.x;
    const yDist = otherParticle.y - particle.y;

    // Prevent accidental overlap of particles
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
        console.log('hi')
        // Grab angle between the two colliding particles
        const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

        // Store mass in var for better readability in collision equation
        const m1 = particle.mass;
        const m2 = otherParticle.mass;

        // Velocity before equation
        const u1 = rotate(particle.velocity, angle);
        const u2 = rotate(otherParticle.velocity, angle);

        // Velocity after 1d collision equation
        const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
        const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

        // Final velocity after rotating axis back to original location
        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

        // Swap particle velocities for realistic bounce effect
        particle.velocity.x = vFinal1.x;
        particle.velocity.y = vFinal1.y;
        particle.vx = vFinal1.x;
        particle.vy = vFinal1.y;

        otherParticle.velocity.x = vFinal2.x;
        otherParticle.vx = vFinal2.x;
        otherParticle.velocity.y = vFinal2.y;
        otherParticle.vy = vFinal2.y;
    }
}



var  canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');
canvas.width = window.innerWidth-5;
canvas.height = window.innerHeight-10;
var mouseRange = 6400;
class Circle{
    constructor(x , y , vx , vy , radius , color){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.vx = vx;
        this.vy = vy;
        this.mass = 1;
        this.velocity = { x : this.vx , y : this.vy};
        this.opacity = 0.3;
    }
}
Circle.prototype.draw = function(){
    context.beginPath();
    context.arc(this.x , this.y , this.radius , 0,7);
    context.save();
    context.globalAlpha = this.opacity;
//    console.log(this.opacity)
    context.fillStyle = this.color;
    context.fill();
    context.restore();
    context.stroke();
}
Circle.prototype.update = function(){
     if( this.x + this.radius > canvas.width || this.x - this.radius < 0)
        this.vx = -this.vx;
        if( this.y + this.radius > canvas.height || this.y - this.radius < 0){
            this.vy = -this.vy;
        }
        if(Distance(mouse.x , mouse.y , this.x , this.y ) <= mouseRange){
            this.opacity = Math.max(1 , this.opacity + 0.1)
        }
        else{
            this.opacity = Math.max(0.3 , this.opacity - 0.1);
        }
        for( let j = 0 ; j < circles.length ; j++ ){
            if(circles[j] != this){
//                console.log('he')
                let a = circles[j].radius + this.radius;
                if(Distance(circles[j].x , circles[j].y , this.x , this.y) < a*a ){
                    resolveCollision(this , circles[j]);
                }
            }
        }
        this.x += this.vx;
        this.y += this.vy;
        this.draw();
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
function Distance(x1 , y1 , x2 , y2){
    let a = x2 - x1;
    let b = y2 - y1;
    return a*a + b*b;
}
function init(){
        for( let i = 0 ; i < 5;i++ ){
        let vx = 2 + Math.floor(Math.random()*4);
        let vy = 2 + Math.floor(Math.random()*4);
        let radius = 50;
        let x = randomIntFromRange(radius , canvas.width - radius);
        let y = randomIntFromRange(radius , canvas.height - radius);
        if(i != 0){
            for(let j = 0 ; j < circles.length;j++){
                let a = circles[j].radius + radius;
                if(Distance(circles[j].x , circles[j].y , x ,y ) < a*a ){
                    x = randomIntFromRange(radius , canvas.width - radius);
                    y = randomIntFromRange(radius , canvas.height - radius);
                    j = -1;
                }
            }
        }
        let color = getRandomColor();
        let circle = new Circle(x ,y, vx , vy ,radius , color);
        circle.draw();
        circles.push(circle);
    }
}
window.addEventListener("resize", event=>{
    canvas.width = event.innerWidth;
    canvas.height = event.innerHeight;
//    init();
})
var mouse = {
    x : undefined,
    y : undefined
}
function randomIntFromRange(min , max){
    return Math.floor(min + Math.random()*(max-min + 1));
}
window.addEventListener('mousemove', event=>{
    mouse.x = event.clientX;
    mouse.y = event.clientY;
})
var gravity = 1;
var friction = 0.9;

function animate(){
    requestAnimationFrame(animate);
    context.clearRect(0,0,canvas.width, canvas.height);
    circles.forEach( circle => {
        circle.update();
    })
}
init();
animate();

