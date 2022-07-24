import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Exercise from './components/pages/Exercise'
import React from 'react'

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
