import React, { Component, useState } from 'react';
import Nav from './Nav';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './Home';
import About from './About';
import Post from './post';
import Detail from './Contact';
// import logo from './logo.svg';
// import './App.css';
// import styled from 'styled-components';
// import ValidationComponent from './ValidationComponent/ValidationComponent';
// import CharComponent from './CharComponent/CharComponent';
// import Person from './Person/Person';
// import Radium , {StyleRoot} from 'radium';
//import UserInput from './UserInput/UserInput';
//import UserOutPut from './UserOutput/UserOutput';
class App extends Component{
  // state = {
  //   persons : [
  //     {id : 'rtertre',name : 'gori', age : 23},
  //     {id : 'treter',name : 'gordo', age : 25},
  //     {id : 'sfsdfsdf',name : 'goru', age : 26},
  //   ],
  //    toggle : true,
  // }
  // inputHandler = (event) => {
  //   this.setState({
  //     persons : [
  //       {name : event.target.value , age : 23},
  //       {name : 'gordo', age : 25},
  //       {name : 'goru', age : 29},
  //     ],
  //       toggle : !this.state.toggle,
  //   });
  // }
  // nameChangeHandler = (event , id)=>{
  //     let persons = this.state.persons.slice();
  //     let index = persons.findIndex((p) => {
  //      return   p.id == id;
  //     });
  //     let p = {...persons[index]};
  //     p.name = event.target.value;
  //     persons[index] = p;
  //     this.setState({persons : persons});
  // }
  // addPerson = ()=>{
  //     let person = {name : 'random', age : 33};
  //     let oldList = this.state.persons.slice();
  //     let newList = [...oldList , person];
  //     this.setState({persons : newList});
  // }
  // removePerson = (index)=>{
  //      let oldList = this.state.persons.slice();
  //      oldList.splice(index, 1);
  //      this.setState({persons : oldList});
  // }
  // switchHandler = (newName) => {
  //  newName  =  "Rajender"
  //   this.setState({
  //     persons : [
  //       {name : newName , age : 23},
  //       {name : 'gordo', age : 25},
  //       {name : 'goru', age : 28},
  //     ],
        
  //   });
  // }
  // togglePersonhandler = ()=>{
  //     this.setState({toggle : !this.state.toggle,})
  // }
  render(){
    const style = {
    //   backgroundColor : 'green',
    //   color : 'white',
    //   fontSize : '20px',
    //   outline : 'none',
    //   padding : '20px',
    //   boxShadow : '0 2px 3px #ccc',
    //   borderRadius : '10px',
    //   border : '1px solid #eee',
    //   display : 'inline-block',
    //   ':hover' : {
    //       opacity : '0.5'
    //   }
    }
    // const StyleButton = styled.button`
    // background-color : ${props => props.show ? 'red' : 'green'};
    // color : white;
    // font-size : 20px;
    // outline : none;
    // padding : 20px;
    // box-shadow : 0 2px 3px #ccc;
    // border-radius : 10px;
    // border : 1px solid #eee;
    // display : inline-block;
    // &:hover  {
    //     opacity : 0.5;
    // }`
    // let personFields;
    // if(!this.state.toggle){  
    //     // style.backgroundColor = 'red';
    //  personFields = this.state.persons.map((person,index)=>{
    //         return (<Person  key = {person.id} click = {()=> {this.removePerson(index)}} change = {(event)=>this.nameChangeHandler(event , person.id)} name = {person.name} Age = {person.age}>Better you dont ask from me</Person>
    //        );
    //     })
    //    }
    return (
      // <StyleRoot>
      <BrowserRouter>
          <div className="App">
              <Nav></Nav>
              <Switch>
                <Route exact path = "/" component = {Home} />
                <Route path = "/contact" component = {Detail} />
                <Route path = "/about" component = {About} />
                <Route path = "/:id" component = {Post} />
              </Switch>
          </div>
      </BrowserRouter>
      
    // </StyleRoot>
    );
  }
}

// function App() {
// const  [person , setName] = useState({persons : [
//     {name : 'gori', age : 23},
//     {name : 'gordo', age : 25},
//     {name : 'goru', age : 26},
//   ]});
//   const switchHandler = ()=>{
//     setName({persons : [
//       {name : 'Rajender', age : 23},
//       {name : 'gordo', age : 25},
//       {name : 'goru', age : 29},
//   ]})
//   }
//   console.log(person)
//   return (
//     <div className="App">
//           <header className="App-header">
//               <h1>Hello Rajendera</h1>
//               <button onClick = {switchHandler}>Toggle Me</button>
//               <Person click = {switchHandler} name = {person.persons[0].name} Age = {person.persons[0].age}>Better you don't ask from me</Person>
//               <Person name = {person.persons[1].name} Age = {person.persons[1].age}>Better you don't ask from me</Person>
//               <Person name = {person.persons[2].name} Age = {person.persons[2].age}>Better you don't ask from me</Person>
//       </header>
//     </div>
     // React.createElement('div', { className : 'App'}, React.createElement('h1', null, 'Hello Rajendera'))
//   );
// }

//class App extends Component{
//  state = {
//    userName : 'Rajender'
//  }
//  inputHandler = (event)=>{
//    this.setState({userName : event.target.value})
//  }
//  render(){
//    return (
//      <div className = "App">
//        <UserInput change = {this.inputHandler} user = {this.state.userName}></UserInput>
//        <UserOutPut user = {this.state.userName}  ></UserOutPut>
//      </div>
//    )
//  }
//}
// class App extends Component{
//     state = {
//         len : 0,
//         text : ''
//     }
//     calculateLength = (event)=>{
//         this.setState({len : event.target.value.length, text : event.target.value});
//     }
//     removeCharacter = (index)=>{
//         let text = this.state.text.slice().split('');
//         text.splice(index , 1);
//         let newText = text.join('');
//         this.setState({len : this.state.len - 1, text : newText});
//     }
//     render(){
//         return (
//             <div className = "App">
//                 <p className = 'para' >{this.state.len}</p>
//                 <textarea onChange = {(event)=>{this.calculateLength(event)}} value = {this.state.text}></textarea>
//                 <ValidationComponent len = {this.state.len} />
//                 {this.state.text.split('').map((char,index)=>{
//                  return <CharComponent key = {index} value = {char} click = {()=>{this.removeCharacter(index)}}/>
//                 })}
//             </div>
//         );
//     }
// }
export default App;
