var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');
canvas.height = window.innerHeight -5 ;
canvas.width = window.innerWidth - 5;

addEventListener('resize', event=> {
    canvas.height = window.innerHeight - 5;
    canvas.width = window.innerWidth - 5;
})

function animate(){
    requestAnimationFrame(animate);
}
//function drawCircle(){
    context.beginPath();
    context.arc(canvas.width/2 , canvas.height/2 ,100, 0 , 2 * Math.PI );
    context.fillStyle = "rgb(211,211,211)"
    context.fill()

    context.beginPath();
    context.arc(0 , 0 ,5, 0 , 2 * Math.PI );
//    context.lineWidth = 2;
    context.stroke();

    
//}
//drawCircle();