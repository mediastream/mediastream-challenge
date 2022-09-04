import React from 'react'
import { useDispatch } from '../../context/ShoppingCartProvider'
import Button from '../Button/Button'

const MovieItemCard = ({ movie}) => {

  const dispatch = useDispatch()

  return (
    <li className="movies__list-card">
      <ul>
        <li>
          ID: {movie.id}
        </li>
        <li>
          Name: {movie.name}
        </li>
        <li>
          Price: ${movie.price}
        </li>
      </ul>
      <Button label="Add to cart" action={() => dispatch({type:'ADD_ITEM_TO_CART', payload: movie})} />
    </li>
  )
}

export default MovieItemCard