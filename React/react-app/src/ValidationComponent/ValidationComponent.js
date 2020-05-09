import React from 'react';
import './ValidationComponent.css'
function ValidationComponent(props){
    if(props.len < 5){
        let style = {
            color : 'red'
        }
        return (
            <p className = 'red' >Text too short</p>
        );
    }
    else{
        let style = {
            color : 'green'
        }
        return (
                <p className = 'green' >Text Long Enough</p>
        );
    }
}

export default ValidationComponent;