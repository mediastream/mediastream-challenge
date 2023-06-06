import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Exercise from './pages/Excercise'
import { CartContextWrapper } from './context/CartContext'

function App () {
  return (
    <CartContextWrapper>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Exercise} exact />
        </Switch>
      </BrowserRouter>
    </CartContextWrapper>
  )
}

export default App
