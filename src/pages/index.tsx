import React, { useEffect } from 'react'
import Head from 'next/head'
import axios from 'axios'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import {
  Container,
  Wrapper,
  CurrentQuery,
  HistoryLogs,
  StyledForm
} from '../styles/pages/Home'

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

const Home: React.FC<IHomeProps> = () => {
  const currentDate = new Date()
  const currentDateTime = currentDate.getTimezoneOffset()
  console.log(currentDateTime)

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
        <StyledForm action="">
          <div>
            <h4>Endpoint</h4>
            <input type="text" placeholder="https://{{baseURL}}/{{item}}" />
          </div>
          <div>
            <h4>Date and Time</h4>
            <input type="text" placeholder="Sun, 14 Feb 2021 04:12:45 GMT" />
          </div>
          <span className="outerShadow">
            <button type="button">Run Crawler</button>
          </span>
        </StyledForm>
        <div className="panels">
          <CurrentQuery>
            <h2>Current Events</h2>
            <div className="events">
              <div className="log">
                <div>
                  <h4>Sun, 14 Feb 2021 04:12:45 GMT</h4>
                  <p>initialized endpoint</p>
                  <div>https://baseURL.com/cryptort</div>
                </div>
                <div>
                  <h4>Sun, 14 Feb 2021 04:12:45 GMT</h4>
                  <p>Logged in account</p>
                  <div>https://baseURL.com/cryptort</div>
                </div>
                <div>
                  <h4>Sun, 14 Feb 2021 04:12:45 GMT</h4>
                  <p>Clicked on buy button</p>
                  <div>https://baseURL.com/cryptort</div>
                </div>
                <div>
                  <h4>Sun, 14 Feb 2021 04:12:45 GMT</h4>
                  <p>initialized endpoint</p>
                  <div>https://baseURL.com/cryptort</div>
                </div>
                <div>
                  <h4>Sun, 14 Feb 2021 04:12:45 GMT</h4>
                  <p>Logged in account</p>
                  <div>https://baseURL.com/cryptort</div>
                </div>
                <div>
                  <h4>Sun, 14 Feb 2021 04:12:45 GMT</h4>
                  <p>Clicked on buy button</p>
                  <div>https://baseURL.com/cryptort</div>
                </div>
              </div>
            </div>
          </CurrentQuery>
          <HistoryLogs>
            <h2>Log History</h2>
            <div className="log">
              <div>
                <h4>Sun, 14 Feb 2021 04:12:45 GMT</h4>
                <p>initialized endpoint</p>
                <div>https://baseURL.com/cryptort</div>
              </div>
              <div>
                <h4>Sun, 14 Feb 2021 04:12:45 GMT</h4>
                <p>Logged in account</p>
                <div>https://baseURL.com/cryptort</div>
              </div>
              <div>
                <h4>Sun, 14 Feb 2021 04:12:45 GMT</h4>
                <p>Clicked on buy button</p>
                <div>https://baseURL.com/cryptort</div>
              </div>
            </div>
          </HistoryLogs>
        </div>
      </Wrapper>
    </Container>
  )
}

export default Home
