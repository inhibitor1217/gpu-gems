import {
  Route,
  Switch,
} from 'react-router-dom'

import BaseHeader from 'Common/layout/BaseHeader'

function HeaderRoutes() {
  return (
    <Switch>
      <Route component={BaseHeader} />
    </Switch>
  )
}

export default HeaderRoutes
