import './assets/styles.css'
import React, { useEffect, useState } from 'react'

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

  const [discount, setDiscount] = useState(0)
  const [cart, setCart] = useState([])

  function getRule (cart, rules) {
    if (cart.length) {
      for (const rule of rules) {
        let hits = 0
        for (const item of cart) {
          if (rule.m.includes(item.id)) {
            hits += 1
          }
        }
        if (rule.m.length === hits) {
          return rule
        }
      }

      return null
    }
    return null
  }

  useEffect(() => {
    setDiscount(getRule(cart, discountRules)?.discount || 0)
  }, [cart])
  console.log(discount)
  const addToCart = (id) => {
    setCart((prev) => {
      const movieInTheCart = prev.find(p => p.id === id)
      // Check if movie is already in the cart
      if (movieInTheCart) {
        return prev.map(p => {
          if (p.id === id) {
            return {
              ...p,
              quantity: p.quantity + 1
            }
          }
          return p
        })
      }
      return [...prev, { ...movies.find(m => m.id === id), quantity: 1 }]
    })
  }

  const increaseQuantity = (id) => {
    setCart(prev => {
      return prev.map(p => {
        if (p.id === id) {
          return {
            ...p,
            quantity: p.quantity + 1
          }
        }
        return p
      })
    })
  }

  const decreaseQuantity = (id) => {
    setCart(prev => {
      const movieInTheCart = prev.find(p => p.id === id)
      if (movieInTheCart.quantity === 1) {
        return [...prev].filter(p => p.id !== id)
      }

      return prev.map(p => {
        if (p.id === id) {
          return {
            ...p,
            quantity: p.quantity - 1
          }
        }
        return p
      })
    })
  }

  const getTotal = () => cart.reduce((prev, current) => {
    const subTotal = (current.quantity * current.price)
    return prev + subTotal - subTotal * discount
  }, 0)

  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {movies.map((o, key) => (
            <li className="movies__list-card" key={key}>
              <ul>
                <li>
                  ID: {o.id}
                </li>
                <li>
                  Name: {o.name}
                </li>
                <li>
                  Price: ${o.price}
                </li>
              </ul>
              <button onClick={() => addToCart(o.id)}>
                Add to cart
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        <ul>
          {cart.map((x, key) => (
            <li className="movies__cart-card" key={key}>
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
                <button onClick={() => decreaseQuantity(x.id)}>
                  -
                </button>
                <span>
                  {x.quantity}
                </span>
                <button onClick={() => increaseQuantity(x.id)}>
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
    </section>
  )
}
