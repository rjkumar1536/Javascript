document.querySelector('button').addEventListener('click', ()=>{
    document.querySelector('.model').style.display = "block";
})

document.querySelector('.closebtn').addEventListener('click', ()=>{
    document.querySelector('.model').style.display = "none";
});

document.body.addEventListener('click', (event)=>{
    if(!event.target.classList.contains("content") && event.target.tagName == "DIV"){
        document.querySelector('.model').style.display = "none";
    }
})