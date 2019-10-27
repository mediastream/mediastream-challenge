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

export default class MyApp extends React.Component {
  render() {
    const dates = [
      '2017-02-20T13:33:52.889Z',
      '2013-06-25T14:31:24.888Z',
      'not valid'
    ];

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
  //3 - Created a method to parse the dates array from a map
  renderDateItem = (_date, dateIndex) => {
    const { dates } = this.props;

    //7 validating the isodateformat
    //7.1 validate and create a date object from input string
    //7.2 pass the Date object, year, month, day to the Row component

    if (Date.parse(dates[dateIndex])) {
      const dateObj = new Date(dates[dateIndex]);
      return <Row date={dateObj} idx={dateIndex} key={dateIndex}></Row>;
    } else {
      return <InvalidDateRow key={dateIndex} idx={dateIndex} />;
    }
  };

  render() {
    //1 - I deconstruct the dates array from the props
    const { dates } = this.props;
    //2 - I get the optional header input from component props children
    const header = this.props.children;
    //4 - Bind the renderRow function to context
    this.renderDateItem = this.renderDateItem.bind(this);
    //5 - create the list of parsed dates to be rendered in the component
    const list = dates.map(this.renderDateItem);

    return (
      <div>
        <table className='Dates'>
          {header && <thead>{header}</thead>}
          <tbody>{list}</tbody>
        </table>
      </div>
    );
  }
}

class Row extends React.Component {
  //6 - Created a simple Row comoponent

  //10 - handle click, showing the date index
  handleClick() {
    alert(this.props.idx);
  }

  render() {
    const { date, idx } = this.props;

    //9- Parse date input, I assume is valid Date Input.

    //Map months indexes
    var months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];

    let day = date.getDay();
    let month = months[date.getMonth()];
    let year = date.getFullYear();

    this.handleClick = this.handleClick.bind(this);

    return (
      <tr onClick={this.handleClick} idx={idx}>
        {day}/{month}/{year}
      </tr>
    );
  }
}

class InvalidDateRow extends React.Component {
  //8 - Invalid Date Inout
  render() {
    const { idx } = this.props;
    return <tr idx={idx}>invalid Date Input</tr>;
  }
}

//0 - it was necessary to add the ReactDom from react, in order to inject the Component to the DOM
const render = Component => {
  ReactDOM.render(<Component />, document.getElementById('root'));
};

render(MyApp);
