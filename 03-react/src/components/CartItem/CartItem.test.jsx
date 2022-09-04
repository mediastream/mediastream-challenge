import {render, screen} from '@testing-library/react'
import ShoppingCardProvider from '../../context/ShoppingCartProvider'
import CartItem from './CartItem'

const cartItem =  {
    id: 2,
    name: "Minions",
    price: 25,
    quantity: 0
} 

it("Should render cart item passed on props", () => {
    render(
        <ShoppingCardProvider>
          <CartItem cartItem={cartItem} />
        </ShoppingCardProvider>
        )
    expect(screen.getByText(/Minions/i)).toBeInTheDocument()
})
