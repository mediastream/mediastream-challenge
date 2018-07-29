import React from 'react';
import PropTypes from "prop-types";
import Item from "./item";

class List extends React.Component {
  state = {}

  showId = (e) =>{
     alert('id: '+ String( e.target.id));
  }

  showDates = () => {
    const {dates} = this.props;
    return dates.map((val, index) => {
        return (
            <Item
                key={index}
                id={index}
                label={val}
                showAlert ={this.showId}
            />
        );
    })
  };



  render() {
    const showList = this.showDates();
    return (
      <div>
         {this.props.children}
        <ul>{showList}</ul>
      </div>
    );
  }
}

List.propTypes = {
    dates: PropTypes.array.isRequired,
    children: PropTypes.object,
};

export default List;