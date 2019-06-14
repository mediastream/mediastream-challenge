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

// List: component
class List extends React.Component {
  render() {
    let dates = this.props.dates.map((date, i) => <Row key={i} date={new Date(date)} index={i} />);
    let children = this.props.children;
    return (
      <div>
        {children}
        <ul>{dates}</ul>
      </div>
    );
  }
}

// List: validations
List.propTypes = {
  dates: React.PropTypes.array.isRequired
}

List.defaultProps = {
  dates: []
}

// Row: component
class Row extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: '', componentIsMounted: false};
  }
  componentDidMount() {
    this.state.componentIsMounted = true
    let date = this.props.date.toLocaleDateString().split('/');
    let months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'noc', 'dic'];
    this.setState({date: `${date[0]}/${months[date[1] - 1]}/${date[2]}`});
  }
  consoleIndex = e => {
    const { index } = this.props;
    if (this.state.componentIsMounted) alert(`index: ${index}`);
  }
  render() {
    return (
      <li>
        <button onClick={this.consoleIndex}>{this.state.date}</button>
      </li>
    );
  }
}

// Row: validations
Row.propTypes = {
  date: React.PropTypes.object.isRequired
}
