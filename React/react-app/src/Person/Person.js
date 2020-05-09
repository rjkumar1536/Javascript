import React from 'react';
import { render } from '@testing-library/react';
import './Person.css'
import styled from 'styled-components';
const DivStyle = styled.div`
    width : 40%;
    margin : 1% auto;
    border : 1px solid #eee;
    box-shadow: 0 2px 3px #ccc;
    padding : 16px;
    text-align : center;
`
const style = {
//       backgroundColor : 'red',
//       color : 'white',
//       fontSize : '20px',
//       outline : 'none',
//       boxShadow : '0 2px 3px #ccc',
//       border : '1px solid #eee',
//       display : 'inline-block',
//       '@media ( min-width : 500px )' : {
//         color : 'red'
//        }
     }
const Person = (props) => {
    return (
//    <div className = "Person">
     <DivStyle>
        <p onClick = {props.click} >I'm {props.name} and my age is {props.Age}</p>
        <input  type = "text"  value = {props.name} onChange = {props.change} />
     </DivStyle>
    ); 
}

export default Person;