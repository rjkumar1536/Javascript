import React, { Component } from 'react';
import './InputComponent.css'

class InputComponent extends Component{
    render(){
        const inputElement = (
        <div className = "addItem">
            <input  type = "text" className = "input" onChange = {this.props.change} value = {this.props.value} placeholder = 'Add Item here...' ></input>
            <button onClick = {this.props.click} className = "btn"  >Add Item</button>
            <button className = "btn" onClick = {this.props.clickCancel} >Cancel</button>
            <button className = "btn" onClick = {this.props.save}>Save</button>
        </div>
        );
        return inputElement;
    }
}

export default InputComponent;