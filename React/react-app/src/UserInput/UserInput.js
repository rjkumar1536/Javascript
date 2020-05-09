import React from 'react';
import './UserInput.css'
const UserInput = (props) => {
    return (
        <div className = 'user'>
            <input type = "text" onChange = {(event)=>{props.change(event)}} value = {props.user}></input>
        </div>
    );
}

export default UserInput;