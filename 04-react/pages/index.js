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

    // Para el formato de las fechas quizás convenía usar una librería pero asumí que este sería
    // el formato que llevarían otras fechas, así que hice el formateo "cableado"
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
  // TODO

  constructor(props) {
    super(props);
  }

  render() {

    const monthNames = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sept', 'oct', 'nov', 'dec'];

    const getMonthName = (month => {
      return monthNames[parseInt(month)];
    });

    const formatting = (date => {
      const parts = date.split('T')[0].split('-');
      return '(' + parts[2] + '/' + getMonthName(parts[1]) + '/' + parts[0] + ')';
    });

    const dates = this.props.dates.map((date, index) => {

      if(this.props.children)
        return (<li key={index}> <h1>{this.props.children.props.children}</h1> {formatting(date)}</li>);
      return (<li key={index}>{formatting(date)}</li>);

    });

    return (
      <div>
        <ul>
          {dates}
        </ul>
      </div>
    );
  }
}
