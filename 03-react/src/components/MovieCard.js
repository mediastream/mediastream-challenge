import React from 'react'
import PropTypes from 'prop-types'

export const MovieCard = ({ item, isInCart, addItem, removeItem }) => {
  return (
    <li key={item.id} className='movies__list-card'>
      <ul>
        <li>ID: {item.id}</li>
        <li>Name: {item.name}</li>
        <li>Price: ${item.price}</li>
      </ul>
      {
        isInCart
          ? (
              <div className="movies__cart-card-quantity">
                <button onClick={() => removeItem(item)}>
                  -
                </button>
                <span>
                  {item.quantity}
                </span>
                <button onClick={() => addItem(item)}>
                  +
                </button>
              </div>
            )
          : (
              <button onClick={() => addItem(item)}>Add to cart</button>
            )
      }
    </li>
  )
}

MovieCard.propTypes = {
  item: PropTypes.object.isRequired,
  isInCart: PropTypes.bool,
  addItem: PropTypes.func.isRequired,
  removeItem: PropTypes.func
}
