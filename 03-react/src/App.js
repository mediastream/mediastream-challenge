import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Exercise from './components/pages/Exercise'
import { CartProvider } from './context/CartContext'

function App () {
  return (
     <CartProvider>
     <BrowserRouter>
      <Switch>
        <Route path="/" component={Exercise} exact />
      </Switch>
    </BrowserRouter>
      </CartProvider>
  )
}

export default App
