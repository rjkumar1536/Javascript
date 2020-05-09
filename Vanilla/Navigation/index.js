const navSlide = ()=>{
    const burger =  document.querySelector('.burger');
    console.log(burger)
    const navLinks = document.querySelector('.nav-links');
    const navLinkAll = document.querySelectorAll('.nav-links li');
    burger.addEventListener('click', (event)=>{
        console.log(navLinks.classList)
        navLinks.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
        // if(navLinks.classList.contains('nav-open')){
        //     navLinks.classList.remove('nav-open');
        //     navLinks.classList.add('nav-close');
        //     navLinkAll.forEach((link ,index)=>{
        //         // if(link.style.animation){
        //         //     link.style.animation = '';
        //         // }
        //         // else{
        //             link.style.animation = `progress 0.5s ease backwards reverse ${index/7}s`; 
        //         // }
                
        //     })
        // }
        // else if(navLinks.classList.contains('nav-close')){
        //     navLinks.classList.remove('nav-close');
        //     navLinks.classList.add('nav-open');
            
        // }
        navLinkAll.forEach((link ,index)=>{
            if(link.style.animation){
                link.style.animation = '';
            }
            else{
                link.style.animation = `progress 0.5s ease forwards ${index/4}s`; 
            }
            
        })
    })
}


navSlide();