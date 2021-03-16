import React, { useEffect, useCallback, useState } from 'react'
import Head from 'next/head'
import axios from 'axios'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import {
  Container,
  Wrapper,
  CurrentQuery,
  HistoryLogs,
  StyledDiv
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
  const [endpoint, setEndpoint] = useState('')
  const [waitUntil, setWaitUntil] = useState('')
  const [isCrawlerWaiting, setIsCrawlerWaiting] = useState(false)
  const [isCrawlerRunning, setIsCrawlerRunning] = useState(false)
  const [countDown, setCountDown] = useState(0)

  const handleEndpointChange = useCallback(e => {
    setEndpoint(e.target.value)
  }, [])

  const handleWaitUntilChange = useCallback(e => {
    console.log(e.target.value)
    setWaitUntil(e.target.value)
  }, [])

  const later = delay => new Promise(resolve => setTimeout(resolve, delay))

  useEffect(() => {
    if (isCrawlerWaiting || isCrawlerRunning) {
      setTimeout(() => {
        isCrawlerWaiting
          ? setCountDown(countDown - 1)
          : setCountDown(countDown + 1)
      }, 1000)
    } else {
      clearTimeout()
    }
  }, [isCrawlerRunning, countDown])
  console.log(countDown)

  const handleButtonPress = useCallback(async () => {
    setIsCrawlerWaiting(true)
    const ESTTime = new Date().toLocaleString('en-US', {
      hour12: false,
      timeZone: 'America/New_York'
    })
    const startDate = new Date(ESTTime)
    console.log(startDate, 'startDate')
    const endDate = new Date(waitUntil)
    console.log(endDate, 'endDate')
    const miliseconds = endDate.getTime() - startDate.getTime()
    console.log(miliseconds, 'miliseconds')

    setCountDown(miliseconds / 1000)

    await later(miliseconds)

    setIsCrawlerWaiting(false)
    setCountDown(0)
    setIsCrawlerRunning(true)

    const response = await axios.post('/api/startCrawler', {
      endpoint
    })
    const responseData = await response.data
    setIsCrawlerRunning(false)

    console.log(responseData)
    return responseData
  }, [endpoint, waitUntil])

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
        <StyledDiv>
          <div className="endpointDivClass">
            <h4>Endpoint</h4>
            <input
              type="text"
              placeholder="https://{{baseURL}}/{{item}}"
              onChange={handleEndpointChange}
            />
          </div>
          <div className="waitUntilDivClass">
            <h4>Wait Until</h4>
            <input
              type="text"
              placeholder="3/15/2021 19:27:31"
              onChange={handleWaitUntilChange}
            />
          </div>
          <span className="outerShadow">
            <button
              type="button"
              onClick={() => {
                handleButtonPress()
              }}
            >
              Run Crawler
            </button>
          </span>
        </StyledDiv>
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
