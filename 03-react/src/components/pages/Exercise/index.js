import './assets/styles.css'
import { useEffect, useState } from 'react'
import { movies, discountRules } from '../../../variables/dataTest'

/* eslint-disable */

const Exercise01 = () => {
  const [cart, setCart] = useState([]);
  const [discounts, setDiscounts] = useState([]);

  useEffect(() => {
    // Order to apply best discount
    setDiscounts(discountRules.sort((a, b) => b.discount - a.discount));
  }, []);

  const getTotal = () => {
    let discount = calculateDiscount();
    let total = 0;
    cart.forEach((movie) => {
      total += movie.price * movie.quantity;
    });

    return { total: total * (1 - discount), discount: discount * 100 };
  };

  const addToCart = (movie) => {
    const movieIndex = movieIndexCart(movie.id);
    if (movieIndex >= 0) cart[movieIndex].quantity++;
    else cart.push({ ...movie, quantity: 1 });
    setCart([...cart]);
  };

  const incrementQuantity = (movieId) => {
    const movieIndex = movieIndexCart(movieId);
    cart[movieIndex].quantity++;
    setCart([...cart]);
  };

  const decrementQuantity = (movieId) => {
    const movieIndex = movieIndexCart(movieId);
    cart[movieIndex].quantity--;
    if (cart[movieIndex].quantity < 1) cart.splice(movieIndex, 1);
    setCart([...cart]);
  };

  const movieIndexCart = (movieId) => {
    let movieIndex = cart.findIndex((movie) => movie.id === movieId);
    return movieIndex;
  };

  const calculateDiscount = () => {
    let discount = 0;
    console.log('discounts');
    console.log(discounts);
    discounts.forEach((rule) => {
      let isAll = rule.m.every((val) =>
        cart.map((movie) => movie.id).includes(val)
      );
      if (isAll && discount === 0) discount = rule.discount;
    });
    return discount;
  };

  return (
    <section className='exercise01'>
      <div className='movies__list'>
        <h2 className='titles'>Movies</h2>
        <ul>
          {movies.map((o) => (
            <li key={o.id} className='movies__list-card'>
              <ul>
                <li>ID: {o.id}</li>
                <li>Name: {o.name}</li>
                <li>Price: ${o.price}</li>
              </ul>
              <button onClick={() => addToCart(o)}>Add to cart</button>
            </li>
          ))}
        </ul>
      </div>
      <div className='movies__cart'>
        <h2 className='titles'>Cart</h2>
        <ul>
          {cart.map((x) => (
            <li key={x.id} className='movies__cart-card'>
              <ul>
                <li>ID: {x.id}</li>
                <li>Name: {x.name}</li>
                <li>Price: ${x.price}</li>
              </ul>
              <div className='movies__cart-card-quantity'>
                <button onClick={() => decrementQuantity(x.id)}>-</button>
                <span>{x.quantity}</span>
                <button onClick={() => incrementQuantity(x.id)}>+</button>
              </div>
            </li>
          ))}
        </ul>
        <div className='movies__cart-total'>
          <p className='movies__cart-discuont'>
            Discount: {getTotal().discount}%
          </p>
          <p>Total: ${getTotal().total}</p>
        </div>
      </div>
    </section>
  );
};

export default Exercise01;
