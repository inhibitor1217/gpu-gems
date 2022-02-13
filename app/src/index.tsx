import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { Provider as ReduxStoreProvider } from 'react-redux'

import GlobalStyles from 'Styles/global'

import App from './App'
import { store } from './store'

ReactDOM.render(
  <StrictMode>
    <GlobalStyles />
    <ReduxStoreProvider store={store}>
      <App />
    </ReduxStoreProvider>
  </StrictMode>,
  document.getElementById('root'),
)
