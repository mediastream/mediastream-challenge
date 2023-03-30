import './assets/styles.css'
import React, { useState } from 'react'

export default function Exercise01 () {
  const movies = [
    {
      id: 1,
      name: 'Star Wars',
      price: 20
    },
    {
      id: 2,
      name: 'Minions',
      price: 25
    },
    {
      id: 3,
      name: 'Fast and Furious',
      price: 10
    },
    {
      id: 4,
      name: 'The Lord of the Rings',
      price: 5
    }
  ]

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

  const [cart, setCart] = useState([])

  const addToCart = movie => {
    // if movie already exists on the cart just increase quantity
    if (cart.find(item => item.id === movie.id)) {
      setCart(prevCart => prevCart.map(m =>
        m.id === movie.id
          ? ({ ...m, quantity: m.quantity + 1 })
          : m))
    } else { // set `quantity` member
      movie.quantity = 1
      setCart(prevCart => [...prevCart, movie])
    }
  }

  const handleDecrease = movie => {
    if (movie.quantity === 1) {
      setCart(prevCart => prevCart.filter(v => v.id !== movie.id))
    } else {
      movie.quantity -= 1
      setCart(prevCart => [...prevCart])
    }
  }

  const handleIncrease = movie => {
    movie.quantity += 1
    setCart(prevCart => [...prevCart])
  }

  const getTotal = () => {
    return cart.reduce((total, v) => (total += v.price * v.quantity), 0)
  }

  const getDiscount = () => {
    const movieIds = new Set(cart.map(v => v.id))
    const discountsToApply = discountRules.map(rule =>
      rule.m.every(id => movieIds.has(id)))

    // Note: this adds up all discounts without control, so it can add up
    // more than 100% discount (with a different set of discount rules),
    // which is clearly bad. But I'm adhering to README.md assignment
    // A possible solution would be to select the biggest discount and
    // apply only that one
    const discount = discountsToApply.map((value, index) => {
      return value ? discountRules[index].discount : 0
    })
      .reduce((total, v) => (total += v))

    return discount
  }

  const getTotalWithDiscount = () => {
    const total = getTotal()
    return total - total * getDiscount()
  }

  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {movies.map(o => (
            <li className="movies__list-card" key={o.id}>
              <ul>
                <li>
                  Name: {o.name}
                </li>
                <li>
                  Price: ${o.price}
                </li>
              </ul>
              <button onClick={() => addToCart(o)}>
                Add to cart
              </button>
            </li>
          ))}
        </ul>
      </div>

      {cart.length > 0 &&
      <div className="movies__cart">
        <ul>
          {cart.map(x => (
            <li className="movies__cart-card" key={x.id}>
              <ul>
                <li>
                  Name: {x.name}
                </li>
                <li>
                  Price per unit: ${x.price} / Total unit price: ${x.price * x.quantity}
                </li>
              </ul>
              <div className="movies__cart-card-quantity">
                <button onClick={() => handleDecrease(x)}>
                  -
                </button>
                <span>
                  {x.quantity}
                </span>
                <button onClick={() => handleIncrease(x)}>
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="movies__cart-total">
          <p>Total: ${getTotal()}</p>
          <p>Discount: {getDiscount()}</p>
          <p>Total after discounts: ${getTotalWithDiscount()}</p>
        </div>
      </div>
      }
    </section>
  )
}
