/* eslint-disable react/prop-types */
import React from 'react'

const discountRules = [
  {
    m: [3, 2],
    discount: 0.25
  },
  {
    m: [2, 4, 1],
    discount: 0.5
  },
  {
    m: [4, 2],
    discount: 0.1
  }
]

const MovieCart = ({ cartList, handleQuantityCart }) => {
  const getTotal = () => {
    let total = cartList.reduce((total, movie) => { return total + (movie.price * movie.quantity) }, 0)

    const cartIdList = cartList.map(movie => movie.id)
    const validRules = discountRules.filter(rule => {
      return rule.m.length === cartIdList.length && rule.m.every((element) => cartIdList.includes(element))
    })

    if (validRules.length === 1) total = total * (1 - validRules[0].discount)

    return total
  }

  return (
    <div className="movies__cart">
    <ul>
      {cartList.map(x => (
        <li key={x.id} className="movies__cart-card">
          <ul>
            <li>
              Genero: {x.gender}
            </li>
            <li>
              Name: {x.name}
            </li>
            <li>
              Price: ${x.price}
            </li>
          </ul>
          <div className="movies__cart-card-quantity">
            <button onClick={() => handleQuantityCart(x, -1)}>
              -
            </button>
            <span>
              {x.quantity}
            </span>
            <button onClick={() => handleQuantityCart(x, 1)}>
              +
            </button>
          </div>
        </li>
      ))}
    </ul>
    <div className="movies__cart-total">
      <p>Total: ${getTotal()}</p>
    </div>
  </div>
  )
}

export default MovieCart
