import React from 'react';
import './CharComponent.css';
function CharComponent(props){
   return (<p className = 'char' onClick = {props.click}>{props.value}</p>);
}

export default CharComponent;