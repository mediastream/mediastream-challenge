import PropTypes from 'prop-types'

import '../assets/styles.css'

export default function ShoppingCart ({
  cart,
  increment,
  decrement,
  total
}) {
  return (
    <div className="movies__cart">
        <ul>
          {cart.map((x, i) => (
            <li key={`cart-${i}`} className="movies__cart-card">
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
                <button onClick={() => decrement(x)}>
                  -
                </button>
                <span>
                  {x.quantity}
                </span>
                <button onClick={() => increment(x)}>
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="movies__cart-total">
          <p>Total: ${total}</p>
        </div>
      </div>
  )
}

ShoppingCart.propTypes = {
  cart: PropTypes.array,
  increment: PropTypes.func,
  decrement: PropTypes.func,
  total: PropTypes.number
}
