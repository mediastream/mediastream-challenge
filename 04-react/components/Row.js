import React, { PropTypes } from 'react';
import { formatDate } from '../utils/date';

const rowStyle = {
  color: '#97d700',
  cursor: 'pointer',
  fontSize: '18px',
  padding: '5px 10px',
  textDecoration: 'underline',
};

class Row extends React.Component {
  render() {
    const { date, onClick } = this.props;
    const { day, month, year } = formatDate(new Date(date));
    return (
      <div style={rowStyle} onClick={onClick}>
        {`${day}/${month}/${year}`}
      </div>
    );
  }
}

Row.propTypes = {
  date: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Row;
