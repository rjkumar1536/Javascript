var canvas = document.querySelector('canvas')
var context = canvas.getContext('2d')
canvas.height = innerHeight;
canvas.width = innerWidth;
function trapezoid(context ,pos , w1 , w2 , h){
    context.beginPath();
    context.moveTo(pos.x , pos.y);
    context.lineTo(pos.x + w1 , pos.y);
    let point_a = pos.x + (w1+w2)/2
    let point_b = pos.x + (w1-w2)/2;
    context.lineTo( point_a , pos.y - h);
    context.lineTo(point_b , pos.y - h);
    context.closePath();
    context.stroke();
}
function diamond(context ,pos , width , height){
    let region = new Path2D();
    context.translate(pos.x ,pos.y);
    context.rotate(-(Math.PI/4))
    context.translate(-pos.x , -pos.y)
    region.rect(pos.x , pos.y ,width ,height);
    context.fillStyle = "red";
    context.fill(region, 'evenodd');
    context.resetTransform();
}
function zigzagging(context ,pos ,length , gap ){
    context.beginPath();
    context.moveTo(pos.x , pos.y);
    for( let i = 0 ; i < 5 ; i++){
        context.lineTo(pos.x + length , pos.y + gap/2);
        pos.y = pos.y + gap/2;
        context.lineTo(pos.x , pos.y + gap/2);
        pos.y = pos.y + gap/2;
    }
    context.stroke();
}
function spiral(context , pos ,radius){
    context.beginPath();
    context.moveTo(pos.x , pos.y)
    let theta = 0;
    for( let i = 0; i < 100 ;i++){
        context.lineTo(pos.x + radius * Math.cos(theta), pos.y + radius * Math.sin(theta));
        theta = theta + 0.2;
        radius = radius + 0.5;
    }
    context.stroke();
}
function sin(context , pos , amplitude){
    context.beginPath();
    var increase = 90 / 180 * Math.PI / 8;
    var counter = 0;
    for( let i = 0 ;i < 100 ;){
        context.lineTo(pos.x + i, pos.y - amplitude* Math.sin(counter))
        counter += increase;
        i = i + 1;
    }
    context.stroke();
}
function star(context ,pos , radius , n){
    let theta = 0;
    context.beginPath();
    context.translate(pos.x , pos.y);
    context.moveTo(radius * Math.cos(theta) ,radius * Math.sin(theta))
    for( let i = 0 ; i< n ; i++){
        context.quadraticCurveTo(0 , 0, radius * Math.cos(theta + 2*Math.PI/n), radius * Math.sin(theta + 2*Math.PI/n))
        theta = theta + 2*Math.PI/n;
    }
    context.translate(-pos.x, -pos.y );
    context.fillStyle = "gold";
    context.fill()
}
//trapezoid(context, {x : 100, y: 200}, 200 , 100 , 50 );
//zigzagging(context , {x : 400 , y : 100 }, 100 , 20)
//spiral(context , { x : 600 , y : 150} , 5 )
//sin(context , {x : 800 , y:150} , 30)
//diamond(context,{x : 1000, y: 150}, 50 ,50)
//star(context , {x : 1300 , y : 150} , 100 , 50)

const results = [
  {name: "Satisfied", count: 1043, color: "lightblue"},
  {name: "Neutral", count: 563, color: "lightgreen"},
  {name: "Unsatisfied", count: 510, color: "pink"},
  {name: "No comment", count: 175, color: "silver"}
];
function pie(context , pos , radius , results){
    let currentAngle = -0.5 * Math.PI;
    let sum = results.reduce((sum , {count}) => sum = sum + count,0);
    for( let result of results){
        context.beginPath();
        let sliceAngle = (result.count / sum) * 2 *   Math.PI;
        context.arc(pos.x,pos.y,radius,currentAngle , currentAngle + sliceAngle );
         let x = pos.x + 120*Math.cos(currentAngle + 0.5 * sliceAngle)
         let y = pos.y + 120* Math.sin(currentAngle + 0.5 * sliceAngle)
        currentAngle = currentAngle + sliceAngle;
        context.font = "bold 15px Helvetica, Arial, sans-serif";
        context.fillStyle = result.color;
        context.fillText(result.name , x, y)
        context.textBaseline = "middle";
        if(currentAngle > -Math.PI/2 && currentAngle < Math.PI/2 ){
            context.textAlign = "left";
        }
        else{
            context.textAlign = "right";
        }
//        context.shadowColor = "yellow"
        context.lineTo(pos.x,pos.y)
        context.fillStyle = result.color;
        context.fill();
    }
}
//pie(context, {x : 200 , y : 200}, 100,results)
function bounce(context , pos , width , height , radius, lineWidth){
    var x;
    var y;
    function createBox(){
        context.beginPath();
        context.rect(pos.x , pos.y , width , height);
        context.strokeStyle = "blue"
        context.lineWidth = lineWidth;
        context.stroke();
    }
    function createBall(){
        x = pos.x + Math.random()*width;
        y = pos.y + Math.random()*height;
        context.beginPath();
        context.arc(x,y, radius , 0,7);
        context.fillStyle = "red";
        context.fill();
    }
    let dx = 3;
    let dy = 4;
    function animate(){
        context.clearRect(0 , 0, innerWidth ,innerHeight);
        createBox();  
        context.beginPath();
        if(x + dx < pos.x + lineWidth){
            x = pos.x + lineWidth;
            dx = -dx;
        }
        else if(x + dx > pos.x + width -lineWidth){
            x = pos.x + width - lineWidth;
            dx = -dx;
        }
        else{
             x = x + dx;   
        }
        if( y + dy < pos.y + lineWidth){
            y = pos.y + lineWidth;
            dy = -dy;
        }
        else if( y + dy > pos.y + height - lineWidth){
            y = pos.y + height - lineWidth;
            dy = -dy;
        }
        else{
            y = y + dy;
        }
        context.arc(x,y,radius , 0, 7);
        context.fillStyle = "red";
        context.fill();
        requestAnimationFrame(animate);
    }
    createBox();
    createBall();
    requestAnimationFrame(animate);
}
bounce(context, {x : 200 , y : 300}, 300 ,300 , 5 , 5)