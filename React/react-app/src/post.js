import React, {Component} from 'react';
import Rainbow from './hoc/Rainbow';
import {connect} from 'react-redux';
import {deletePost} from './action/postAction';
class Post extends Component {
    handleClick = ()=>{
        this.props.deletePost(this.props.post.id);
        this.props.history.push('/')
    }
    render(){
        console.log(this.props);
       return (<div className = "container">
        <h4 className = "center">Post</h4>
        <p>{this.props.post.body}</p>
        <div className = "center">
            <button className= "btn grey" onClick = {this.handleClick}>
                delete
            </button>
        </div>
        </div>);
    }
}
const mapStateToProps = (state, ownProps)=>{
    let id = ownProps.match.params.id;
    // console.log(id);
    // console.log(state);
    let post = state.posts.find(post => {return post.id == id});
    console.log(post);
    return {
        post : state.posts.find(post => {return post.id == id})
    }
}

const mapDispatchToProps = (dispach)=>{
    return {
        deletePost : (id) => {
            dispach(deletePost(id));
        }
    }
}

export default connect(mapStateToProps ,mapDispatchToProps)(Post);