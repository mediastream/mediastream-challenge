import './assets/styles.css'
import { React } from 'react'
import { useMovie } from '../../hooks/useMovie'

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

const moviesData = [
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
]

export default function Exercise01 () {
  const [getTotal, addToCart, decrementQuantity, incrementQuantity, movies, carts] = useMovie(discountRules, moviesData)
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
              <button onClick={() => addToCart(o)}>
                Add to cart
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="movies__cart">
       <ul>
          {carts.map(x => (
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
          <p>Total: {getTotal()}</p>
        </div>
      </div>
    </section>
  )
}
