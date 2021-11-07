import { HashRouter as Router } from 'react-router-dom'
import {
  FoundationProvider,
  DarkFoundation,
  Main,
  LayoutProvider,
} from '@channel.io/bezier-react'

import { Empty } from 'Common/base/Empty'
import { ContentRoutes } from 'Routes/content'
import { HeaderRoutes } from 'Routes/header'

const ProviderValues = {
  foundation: DarkFoundation,
  layout: {},
}

const App = () => {
  return (
    <FoundationProvider foundation={ProviderValues.foundation}>
      <LayoutProvider initialState={ProviderValues.layout}>
        <Router>
          <Main
            ContentHeaderComponent={HeaderRoutes}
            SidePanelComponent={Empty}
            SideViewComponent={Empty}
          >
            <ContentRoutes />
          </Main>
        </Router>
      </LayoutProvider>
    </FoundationProvider>
  )
}

export default App
