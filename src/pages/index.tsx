import React, { useEffect } from 'react'
import Head from 'next/head'
import axios from 'axios'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { Container, Wrapper } from '../styles/pages/Home'

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  if (!ctx.req.headers.cookie) {
    ctx.res.writeHead(302, { Location: '/login' })
    ctx.res.end()
    return {
      props: { authToken: null }
    }
  }

  const cookieArray = ctx.req.headers.cookie.split('; ')

  const isAuthTokenPresent: string[] = cookieArray.filter(eachCookie => {
    if (eachCookie.startsWith('authToken=')) {
      return eachCookie
    }
  })

  const authToken: string | null =
    isAuthTokenPresent.length === 1 ? isAuthTokenPresent[0].split('=')[1] : null

  try {
    const response = await axios.post(
      `${process.env.BASE_URL}/api/verifyAuth`,
      {
        authToken
      }
    )

    return {
      props: {
        authToken: response.data.authToken
      }
    }
  } catch {
    ctx.res.writeHead(302, { Location: '/login' })
    ctx.res.end()
    return {
      props: { authToken: null }
    }
  }
}

interface IHomeProps {
  authToken: string | null
}

const Home: React.FC<IHomeProps> = ({ authToken }) => {
  console.log(authToken, 'Home authToken')

  return (
    <Container>
      <Head>
        <title>Homepage</title>
      </Head>
      <Wrapper>
        <div className="logo">
          <div className="nft">
            <div className="letter">n</div>
            <div className="letter">f</div>
            <div className="letter">t</div>
          </div>
          <div className="bot">
            <div className="letter">B</div>
            <div className="letter">O</div>
            <div className="letter">T</div>
          </div>
        </div>
      </Wrapper>
    </Container>
  )
}

export default Home
