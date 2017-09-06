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

const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

class ListElement extends React.Component {
  constructor(props) {
    super(props);
    this.handleDateClick = this.handleDateClick.bind(this);
  }

  handleDateClick() {
    alert(`${this.props.index}`);
  }

  render() {
    let date = new Date(this.props.date);
    let str_date = "("+ date.getDate() + '/' + months[date.getMonth()] + '/' + date.getFullYear()+')';
    return(
      <div className={'list_element'} onClick={this.handleDateClick}>
        {str_date}
      </div>
    );
  }
}

class List extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let dates = this.props.dates;
    return (
      <div className={'list'}>
        {this.props.children}
        {dates.map((date, index) =>
          <ListElement date={date} index={index}>
          </ListElement>)}
      </div>
    );
  }
}
