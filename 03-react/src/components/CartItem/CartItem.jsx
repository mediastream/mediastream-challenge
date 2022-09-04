import React from 'react'
import { useDispatch } from '../../context/ShoppingCartProvider'
import Button from '../Button/Button'
useDispatch

const CartItem = ({ cartItem }) => {

    const dispatch = useDispatch()

    return (

        <li className="movies__cart-card">
            <ul>
                <li>
                    ID: {cartItem.id}
                </li>
                <li>
                    Name: {cartItem.name}
                </li>
                <li>
                    Price: ${cartItem.price}
                </li>
            </ul>
            <div className="movies__cart-card-quantity">
                <Button label="-" action={() => dispatch({ type: "DECREASE_QUANTITY_OF_ITEM", payload: cartItem.id })} />
                <span>
                    {cartItem.quantity}
                </span>
                <Button label="+" action={() => {
                    dispatch({ type: "INCREMENT_QUANTITY_OF_ITEM", payload: cartItem.id })
                }} />

            </div>
        </li>

    )
}

export default CartItem