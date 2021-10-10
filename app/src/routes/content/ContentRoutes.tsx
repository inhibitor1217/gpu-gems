import {
  Route,
  Switch,
} from 'react-router-dom'

function ContentRoutes() {
  return (
    <Switch>
      <Route component={() => <div />} />
    </Switch>
  )
}

export default ContentRoutes
