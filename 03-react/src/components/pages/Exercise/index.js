import './assets/styles.css'
import React, { useState } from 'react'

export default function Exercise01 () {
  const [error, setError] = useState(false)
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

  const cantidadesHandler = (dato, operacion) => {
    const peliculaActualizada = {
      ...dato,
      quantity: operacion === '+' ? dato.quantity + 1 : dato.quantity - 1
    }
    const carroActualizado = cart.map(carro => carro.id === peliculaActualizada.id ? peliculaActualizada : carro)
    setCart(carroActualizado)
    if (operacion === '-' && peliculaActualizada.quantity === 0) {
      removerCarrito(dato)
    }
  }

  const removerCarrito = datos => {
    const carroActualizado = cart.filter(carro => carro.id !== datos.id)
    setCart(carroActualizado)
  }

  const AgregarCarrito = (dato) => {
    if (cart.some(carro => carro.id === dato.id)) {
      setError('ya en carrito')
      setTimeout(() => {
        setError(false)
      }, 3000)
    } else {
      const pelicula = {
        id: dato.id,
        name: dato.name,
        price: dato.price,
        quantity: 1
      }
      setCart([...cart, pelicula])
    }
  }

  const getTotal = () => {
    let precio = 0
    const id = []
    cart.forEach(element => {
      precio = precio + (element.quantity * element.price)
      id.push(element.id)
    })
    const descuento = aplicaDescuento(id)
    return precio - (precio * descuento)
  }

  const aplicaDescuento = (id) => {
    for (const rule of discountRules) {
      const { m } = rule
      const sortedM = [...m].sort()
      const sortedId = [...id].sort()
      if (sortedM.join() === sortedId.join()) {
        return rule.discount
      }
    }
    return 0
  }

  return (
    <section className="exercise01">
      <div className="movies__list">
      { error && <p>{error}</p>}
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
              <button onClick={() => AgregarCarrito(o)}>
                Add to cart
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        <ul>
          {cart.length === 0 ? <p>No hay Peliculas, intenta agregar algunas</p> : null}
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
                  <button onClick={() => cantidadesHandler(x, '-')}>
                    -
                  </button>
                  <span>
                    {x.quantity}
                  </span>
                  <button onClick={() => cantidadesHandler(x, '+')}>
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
