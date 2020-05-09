const fill = document.querySelector('.fill');
const empties = document.querySelectorAll('.empty');
const tile = document.querySelector('.tiles');
fill.addEventListener('dragstart', (event)=>{
    setTimeout(()=>{
        event.target.classList.toggle('fill');
        event.target.classList.toggle('invisible');
        draggable = event.target; 
    },0);
});

fill.addEventListener('dragend', (event)=>{
    event.target.classList.toggle('fill');
    event.target.classList.toggle('invisible');
});


tile.addEventListener('dragover', (event)=>{
        event.preventDefault();
}, false);

tile.addEventListener('dragenter', (event)=>{
    if(event.target.classList.contains("empty"))
    event.target.style.border = "2px dashed red";
});

tile.addEventListener('dragleave', (event)=>{
    event.target.style.border = "";
});

tile.addEventListener('drop', (event)=>{
    if(event.target.classList.contains("empty")){
        event.target.style.border = "";
        event.target.appendChild(fill);
    }
});
