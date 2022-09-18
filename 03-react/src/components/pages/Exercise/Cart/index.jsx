import React from 'react'
import PropTypes from 'prop-types'

const Cart = (
  {
    cart,
    decrementProductQty,
    incrementProductQty,
    cartTotal,
    cartDiscount
  }) => {
  if (cart.length === 0) {
    return (
      <div className="movies__cart">
        <p>Empty Cart</p>
      </div>
    )
  }
  return (
    <div className="movies__cart">
      <ul>
        {cart.map(x => (
          <li className="movies__cart-card" key={x.id}>
            <ul>
              <li>
                ID: {x.id}
              </li>
              <li>
                Name: {x.name}
              </li>
              <li>
                Price: ${x.price}
              </li>
            </ul>
            <div className="movies__cart-card-quantity">
              <button onClick={() => decrementProductQty(x)}>
                -
              </button>
              <span>
                {x.quantity}
              </span>
              <button onClick={() => incrementProductQty(x)}>
                +
              </button>
            </div>
          </li>
        ))}
    </ul>
    <div className="movies__cart-total">
      <p>Sub-total: ${cartTotal}</p>
      {
        cartDiscount > 0 && (
          <p>Discount:{cartDiscount * 100}%</p>
        )
      }
      <p>Total: ${cartDiscount > 0
        ? cartTotal - (cartTotal * cartDiscount)
        : cartTotal
        }
      </p>
    </div>
  </div>
  )
}
Cart.propTypes = {
  cart: PropTypes.array,
  decrementProductQty: PropTypes.func,
  incrementProductQty: PropTypes.func,
  cartTotal: PropTypes.number,
  cartDiscount: PropTypes.number
}
export default Cart
