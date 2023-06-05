import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { MovieShop } from './pages/movies-shop/MovieShop'

function App () {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={MovieShop} exact />
      </Switch>
    </BrowserRouter>
  )
}

export default App
