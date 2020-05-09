let smallRose = document.querySelector('.small-rose');
let bigRose = document.querySelector('.big-rose');
// let parallax = document.querySelector('section');
function parallax(element , distance , speed){
    document.querySelector(element).style.transform = `translateY(${distance * speed}px)`;
}
document.addEventListener('scroll', ()=>{
    parallax('header', window.scrollY, 1);
    parallax('.big-rose', window.scrollY, 0.5);
    parallax('.small-rose', window.scrollY, 0.7);
    // let scrollTop = document.documentElement.scrollTop;
    // parallax.style.transform = `translateY(${-scrollTop}px)`;
})