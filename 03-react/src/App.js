import { BrowserRouter, Route, Switch } from 'react-router-dom'
import React from 'react'
import Exercise from './components/pages/Exercise'

function App () {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Exercise} exact />
      </Switch>
    </BrowserRouter>
  )
}

export default App
