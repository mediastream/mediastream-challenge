import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Exercise from './pages/Exercise'
import { CartContextProvider } from './context/CartContext'

function App () {
  return (
    <BrowserRouter>
      <CartContextProvider>
        <Switch>
          <Route path="/" component={Exercise} exact />
        </Switch>
      </CartContextProvider>
    </BrowserRouter>
  )
}

export default App
