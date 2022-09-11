import './assets/styles.css'
import { useState, useEffect } from 'react'

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
      quantity: 2
    }
  ])
  const addMovie = (film) => {
    if( cart.filter( m => m.id == film.id).length == 0){
      setCart([...cart,{
        id: film.id,
        name: film.name,
        price: film.price,
        quantity:1
      }])
    }
  }
  const DecrementQuantity = (x) => {
    let cartCopy = [...cart];
    let elementIndex = cartCopy.findIndex( e => e.id === x.id)
    
    cartCopy[elementIndex].quantity --
    if(cartCopy[elementIndex].quantity === 0){
      cartCopy.splice(elementIndex,1)
    }
    setCart(cartCopy)
  }
  const IncrementQuantity = (x) => {
    let cartCopy = [...cart];
    let elementIndex = cartCopy.findIndex( e => e.id === x.id)
    cartCopy[elementIndex].quantity ++
    setCart(cartCopy)
  }
  const getTotal = () => {
    let total = 0
    let discountAmount = 0;
    if(cart.length === 0) return 0;

    let movies = cart.map( e => {
      total += e.price * e.quantity
      return e.id
    })
    
    //no estaba claro si habia que hacer sumar los descuentos si ocurrian varian coincidencias, asumi, sumarlas 
    discountRules?.map( discountRule => {
   
      if(discountRule.m.every( el => movies.includes(el)) === true){
        discountAmount += discountRule.discount
      }
    })

    return total - (discountAmount * total)
  }
  useEffect(()=>{
    console.log(cart)
  },[cart])
  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {movies.map((o,i) => (
            <li key={`movies_keys_${i}`} className="movies__list-card">
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
              <button onClick={() => addMovie(o)}>
                Add to cart
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        <ul>
          {cart.map((x,i) => (
            <li key={`movies_keys_${i}`} className="movies__cart-card">
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
                <button onClick={() => DecrementQuantity(x)}>
                  -
                </button>
                <span>
                  {x.quantity}
                </span>
                <button onClick={() => IncrementQuantity(x)}>
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
