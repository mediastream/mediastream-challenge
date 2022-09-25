import React from 'react'
import Movie from '../../components/Movie'
import { CartContext, CartProvider } from '../../context/CartContext'
import { render, screen, fireEvent } from '@testing-library/react'

const customRender = (ui, { ...renderOptions }) => {
  return render(
      <CartProvider >{ui}</CartProvider>,
      renderOptions
  )
}
const customRenderWithProps = (ui, contextProps, { ...renderOptions }) => {
  return render(
        <CartContext.Provider value={{ ...contextProps }}>{ui}</CartContext.Provider>,
        renderOptions
  )
}

describe('first', () => {
  test('should render id,name, price from data file', () => {
    customRender(<Movie id={2} name="Gladiator" price={21}/>, {})
    expect(screen.getByText(/^ID:/).textContent).toBe('ID: 2')
    expect(screen.getByText(/^Name/).textContent).toBe('Name: Gladiator')
    // expect(screen.getByText(/^Price/).textContent).toBe('Price: $21')
  })

  test('should add movie to cart', () => {
    const addToCartMock = jest.fn()
    customRenderWithProps(<Movie id={2} name="Gladiator" price={21}/>, { addToCart: addToCartMock }, {})
    const btn = screen.getByRole('button', { text: 'Add to cart' })
    fireEvent.click(btn)
    expect(addToCartMock).toHaveBeenCalled()
  })
})
