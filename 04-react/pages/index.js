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

console.log(`
Respuesta:
Se incorpora la dependencia Moment para trabajar con las fechas en nuestro ejemplo con ReactJS,
dentro de los metodos que posee Moment es la forma de visualizar las fechas para ello se emplea
un formateo simple, pero adicional a ello se configura para que los nombres y estructura de las fechas
sea en idioma español.

NOTA: Se dejo configurada la libreria para que el mes se mostrara completo (enero, febrero, etc),
si queremos que solo se visualice las primeras 3 letras del mes se debe cambiar lo siguiente en la linea 75
{Moment(date).format("DD/MMMM/YYYY")} por {Moment(date).format("DD/MMM/YYYY")}, dejando solo 3 M.
`);

import React from 'react';
import Moment from 'moment';

Moment.locale('es');

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
  // TODO
  static propTypes = {
    dates: React.PropTypes.arrayOf(
      React.PropTypes.string
    )
  };

  render() {
    let html = [];
    this.props.dates.forEach((date, key) => {
      html.push(
        <li key={key} onClick={() => { alert(`El indice es ${key+1}`); }}>
          {Moment(date).format("DD/MMMM/YYYY")}
        </li>
      );
    });

    return (
      <div>
        {this.props.children}
        <ul>
          {html}
        </ul>
      </div>
    );
  }
}
