import React, { useState } from 'react'
import './assets/styles.css'

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

  let [total, setTotal] = useState(0)
  const [cart, setCart] = useState([])

  const getTotal = () => {
    let discount = 0

    for (const rule of discountRules) {
      const match = rule.m.every(m => cart.some(item => item.id === m))
      if (match) {
        discount = total * rule.discount
        break
      }
    }

    return total - discount
  } // TODO: Implement this

  const addProduct = product => {
    if (cart.find(item => item.id === product.id)) {
      const products = cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
      const _total = products.reduce((a, item) => a + (item.price * item.quantity), 0)
      setTotal(_total)
      return setCart([...products])
    }

    product.quantity = 1
    setTotal(total += product.price)
    setCart([...cart, product])
  }

  const decrementProduct = product => {
    if (product.quantity === 1) {
      const newProducts = cart.filter(
        item => item.id !== product.id
      )
      setCart([...newProducts])
      const _total = newProducts.reduce((a, item) => a + (item.price * item.quantity), 0)
      setTotal(_total)
    } else {
      const products = cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      setCart([...products])
      const _total = products.reduce((a, item) => a + (item.price * item.quantity), 0)
      setTotal(_total)
    }
  }

  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {movies.map(o => (
            <li key={o.id} className="movies__list-card">
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
              <button onClick={() => addProduct(o)}>
                Add to cart
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        <ul>
          {cart.map(x => (
            <li key={x.id} className="movies__cart-card">
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
                <button onClick={() => decrementProduct(x)}>
                  -
                </button>
                <span>
                  {x.quantity}
                </span>
                <button onClick={() => addProduct(x)}>
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
