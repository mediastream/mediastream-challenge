import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import ShoppingCartPage from './pages/ShoppingCartPage'

function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={ShoppingCartPage} exact />
      </Switch>
    </BrowserRouter>
  )
}

export default App
