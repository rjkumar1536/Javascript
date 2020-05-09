function scrollAppear(){
    let introTextEle = document.querySelector('.intro-text');
    let introPos = introTextEle.getBoundingClientRect().top;
    let screenHeight = window.innerHeight;
    if(introPos < screenHeight){
        introTextEle.classList.add('intro-appear');
    }
    else{
        introTextEle.classList.remove('intro-appear')
    }
}

document.addEventListener('scroll', scrollAppear);