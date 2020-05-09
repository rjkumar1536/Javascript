import React from 'react';
import './UserOutput.css'
const UserOutput = (props)=>{
    return (
        <div className = "para">
            <p>Who are you man ?</p>
            <p>Hi I'm {props.user}</p>
        </div>
    );
}

export default UserOutput;