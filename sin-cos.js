//import * as dat from 'https://cdnjs.cloudflare.com/ajax/libs/dat-gui/0.7.6/dat.gui.js'
var  canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');
canvas.width = window.innerWidth-5;
canvas.height = window.innerHeight-10;

const wave = {
    y : canvas.height/2,
    wavelength : 0.01,
    amplitude : 100,
    frequency : 0.01,
    color : "red"
}
const background = {
    red : 255,
    green : 255,
    blue : 255,
    alpha : 0.02
}
const strokeStyle = {
    hue : 0,
    saturation : 50,
    lightness : 50,
    alpha : 1
}
let colors = [];
for( let i = 0; i < 100 ;i++){
    colors.push(getRandomColor())
}
function getRandomColor(){
    let color = '#';
    let letters = '0123456789ABCDEF';
    for(let i = 0;i < 6;i++){
        color += letters[Math.floor(Math.random()*16)];
    }
    return color;
}
let gui = new dat.GUI();
waveproperty = gui.addFolder('Wave');
waveproperty.add(wave , 'y' , 0, canvas.height);
waveproperty.add(wave , 'wavelength' ,-0.01 , 0.01);
waveproperty.add(wave , 'amplitude' ,-300 , 300);
waveproperty.add(wave , 'frequency' ,-0.01 , 1);

colorProperty = waveproperty.addFolder('Color');
colorProperty.add(strokeStyle, 'hue' , 0, 360);
colorProperty.add(strokeStyle, 'saturation', 0 ,100);
colorProperty.add(strokeStyle, 'lightness', 0 ,100);
colorProperty.add(strokeStyle, 'alpha', 0 ,1);

backgroundProperty = gui.addFolder('Background');
backgroundProperty.add(background , 'red' , 0 , 255);
backgroundProperty.add(background , 'green' , 0 , 255);
backgroundProperty.add(background , 'blue' , 0 , 255);
backgroundProperty.add(background , 'alpha' , 0 , 1);


var increment = wave.frequency;
function sin(){
    context.beginPath();
    context.moveTo(0 , canvas.height/2)
    for(let i = 0 ; i < canvas.width;i++ ){
        context.lineTo(i , wave.y + wave.amplitude * Math.sin(i * wave.wavelength + increment));
    }
    context.strokeStyle = `hsl(${Math.abs(strokeStyle.hue* Math.sin(increment))},${strokeStyle.saturation}%,${strokeStyle.lightness}%)`
    context.lineWidth = 5;
    context.stroke();
    increment += wave.frequency;
}
function cos(){
    
}
sin()
function animate(){
    requestAnimationFrame(animate);
    context.fillStyle = `rgba(${background.red} ,${background.green}  ,${background.blue} , ${background.alpha})`
    context.fillRect(0 , 0, canvas.width , canvas.height);
    sin()
}
animate();