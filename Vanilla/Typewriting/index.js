let text = ['Good things', 'bad things', 'cool things']
let index = 0;
let count = 0;
let length = text.length;
let letter = '';

(function type(){
        if(count == length){
            count = 0;
            index = 0;
        }
        document.querySelector('.typing').textContent = text[count].slice(0,index);
        index++;
        if(index == text[count].length){
            count++;
            index = 0;
        }
        setTimeout(type, 400);
})();