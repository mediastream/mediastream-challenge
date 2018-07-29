import React from 'react';
import PropTypes from "prop-types";

const Item = ({id , label , showAlert}) => (
    <li onClick={showAlert} id={id} > {label} </li>
);

Item.propTypes = {
 id: PropTypes.number.isRequired,
 label: PropTypes.string.isRequired,
 showAlert : PropTypes.func.isRequired
};

export default Item;