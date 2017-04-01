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

class List extends React.Component {
    
    render() {
      let title = 'encabezado principal'
      if (this.props.children) title = this.props.children.props.children
      const fechas = this.props.dates
      const listItems = fechas.map((fechas) =>
        <Row showDate={fechas} key={fechas} />
      )
      if(this.props.dates.length>0)
        return (
          <div>
            <h4><b>{title}</b></h4>
            {listItems}
          </div>
        )
      return null;
    }

}

class Row extends React.Component {

    onClick(e){
      alert(e.target.textContent)
    }
    SetFecha(data){
      const fecha = new Date(data);
      const anio  = fecha.getFullYear();
      const meses = ['', 'ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sept', 'oct', 'nov', 'dic'];
      let mes = fecha.getMonth()+1;
      let dia = fecha.getDate();

      if(dia < 10) {
        dia = '0' + dia;
      }

      return dia + '/' + meses[mes] + '/' + anio;

    }
    render () {   
      return(
      <p onClick={this.onClick.bind(this)}>{this.SetFecha(this.props.showDate)}
      </p>)
    }
    
}