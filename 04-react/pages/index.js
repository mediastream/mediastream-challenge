'use strict';

console.log(`
4.
---

We require a 'List' component that will receive an array of dates (formated as ISO Dates (Date-Time))
and it has to render those to 'Row' components.

This 'Row' component can be as simple as you want,
but it must display the dates like the following example: '(12/jun/2013)'
and on click must 'alert()' its index in the list.

Also, the 'List' component should receive an optional child as a header.
Remember to validate the props.

The implementation **must focus on performance**.

Take a look at the MyApp component, you should not modify it.

NOTE: You can use ES7+ here and install any library not tied to React.
Example:
- lodash: OK
- react-dates: NOPE
`);

import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment'


const ComponentHeader = () => <div>HEADER</div>
 class MyApp extends React.Component {
    render() {
      const dates = ['2017-02-20T13:33:52.889Z', '2013-06-25T14:31:24.888Z'];

     return (
        <div>
        <h1>04 - React</h1>
        <List dates={dates} header={ComponentHeader}></List>
       </div>
      );
    }
}




class List extends React.Component {
   // TODO
   render() {
     const Header = typeof this.props.header ==='function'? this.props.header:null
     return(
      <div>
        <Header/>
      <ul>
        {
          (this.props.dates || []).map((date,index)=><Row key={index} index={index} date={date}/>)
        }
      </ul>
      </div>
     )    
  }
}

class Row extends React.Component{
  constructor(props){
    super(props)
    this.showAlert = this.showAlert.bind(this)
  }
  showAlert(){
    console.log(this.props)
    alert(this.props.index)
  }
  render(){
    return(
      <li>
        <button onClick={this.showAlert}>
          Ver
        </button>
        {moment(this.props.dates).format('DD/MMMM/YYYY')}


      </li>
    )
  }
}


export default MyApp
