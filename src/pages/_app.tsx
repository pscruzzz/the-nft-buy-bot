import React from 'react'
import { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { AuthContextProvider } from '../hooks/auth'

import GlobalStyle from '../styles/global'
import theme from '../styles/theme'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
      <GlobalStyle />
    </ThemeProvider>
  )
}

export default MyApp
