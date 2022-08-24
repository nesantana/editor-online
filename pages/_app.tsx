import type { AppProps } from 'next/app'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Ubuntu Condensed', sans-serif;
    box-sizing: border-box;
    transition: ease-in .1s;
  }

  html,
  body {
    padding: 0;
    margin: 0;
  }

  @media screen and (max-width: 1200px) {}
`

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <GlobalStyle />
    <Component {...pageProps} />
  </>
)

export default App
