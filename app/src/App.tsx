import { HashRouter as Router } from 'react-router-dom'
import {
  FoundationProvider,
  DarkFoundation,
  Main,
  Navigations,
  LayoutProvider,
} from '@channel.io/bezier-react'

import { Empty } from 'Common/base/Empty'
import EngineProvider from 'Common/provider/EngineProvider'
import { ContentRoutes } from 'Routes/content'
import { HeaderRoutes } from 'Routes/header'
import { NavigationRoutes } from 'Routes/navigation'
import { SidePanelRoutes } from 'Routes/side-panel'

const ProviderValues = {
  foundation: DarkFoundation,
  layout: {},
}

const App = () => {
  return (
    <FoundationProvider foundation={ProviderValues.foundation}>
      <LayoutProvider initialState={ProviderValues.layout}>
        <EngineProvider>
          <Router>
            <Navigations>
              <NavigationRoutes />
            </Navigations>

            <Main
              ContentHeaderComponent={HeaderRoutes}
              SidePanelComponent={SidePanelRoutes}
              SideViewComponent={Empty}
            >
              <ContentRoutes />
            </Main>
          </Router>
        </EngineProvider>
      </LayoutProvider>
    </FoundationProvider>
  )
}

export default App
