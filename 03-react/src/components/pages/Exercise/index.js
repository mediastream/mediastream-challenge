import './assets/styles.css'
import React from 'react'
export default function Exercise01 () {
  const cart = [{
    id: 0,
    name: '',
    price: 0
  }]
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
  const getTotal = () => 0 // TODO: Implement this
  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {
          movies.map(o => (
            <li className="movies__list-card" key={o.id}>
              <ul>
                <li className="item" >
                  ID: {o.id}
                </li>
                <li>
                  Name: {o.name}
                </li>
                <li>
                  Price: ${o.price}
                </li>
              </ul>
              <button onClick={() => console.log('clic')}>
                Add to cart
              </button>
            </li>
          ))
          }
        </ul>
      </div>
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
                <button onClick={() => console.log('Decrement quantity', x)}>
                  -
                </button>
                <span>
                  {x.quantity}
                </span>
                <button onClick={() => console.log('Increment quantity', x)}>
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
