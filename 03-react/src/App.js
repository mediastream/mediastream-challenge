import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Exercise01 from './components/pages/Exercise'

function App () {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Exercise01} exact />
      </Switch>
    </BrowserRouter>
  )
}

export default App
