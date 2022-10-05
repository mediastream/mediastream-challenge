import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Exercise from './pages/Excersise'

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
