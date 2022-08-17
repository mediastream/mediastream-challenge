import './assets/styles.css'
import { React, useState } from 'react'
import { isEqual } from 'lodash'

export default function Exercise01 () {
  const [movies, setMovies] = useState([
    {
      id: 1,
      name: 'Star Wars',
      price: 20,
      quantity: 1
    },
    {
      id: 2,
      name: 'Minions',
      price: 25,
      quantity: 1
    },
    {
      id: 3,
      name: 'Fast and Furious',
      price: 10,
      quantity: 1
    },
    {
      id: 4,
      name: 'The Lord of the Rings',
      price: 5,
      quantity: 1
    }
  ])

  const [carts, setCarts] = useState([])
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

  const addToCart = (obj) => {
    const gg = movies.filter(x => x.id !== obj.id)
    setMovies(gg)
    setCarts([...carts, obj])
  }

  const decrementQuantity = (objCart) => {
    if (objCart.quantity - 1 === 0) {
      const cartTemp = carts.filter(x => x.id !== objCart.id)
      setCarts([...cartTemp])
      setMovies([...movies, objCart].sort(orderDataById))
    } else {
      const cartsTemp = carts.map((x) => {
        if (x.id === objCart.id) x.quantity -= 1
        return x
      })
      setCarts([...cartsTemp])
    }
  }

  const orderDataById = (a, b) => {
    if (a.id === b.id) return 0
    if (a.id < b.id) return -1
    return 1
  }

  const incrementQuantity = (objCart) => {
    const cartsTemp = carts.map((x) => {
      if (x.id === objCart.id) x.quantity += 1
      return x
    })
    setCarts([...cartsTemp])
  }

  const getTotal = () => {
    if (carts.length !== 0) {
      let sum = carts.reduce((accumulator, object) => {
        return accumulator + object.quantity * object.price
      }, 0)

      const arrIds = carts.map(x => x.id)
      const rule = discountRules.find(x => isEqual(x.m, arrIds))
      sum = sum - sum * (rule === undefined ? 0 : rule.discount)
      return `Total: $${sum} `.concat(rule === undefined ? '' : ` -> disc : ${rule?.discount * 100}%`)
    } else {
      return ''
    }
  }

  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {movies.map((o, index) => (
            <li key={index} className="movies__list-card">
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
              <button onClick={() => addToCart(o)}>
                Add to cart
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        <ul>
          {carts.map((x, index) => (
            <li key={index} className="movies__cart-card">
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
                <button onClick={() => decrementQuantity(x)}>
                  -
                </button>
                <span>
                  {x.quantity}
                </span>
                <button onClick={() => incrementQuantity(x)}>
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="movies__cart-total">
          <p>{getTotal()}</p>
        </div>
      </div>
    </section>
  )
}
