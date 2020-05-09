document.querySelector('button').addEventListener('click', (event)=>{
    event.target.classList.toggle('wave');
    setTimeout(()=>{
        event.target.classList.toggle('wave');
    },1000);
    event.stopPropagation();
})

document.querySelector('input').addEventListener('focus', ()=>{
    document.querySelector('span.left').style.transform = 'translateX(0%)';
    document.querySelector('span.left').style.borderBottom = "2px solid black";
    document.querySelector('span.right').style.width = '25%';
    document.querySelector('span.right').style.borderBottom = "2px solid black";
})

document.querySelector('input').addEventListener('blur', ()=>{
    document.querySelector('span.left').style.transform = 'translateX(100%)'
    document.querySelector('span.left').style.borderBottom = "none";
    document.querySelector('span.right').style.width = '0%';
    document.querySelector('span.right').style.borderBottom = "none";
})
