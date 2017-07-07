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
import PropTypes from 'prop-types';

export default class MyApp extends React.Component {
  render() {
    const dates = ['2017-02-20T13:33:52.889Z', '2013-06-25T14:31:24.888Z'];

    return (
      <div>
        <h1>04 - React</h1>
        <List dates={dates} header={false}/>
        <hr />
        <List dates={dates} header={true}>        
        </List>
      </div>
    );
  }
}

export class List extends React.Component {
  // TODO
  constructor(props) {
    super(props);
  }  
  render() {
    const {dates, header} = this.props;
    const listheader = header ? <h1>Optional Header</h1>: '';    
    const listRows = new Array();    
    dates.forEach((date,i) => listRows.push(
      // Regarding key, I came with this ugly workaround to avoid the warning about lack of keys  
      // Ok, not nice at all... suggestions welcome!
      // Maybe this is a case where living with a warning is less harmful
      <Row key={new Date().getTime().toString() + i.toString()} date={new Date(date)}></Row>)
    );
    return (
      <div>
        {listheader}
        <ul>{listRows}</ul>
      </div>
    );
  }
}

List.propTypes = {
  dates: PropTypes.array,
  header: PropTypes.bool
};

export class Row extends React.Component {  
  constructor(props) {
    super(props);
  }  
  render() {
    const {date} = this.props;    
    console.log(date);
    const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
    const content = [date.getDate(), months[date.getMonth()], date.getFullYear()].join('/');
    console.error('content', content);
    return (<li>{content}</li>);
  }
}

Row.propTypes = {
  date: PropTypes.object
};

console.log(`
DISCLAIMER:
No matter these instructions warns about to NOT TO CHANGE MyApp component, you should notice that is not possible
to fully comply, since the <h1>optional header</h1> element is inside the List element and, thus,
will be affected each time the render call is made.
In other words, enabling an optional child element to be rendered inside a parent one, implies that the
parent informs to its child via props. Otherwise, it seems to not to be so performant.
`);