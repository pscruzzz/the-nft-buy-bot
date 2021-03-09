import React from 'react'
import Head from 'next/head'

import RocketseatLogo from '../assets/rocketseat.svg'

import { Container } from '../styles/pages/Home'

const Home: React.FC = () => {
  return (
    <Container>
      <Head>
        <title>Homepage</title>
      </Head>
      <h1>Puppeteer</h1>
    </Container>
  )
}

export default Home
