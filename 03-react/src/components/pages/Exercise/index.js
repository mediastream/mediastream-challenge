import './assets/styles.css';
import React, { useState } from 'react';

export default function Exercise01() {
  const movies = [
    {
      id: 1,
      name: 'Star Wars',
      price: 20,
    },
    {
      id: 2,
      name: 'Minions',
      price: 25,
    },
    {
      id: 3,
      name: 'Fast and Furious',
      price: 10,
    },
    {
      id: 4,
      name: 'The Lord of the Rings',
      price: 5,
    },
  ];

  const discountRules = [
    {
      m: [3, 2],
      discount: 0.25,
    },
    {
      m: [2, 4, 1],
      discount: 0.5,
    },
    {
      m: [4, 2],
      discount: 0.1,
    },
  ];

  const [cart, setCart] = useState([]);

  const checkIfExistMovie = (movieId) => {
    return cart.find((movie) => movie.id === movieId);
  };

  const addToCart = (newMovie) => {
    const existMovie = checkIfExistMovie(newMovie.id);
    if (existMovie) {
      setCart(
        cart.map((movie) =>
          movie.id === newMovie.id
            ? { ...movie, quantity: movie.quantity + 1 }
            : movie,
        ),
      );
    } else {
      setCart([...cart, { ...newMovie, quantity: 1 }]);
    }
  };

  const decrementQuantityOfMovie = (movieToRemove) => {
    const existMovie = checkIfExistMovie(movieToRemove.id);
    if (existMovie.quantity === 1) {
      setCart(cart.filter((movie) => movie.id !== movieToRemove.id));
    } else {
      setCart(
        cart.map((movie) =>
          movie.id === movieToRemove.id
            ? { ...movie, quantity: movie.quantity - 1 }
            : movie,
        ),
      );
    }
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalWithDiscount = (cart) => {
    return getTotal() - getTotal() * (applyDiscount(cart) / 100);
  };

  const applyDiscount = (cart) => {
    let discount = 0;
    let discountApplied = false;
    const idsCartMovies = cart.map((movie) => movie.id).sort();

    discountRules.forEach((discountRule) => {
      const idsDiscountRule = discountRule.m.sort();
      discountApplied =
        idsDiscountRule.length === idsCartMovies.length &&
        idsDiscountRule.every((id) => idsCartMovies.includes(id));
      if (discountApplied) {
        discount = discountRule.discount;
      }
    });
    return discount * 100;
  };

  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {movies.map((movie) => (
            <li className="movies__list-card" key={movie.id}>
              <ul>
                <li>ID: {movie.id}</li>
                <li>Name: {movie.name}</li>
                <li>Price: ${movie.price}</li>
              </ul>
              <button onClick={() => addToCart(movie)}>Add to cart</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        <ul>
          {cart.map((item) => (
            <li className="movies__cart-card" key={item.id}>
              <ul>
                <li>ID: {item.id}</li>
                <li>Name: {item.name}</li>
                <li>Price: ${item.price}</li>
                <li>total: ${item.price * item.quantity}</li>
              </ul>
              <div className="movies__cart-card-quantity">
                <button onClick={() => decrementQuantityOfMovie(item)}>
                  -
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => addToCart(item)}>+</button>
              </div>
            </li>
          ))}
        </ul>
        <div className="movies__cart-total">
          <p>Subtotal: ${getTotal()}</p>
          <p>
            Total: ${getTotal()} - Discount: {applyDiscount(cart)}% = $
            {getTotalWithDiscount(cart)}
          </p>
        </div>
      </div>
    </section>
  );
}
