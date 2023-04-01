import React from 'react';
import './assets/styles.css'
import { useState } from 'react'
import db from '../../../db';

export default function Exercise01() {
  const movies = db.movies.map(movie => ({
    id: movie.id,
    name: movie.title,
    price: 10
  }));

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

  const [cart, setCart] = useState([]);

  const addToCart = (movie) => {
    const existingItem = cart.find(item => item.id === movie.id);
    if (existingItem) {
      setCart(cart.map(item => {
        if (item.id === movie.id) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      }));
    } else {
      setCart([...cart, { ...movie, quantity: 1 }]);
    }
  }

  const decrementQuantity = (movie) => {
    const existingItem = cart.find(item => item.id === movie.id);
    if (existingItem && existingItem.quantity > 1) {
      setCart(cart.map(item => {
        if (item.id === movie.id) {
          return { ...item, quantity: item.quantity - 1 };
        } else {
          return item;
        }
      }));
    } else {
      setCart(cart.filter(item => item.id !== movie.id));
    }
  };

  const getTotal = () => {
    const subtotals = cart.map(item => item.price * item.quantity);
    const total = subtotals.reduce((acc, cur) => acc + cur, 0);
    const applicableDiscounts = discountRules.filter(rule =>
      rule.m.every(movieId => cart.some(item => item.id === movieId))
    );
    const discount = applicableDiscounts.reduce((acc, rule) => {
      const discountAmount = rule.discount * total;
      return acc + discountAmount;
    }, 0);
    return (total - discount).toFixed(2);
  };

  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {movies.map(movie => (
            <li className="movies__list-card" key={movie.id}>
              <ul>
                <li>ID: {movie.id}</li>
                <li>Name: {movie.name}</li>
                <li>Price: ${movie.price.toFixed(2)}</li>
              </ul>
              <button onClick={() => addToCart(movie)}>Add to cart</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        <ul>
          {cart.map(item => (
            <li className="movies__cart-card" key={item.id}>
              <ul>
                <li>ID: {item.id}</li>
                <li>Name: {item.name}</li>
                <li>Price: ${item.price.toFixed(2)}</li>
              </ul>
              <div className="movies__cart-card-quantity">
                <button onClick={() => decrementQuantity(item)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => addToCart(item)}>+</button>
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
