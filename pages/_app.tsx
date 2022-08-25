import type { AppProps } from 'next/app'
import { createGlobalStyle } from 'styled-components'
import { FileProvider } from '@src/Contexts/Files.context'

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

  .ql-toolbar.ql-snow {
    height: 0;
    padding: 0;
    border-bottom: none;
  }

  @media screen and (max-width: 1200px) {}
`

const App = ({ Component, pageProps }: AppProps) => (
  <FileProvider>
    <GlobalStyle />
    <Component {...pageProps} />
  </FileProvider>
)

export default App
