function smoothScroll(target, duration){
    let ele = document.querySelector(target);
    let elementTargetPos = ele.getBoundingClientRect().top;
    let startPos = window.pageYOffset;
    let distance = elementTargetPos - startPos;
    scrollTo({top : elementTargetPos, behavior : 'smooth'});
}

document.querySelector('.section1').addEventListener('click', (event)=>{
    smoothScroll('.section2', 1000);
});