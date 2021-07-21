import React from "react";
import moment from "moment";
import PropTypes from 'prop-types'

class Row extends React.PureComponent {
  handleClick = i => () => {
    alert(`Position ${i}`);
  };

  render() {
    const { position, date } = this.props;
    return (
      <li onClick={this.handleClick(position)}>
        {moment(date).format("(DD/MMM/YYYY)")}
      </li>
    );
  }
}

Row.propTypes = {
  date: PropTypes.string.isRequired,
  position: PropTypes.number.isRequired,
};

export default Row;