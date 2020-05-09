
document.querySelector('.pagination').addEventListener('click', (e)=>{
    let selectedValue = e.target.textContent;
    if(e.target.tagName != "BUTTON")
    return;
    let Buttons = document.querySelectorAll('.pagination button');
    if(selectedValue == ">>"){
        Buttons.forEach((button ,index)=>{
            if(index != selectedValue - 1){
                preSelectedIndex = selectedValue;
                if(button.classList.contains('active')){
                    button.classList.remove("active");
                }
            }
            else{
                button.classList.add("active");
                console.log('added')
            }
        });
    }
    else{
        Buttons.forEach((button ,index)=>{
            if(index != selectedValue - 1){
                preSelectedIndex = selectedValue;
                if(button.classList.contains('active')){
                    button.classList.remove("active");
                }
            }
            else{
                button.classList.add("active");
                console.log('added')
            }
        });
    }
    
    let liElements = document.querySelectorAll('ul li');
    let inline = 0;
    let none = 0;
    liElements.forEach((li, index)=>{
        console.log(index);
        if(index >= ( selectedValue - 1 ) * defaultNumberofRows && index < (selectedValue -1 ) * defaultNumberofRows + parseInt(defaultNumberofRows) ){
            li.style.display = "inline";
            inline++;
        }
        else{
            li.style.display = "none";
            none++;
        }
    })
    console.log(none,inline)
});

const Items = [
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 7",
    "Item 8",
    "Item 9",
    "Item 10",
    "Item 11",
    "Item 12",
    "Item 13",
    "Item 14",
    "Item 15",
    "Item 16",
    "Item 17",
    "Item 18",
    "Item 19",
    "Item 20",
    "Item 21",
    "Item 22",
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 7",
    "Item 8",
    "Item 9",
    "Item 10",
    "Item 11",
    "Item 12",
    "Item 13",
    "Item 14",
    "Item 15",
    "Item 16",
    "Item 17",
    "Item 18",
    "Item 19",
    "Item 20",
    "Item 21",
    "Item 22",
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 7",
    "Item 8",
    "Item 9",
    "Item 10",
    "Item 11",
    "Item 12",
    "Item 13",
    "Item 14",
    "Item 15",
    "Item 16",
    "Item 17",
    "Item 18",
    "Item 19",
    "Item 20",
    "Item 21",
    "Item 22",
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 7",
    "Item 8",
    "Item 9",
    "Item 10",
    "Item 11",
    "Item 12",
    "Item 13",
    "Item 14",
    "Item 15",
    "Item 16",
    "Item 17",
    "Item 18",
    "Item 19",
    "Item 20",
    "Item 21",
    "Item 22",


];

var defaultNumberofRows = 5;
const itemLength = Items.length;
var preSelectedIndex = 1;
document.addEventListener('DOMContentLoaded', ()=>{
    let ulElement = document.querySelector('ul');
    for(let i = 0; i < itemLength;i++){
        let li = document.createElement('li');
        li.textContent = Items[i];
        ulElement.appendChild(li);
    }
    let liElements = document.querySelectorAll('ul li');
    liElements.forEach((li, index)=>{
        if(index > defaultNumberofRows - 1){
            li.style.display = "none";
        }
    });
    let pagination = document.querySelector('.pagination');
    let numberOfButtons = Math.ceil(itemLength/defaultNumberofRows);
    
    for(let i = 0; i < numberOfButtons; i++){
        let button = document.createElement("button");
        if( i == 0){
            button.classList.add("active");
        }
        button.textContent = i + 1;
        if( i > 3){
            button.style.display = "none";
        }
        pagination.appendChild(button);
    }
    if(numberOfButtons > 3){
        button = document.createElement("button");
        button.textContent = ">>"
        pagination.appendChild(button);
    }
});

document.querySelector('#rows').addEventListener("keyup", (e)=>{
    if(e.keyCode == 13){
        e.target.blur();
        defaultNumberofRows = e.target.value;
        if(defaultNumberofRows < 5 || defaultNumberofRows > itemLength|| isNaN(defaultNumberofRows)){
            return;
        }
        let activeButton = document.querySelector('.active');
        let liElements = document.querySelectorAll('ul li');
        liElements.forEach((li, index)=>{
            if(index > defaultNumberofRows - 1){
                li.style.display = "none";
            }
            else{
                li.style.display = "inline";
            }
        });
        let pagination = document.querySelector('.pagination');
        pagination.innerHTML = "";
        let numberOfButtons = Math.ceil(itemLength/defaultNumberofRows);
        for(let i = 0; i < numberOfButtons; i++){
            let button = document.createElement("button");
            if(  i == 0){
                button.classList.add("active");
            }
            button.textContent = i + 1;
            if(i > 3){
                button.style.display = "none";
            }
            pagination.appendChild(button);
        }
        if(numberOfButtons > 3){
            button = document.createElement("button");
            button.textContent = ">>"
            pagination.appendChild(button);
        }
        e.preventDefault();
    }

})