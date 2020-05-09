import React, { Component } from "react";
import './ItemComponent.css'

class ItemComponent extends Component{
    render(){
       return (<div key = {this.props.btnKey + "item"} className = "item">
                <input className = "content" key = {this.props.btnKey} onChange = {this.props.change} keyvalue = {this.props.btnKey} disabled = {this.props.editability} value = {this.props.value} />
                <button   key = {this.props.btnKey + "edit"} onClick = {this.props.clickEdit} className = "btn2">Edit</button>
                <button  key = {this.props.btnKey + "delete"} onClick = {this.props.clickDelete} className = "btn2">Delete</button>
            </div>);
    }
}

export default ItemComponent;