import { useState, React } from 'react'
import './assets/styles.css'
import _ from 'lodash'

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

  const [cart, setCart] = useState([
    {
      id: 1,
      name: 'Star Wars',
      price: 20,
      quantity: 2,
      total: 40,
      subtotal: 40,
      discount: 0,
      discountValue: 0
    }
  ])

  const getTotal = () => {
    return _.sumBy(cart, 'subtotal')
  }

  const increment = x => {
    const tmpCart = _.map(cart, el => el.id === x.id
      ? { ...el, quantity: el.quantity + 1 }
      : el)
    calcCart(tmpCart)
  }

  const decrement = x => {
    const tmpCart = _.map(cart, el => el.id === x.id
      ? { ...el, quantity: el.quantity - 1 }
      : el)
    calcCart(_.filter(tmpCart, el => el.quantity > 0))
  }

  const calcCart = cart => {
    const newCart = _.map(cart, el => {
      return {
        ...el,
        total: el.quantity * el.price,
        discount: 0,
        subtotal: el.quantity * el.price,
        discountValue: 0
      }
    })

    _.forEach(discountRules, rule => {
      const items = _.filter(newCart, el => _.includes(rule.m, el.id))
      if (items.length === rule.m.length) {
        items.forEach(rItem => {
          newCart.forEach(el => {
            if (el.id === rItem.id) {
              el.discount += rule.discount
              el.discountValue = el.total * el.discount
              el.subtotal = el.total - el.discountValue
            }
          })
        })
      }
    })
    setCart(newCart)
  }

  const addToCart = x => {
    const found = _.find(cart, el => el.id === x.id)
    if (!found) {
      calcCart([...cart, { ...x, quantity: 1 }])
    } else {
      increment(x)
    }
  }

  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {movies.map((o, k) => (
            <li key={k} className="movies__list-card">
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
          {cart.map((x, k) => (
            <li key={k} className="movies__cart-card">
              <ul>
                <li>
                  ID: {x.id}
                </li>
                <li>
                  Name: {x.name}
                </li>
                <li>
                  Unit Price: ${x.price}
                </li>
                {x.discount > 0
                  ? <>
                      <li>
                        Discount: {x.discount * 100}%
                      </li>
                      <li>
                        Subtotal: ${x.subtotal} (save ${x.discountValue})
                      </li>
                    </>
                  : <li>
                      Subtotal: ${x.subtotal}
                    </li>
                }
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
          <p>Total: ${getTotal()}</p>
        </div>
      </div>
    </section>
  )
}
