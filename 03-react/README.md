# React
Implement a shopping cart for the Movie Store that is selling retro dvds

> <strong>NOTE:</strong> You can modify everything in this code. This component isn't well designed, intentionally. You can redesign it as you need.

## Tasks (as in: things that must work)
1) Add a movie to the cart. Listo
2) Increment or decrement the quantity of movie copies. The movie must be removed from the cart if quantity equals 0. Listo
3) Calculate and show the total cost of your cart. Ex: Total: $150 Listo
4) Apply discount rules. You have an array of offers with discounts depending of the combination of movie you have in your cart. See [Discout rules](#discount-rules)

## Discount rules
You have to apply all discounts in rules array (discountRules).
Ex: If m: [1, 2, 3], it means the discount will be applied to the total when the cart has all 3 movies (<strong>1, 2 and 3</strong>) in it.
