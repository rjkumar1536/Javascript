import React , {Component} from 'react';
import './App.css';
import './InputComponent/InputComponent'
import InputComponent from './InputComponent/InputComponent';
import ItemComponent from './ItemComponent/ItemComponent';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      error : null,
      items : [],
      currentInput : ''
    }
    // this.addItemHandler = this.addItemHandler.bind(this);
  }


  saveHandler = (e) =>{
    const list = this.state.items.slice();
    let updateRecord = [];
    for(let record of list){
      if(record.dirty || !record.noneditable){
        updateRecord.push(record);
      };
    }
    // console.log(updateRecord);
    fetch('/items',{
      method : "PUT",
      headers : {'Content-Type' : 'application/json'},
      body : JSON.stringify({data : updateRecord})
    }).then(res => res.json())
    .then((result)=>{
      for(let id of result.id){
      const index =   list.findIndex(item=>{
         return item.id === id;
        });
        list[index].dirty = false;
        list[index].noneditable = true;
      }
      this.setState({items : list});
    }, (error)=>{
      this.setState({
        error
      })
    });
  }

  /*** @Edit button functionality  */
  editHandler = (event,id)=>{
    const list = this.state.items.slice();
    const index = list.findIndex(item=>{
     return item.id === id;
    });
    if(list[index].noneditable === false ){
      fetch('/edit',{
        method : "POST",
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify({data : list[index].id})
      }).then(res => res.json())
      .then((result)=>{
        list[index] = result;
        this.setState({items : list})},
      (error)=> this.setState({error: error}));
    }
    else{
      list[index].noneditable = !list[index].noneditable;
      this.setState({items : list});
    }
    // this.setState({edit : !this.state.edit});
  }

  /* @delete button */
  deleteItemHandler = (e)=>{
    const parent = e.target.parentNode;
    const element = parent.children[0];
    const Id = element.getAttribute('keyvalue');
    // console.log(this.state.items)
    // console.log(Id);
    fetch('/items', {
      method : "DELETE",
      headers : {'Content-Type' : 'application/json'},
      body : JSON.stringify({id : Id })
    })
    .then(res => res.json())
    .then(result => {
      const oldList = this.state.items.slice();
      const index = oldList.findIndex(item =>{
        return item.id === Id
      });
      // console.log(index);
      oldList.splice(index , 1);
      // console.log(oldList);
      this.setState({
      items :  oldList
    })}, error => this.setState({
      error
    }));
  }


  addItemHandler = (e) => {
    const value = e.target.previousElementSibling.value;
    console.log(value)
    // eslint-disable-next-line
    if(value == false)
    return;
    fetch('/items', {
      method : 'POST',
      headers : {'Content-Type' : 'application/json'},
      body : JSON.stringify({data : value})
    })
    .then(res => res.json())
    .then(result => {
      const oldList = this.state.items.slice();
      oldList.push(result);
      this.setState({
      items : oldList,
      currentInput : ''
       })}, error => this.setState({
          error
       }));
  }



  cancelHandler = ()=>{
    const list = this.state.items.slice();
    let updateRecord = [];
    for(let record of list){
      if(record.dirty || !record.noneditable){
        updateRecord.push(record.id);
      };
    }
    console.log(updateRecord)
    fetch('/cancel',{
      method : "POST",
      headers : {'Content-Type' : 'application/json'},
      body : JSON.stringify({data : updateRecord})
    }).then(res => res.json())
    .then((result)=>{
      console.log(result.data);
      for(let record of result.data){
      const index =   list.findIndex(item=>{
         return item.id === record.id;
        });
        list[index] = record;
      }
      this.setState({items : list});
    }, (error)=>{
      this.setState({
        error
      })
    });

    // fetch('/items')
    //   .then((res)=>{return res.json()})
    //   .then(result => this.setState({
    //       items : result
    //    }), error => this.setState({
    //       error : error
    //    }));
  }

  changeContent = (event,id)=>{
    const value = event.target.value;
    console.log(value)
    const items = this.state.items.slice();
    const index = items.findIndex(item=>{
      return item.id === id
    });
    items[index].item = value;
    items[index].dirty = true;
    this.setState({items : items});
  }

   inputHandler = (e)=>{
    const  value = e.target.value;
    this.setState({currentInput : value})
   }
  render(){
    // eslint-disable-next-line
    const {error, items} = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <InputComponent click = {this.addItemHandler} change = {this.inputHandler} clickCancel = {this.cancelHandler} value = {this.state.currentInput} save = {this.saveHandler}></InputComponent>
          {
            items.map(listItem=>
                (<ItemComponent key = {listItem.id} change = {(e)=>this.changeContent(e, listItem.id)} clickEdit = {(event)=>this.editHandler(event, listItem.id)} editability = {listItem.noneditable}  btnKey = {listItem.id} clickDelete = {this.deleteItemHandler} value = {listItem.item}></ItemComponent>)
            )
          }
        </header>
      </div>
    );
  }


  componentDidMount(){
    console.log('hello');
    fetch('/items')
      .then((res)=> {return res.json()})
      .then(result => this.setState({
          items : result
       }), error => this.setState({
          error
       }));
  }

}

export default App;
