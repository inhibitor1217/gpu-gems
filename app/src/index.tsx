import { StrictMode } from 'react'
import ReactDOM from 'react-dom'

import GlobalStyles from 'Styles/global'

import App from './App'

ReactDOM.render(
  <StrictMode>
    <GlobalStyles />
    <App />
  </StrictMode>,
  document.getElementById('root')
);
