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

// componente que recibe un array de fechas y las renderiza por medio del componente "Row"
class List extends React.Component {
  constructor() {
    super();
    this.index = -1;
    this.setIndex = this.setIndex.bind(this);
  };
  setIndex() {
    this.index = this.index + 1;
  };
  render() {
    if (!this.props.dates) {
      return null;
    }
    return (
      <div>
        {this.props.children}
        <ul>
          {this.props.dates.map((date, i) => <Row onInit={this.setIndex()} key={i} index={this.index} data={date} ></Row>)}
        </ul>
      </div>
    );
  }
}

// valida props del componente "List"
List.propTypes = {
  dates: React.PropTypes.array.isRequired
};

// componente que retorna un objeto de lista con la fecha en formato "(día/mes/año)"
class Row extends React.Component {
  constructor() {
    super();
    this.clickRow = this.clickRow.bind(this);
    this.parseDate = this.parseDate.bind(this);
  };
  clickRow() {
    alert(this.props.index);
  };
  parseDate(date) {
    var auxDate = new Date(date);
    auxDate = auxDate.toDateString();
    auxDate = auxDate.split(" ");
    auxDate = "(" + auxDate[2] + "/" + auxDate[1] + "/" + auxDate[3] + ")";
    return auxDate;
  };
  render() {
    return (
      <li onClick={this.clickRow}>{this.parseDate(this.props.data)}</li>
    );
  }
}

// valida props del componente "Row"
Row.propTypes = {
  index: React.PropTypes.number,
  data: React.PropTypes.string
};
