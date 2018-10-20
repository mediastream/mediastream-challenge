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
*Remember to validate the props.

The implementation **must focus on performance**.

Take a look at the MyApp component, you should not modify it.

NOTE: You can use ES7+ here and install any library not tied to React.
Example:
- lodash: OK
- react-dates: NOPE
`);

import React from 'react';
import lodash from 'lodash';
import PropTypes from 'prop-types'
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
  static propTypes = {
    dates: PropTypes.array.isRequired,
    children: PropTypes.object
  }

  
  render() {
    const { dates,children } = this.props
    console.log(this.props)
    if(!Array.isArray(dates)){
      return null;
    }
    return (
      <div>
        {children}
        {
          dates.map((date, i) => {     
           return <Row key={i} date={date} index={i}></Row>
        })}
      </div>
    );
  }
}

class Row extends React.Component {
  constructor(){
    super();

    this.state={
        dateState:''
    }
  }
  handleClick(i,event) {
    alert(i);
  }
  getMonth(month){
    let months=[
        "Jan", "Feb", "Mar",
        "Apr", "May", "Jun", "Jul",
        "Aug", "Sep", "Oct",
        "Nov", "Dec"
    ];
    return months[1];
  }
  
  componentDidMount(){
    let date=new Date(this.props.date);
    let dateState= ' ('+date.getDay() + '/' + this.getMonth(date.getMonth()) + '/' + date.getDate()+')';
    console.log(dateState)
    this.setState({
      dateState:dateState
    })
  }
  render() {
    const { date ,index} = this.props

    return (
      <div>
        <button onClick={this.handleClick.bind(this, index) }>{this.state.dateState}</button>
      </div>
    )
  }
}