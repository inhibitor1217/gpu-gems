import {
  Route,
  Switch,
} from 'react-router-dom'

function HeaderRoutes() {
  return (
    <Switch>
      <Route component={() => <div />} />
    </Switch>
  )
}

export default HeaderRoutes
