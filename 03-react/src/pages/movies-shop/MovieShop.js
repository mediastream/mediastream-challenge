import './movieShop.styles.css'
import React from 'react'
import { useShopCart } from '../../hooks/useShopCart'
import { movies } from '../../constants'
import { MovieCard } from '../../components/MovieCard'

export const MovieShop = () => {
  const { cartItems, addItem, removeItem, summary } = useShopCart()

  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {movies.map(movie => (
            <MovieCard
              key={movie.id}
              item={movie}
              addItem={addItem}
            />
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        <ul>
          {cartItems.map(item => (
            <MovieCard
              key={item.id}
              item={item}
              isInCart
              addItem={addItem}
              removeItem={removeItem}
            />
          ))}
        </ul>
        <div className="movies__cart-total">
          {summary.discount !== 0 && <p className="discount">Discount %{summary.discount * 100}</p>}
          <p>Total: ${summary.total}</p>
        </div>
      </div>
    </section>
  )
}
