import { createGlobalStyle } from 'styled-components'
import { normalize } from 'styled-normalize'

const typography = `
  font-family: 'NanumSquare', Roboto, Arial, sans-serif;
`;

const GlobalStyle = createGlobalStyle`
  ${normalize}

  html,
  body {
    overflow: hidden;
    ${typography}
    font-size: 16px;
    font-weight: 400;
    width: 100vw;
    height: 100vh;
  }

  #root {
    width: 100%;
    height: 100%;
    display: flex;
    position: relative;
    overflow-y: hidden;
  }

  * {
    box-sizing: border-box;
  }

  button,
  input,
  optgroup,
  select,
  textarea,
  a,
  span,
  p {
    ${typography}
  }

  a,
  u {
    text-decoration: none;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  span,
  p {
    margin: 0;
  }
`

export default GlobalStyle
