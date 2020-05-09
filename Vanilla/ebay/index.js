const item = document.querySelector('.menu');
const AllItem =  document.querySelectorAll('.menu_item');
let active = null;

item.addEventListener('mouseenter', (e)=>{
    console.log(e.target.classList);
    console.log(e.currentTarget.classList)
    if(e.target.classList.contains('menu_item')){
        for(let i of AllItem){
            i.classList.remove('menu_item--active');
        }
        e.target.classList.add('menu_item--active');
        document.querySelector('.menu__sub').style.display = "flex";
    }
}, true)

document.querySelector('.menu').addEventListener('mouseleave', (e)=>{
    document.querySelector('.menu__sub').style.display = "none";
    // for(let i of AllItem){
    //     i.classList.remove('menu_item--active');
    // }
});