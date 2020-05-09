let carouselSlide = document.querySelector('.carousel-slide');
let carouselImages  = document.querySelectorAll('.carousel-slide img');
let prevBtn = document.querySelector('#prevBtn');
let nextBtn = document.querySelector('#nextBtn');
let size = carouselImages[0].clientWidth;
let counter = 1;
carouselSlide.style.transform = "translateX(" + (-size * counter ) + "px)";
prevBtn.addEventListener('click', ()=>{
    if(counter <= 0) return;
    carouselSlide.style.transition = "transform 1s ease-in-out";
    counter--;
    carouselSlide.style.transform = "translateX(" + (-size * counter ) + "px)";
})

nextBtn.addEventListener('click', ()=>{
    if(counter >= carouselImages.length - 1) return;
    carouselSlide.style.transition = "transform 1s ease-in-out";
    counter++;
    carouselSlide.style.transform = "translateX(" + (-size * counter ) + "px)";
})

carouselSlide.addEventListener('transitionend', ()=>{
    if(carouselImages[counter].id == "lastClone"){
        carouselSlide.style.transition = "none";
        counter = carouselImages.length - 2;
        carouselSlide.style.transform = "translateX(" + (-size * counter ) + "px)";
    }
    else if(carouselImages[counter].id == "firstClone"){
        carouselSlide.style.transition = "none";
        counter = 1;
        carouselSlide.style.transform = "translateX(" + (-size * counter ) + "px)";
    }
})

