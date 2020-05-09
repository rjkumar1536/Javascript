import React, {Component} from 'react';
import Rainbow from './hoc/Rainbow';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
class Home extends Component {
    render(){
        // console.log(this.props)
        return (
        <div className = "container">
        <h4 className = "center">Home</h4>
            {this.props.posts.map(post=>{
                return (<div className="post card" key={post.id}>
                    <div className="card-content">
                        <Link to={'/' + post.id}>
                            <span className="card-title red-text">{post.title}</span>
                        </Link>
                        <p>{post.body}</p>
                    </div>
                </div>);
            })}
        </div>
        );
    }
}

const mapStateToProps = (state)=>{
    return {
        posts : state.posts
    }
}


export default connect(mapStateToProps)(Home);