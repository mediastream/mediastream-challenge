import { useState } from 'react'

const initialData = [
  {
    id: 1,
    name: 'Star Wars',
    price: 20,
    quantity: 2
  }
]

function useCarts () {
  const [data, setData] = useState(initialData)

  return [data, setData]
}

/**
 * getTotal - get total amount from cart list
 *
 * @param  {type} carts cart list
 * @return {type}       total amount
 */
function getTotal (carts) {
  let total = 0
  carts.forEach(cart => {
    total = total + (cart.quantity * cart.price)
  })

  return total
} // TODO: Implement this

/**
 * getTotalDiscounts - get discount total applied to cart list, rules next
 * You have to apply all discounts in rules array (discountRules).
 * Ex: If m: [1, 2, 3], it means the discount will be applied to the total when the cart has all 3 movies (<strong>1, 2 and 3</strong>) in it.
 *
 * @param  {Cart[]} carts      Cart list
 * @param  {Discount[]} rules  discountRules
 * @param  {Number} totalCarts cart list total
 * @return {Number}            total of discount
 */
function getTotalDiscounts (carts, rules, totalCarts) {
  const moviesIds = carts.map(c => c.id)
  let totalDiscount = 0

  rules.forEach(rule => {
    let apply = true

    moviesIds.forEach(id => {
      if (!rule.m.includes(id)) {
        apply = false
      }
    })

    if (apply && moviesIds.length === rule.m.length) {
      totalDiscount = totalCarts * rule.discount
    }
  })

  return totalDiscount
}

/**
 * increment - description
 *
 * @param  {Movie} movie  the movie to increment
 * @param  {function} update calback
 * @return {void}
 */
function increment (movie, update) {
  movie.quantity += 1
  update()
}

/**
 * decrement - description
 *
 * @param  {Movie} movie    The moview to decrement quantity
 * @param  {Cart[]} cars the actual cart list
 * @param  {function} update   callback
 * @return {void}
 */
function decrement (movie, carts, update) {
  movie.quantity -= 1

  // Remove movie if quantity is cero
  if (movie.quantity === 0) {
    const index = carts.findIndex(c => c.id === movie.id)
    if (index > -1) {
      carts.splice(index, 1)
    }
  }
  update()
}

export {
  useCarts,
  getTotal,
  getTotalDiscounts,
  increment,
  decrement
}
