import React from 'react';
const code = ['0', '1','2','3','4','5','6','7','8','A','B','C','D','E','F'];
let color = '#';
const randomColorGenerator = ()=>{
    for(let i = 0; i < 6; i++){
        color += code[Math.floor(Math.random()*(code.length -1))];
    }
}
 const Rainbow = (WrappedComponent)=>{
     randomColorGenerator();
     console.log(color);
     const style = {color : color};
     console.log(style);
     color = '#';
     return (props)=>{
        return (
            <div style = {style}>
                <WrappedComponent {...props}/>
            </div>
        );
     }
 }

 export default Rainbow;