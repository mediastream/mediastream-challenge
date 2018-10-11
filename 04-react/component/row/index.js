import React from 'react';
import Moment from 'react-moment';

class Row extends React.Component {
    render() {
      var date = this.props.date
      var position = this.props.date.index
      
      console.log('valor');
      console.log(this.props.date.index);
  
      return (
        <li onClick={() => alert(position)}> <Moment format="DD/MMM/YYYY" date={date} /></li>
      );
    }
  }
  
export default Row;