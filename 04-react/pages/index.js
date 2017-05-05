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

import PropTypes from 'prop-types';
import React from 'react';
import dateFormat from 'dateformat';

export default class MyApp extends React.Component {
 
  render() {
    const dates = ['2017-02-20T13:33:52.889Z', '2013-06-25T14:31:24.888Z'];

    return (
      <div>
        <h1>04 - React</h1>
        <List dates={dates} />
        <hr />
        <List dates={dates}>
          <h1>Optional Header</h1>
        </List>
      </div>
    );
  }
}


class List extends React.Component { 

  renderRow(){
    return this.props.dates.map( (date, index) =>{
            return <Row date = {date} key = {index} id = {index}/>
          });
  }
  // TODO
  render() {    
    return (
      <div>
        {this.props.children}
          <ul>
            {this.renderRow()}
          </ul>
      </div>
    );
  }
}

List.propTypes = {
  dates: PropTypes.array,
  children : PropTypes.element
};


class Row extends React.Component{
  onClick(key){
      alert(key);
  }  
  render(){
    let date = dateFormat(new Date(this.props.date),"dd/mmm/yyyy");    
    return(
      <a href="#" onClick={() => this.onClick(this.props.id)}>
        <li>
          {`(${date})`}
        </li>
      </a>
    );
  }
}

Row.propTypes = {
  date: PropTypes.string
};