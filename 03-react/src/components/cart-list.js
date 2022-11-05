import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import CartItem from './cart-item'
import { getTotal, getTotalDiscounts, increment, decrement } from '../services/cart.service'

CartList.propTypes = {
  carts: PropTypes.array,
  discountRules: PropTypes.array,
  onUpdate: PropTypes.func
}

function CartList ({ carts, discountRules, onUpdate }) {
  const [total, setTotal] = useState(0)
  const [totalDiscount, setTotalDiscount] = useState(0)

  useEffect(() => {
    setTotal(getTotal(carts))
  }, [carts])

  useEffect(() => {
    setTotalDiscount(getTotalDiscounts(carts, discountRules, total))
  }, [total])

  return (
    <div className="movies__cart">
      <ul>
        {carts.map(x => (
          <CartItem
            key={x.id}
            cart={x}
            onIncrement={(movie) => increment(movie, onUpdate)}
            onDecrement={(movie) => decrement(movie, carts, onUpdate)}
          />
        ))}
      </ul>
      <div className="movies__cart-total">
        <p>Total: ${total}</p>
        <p>Total Discount: ${totalDiscount}</p>
        <br />
        <p>TOTAL TO PAY: ${total - totalDiscount}</p>
      </div>
    </div>
  )
}

export default CartList
