import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Exercise from './components/pages/Exercise'
import React from 'react'
import { ShoppingCartProvider } from './components/pages/Exercise/contexts/ShoppingCartContext'

function App () {
  return (
    <ShoppingCartProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Exercise} exact />
        </Switch>
      </BrowserRouter>
    </ShoppingCartProvider>
  )
}

export default App
