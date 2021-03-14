import React, { useCallback, useState } from 'react'
import { Container, Card } from '../styles/pages/Login'
import { useAuth } from '../hooks/auth'
import Router from 'next/router'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import axios from 'axios'

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  if (!ctx.req.headers.cookie) {
    return {
      props: { message: 'no cookie found' }
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
    await axios.post(`${process.env.BASE_URL}/api/verifyAuth`, {
      authToken
    })
    ctx.res.writeHead(302, { Location: '/' })
    ctx.res.end()

    return {
      props: {
        message: 'current cookie is valid'
      }
    }
  } catch {
    return {
      props: { message: 'current cookie is invalid' }
    }
  }
}

const Login: React.FC = () => {
  const { signIn } = useAuth()

  const inputProps = [
    { type: 'text', placeholder: 'Enter email' },
    { type: 'password', placeholder: 'Enter access key' }
  ]

  const [currentEmailValue, setCurrentEmailValue] = useState('')
  const [currentPasswordValue, setCurrentPasswordValue] = useState('')
  const [currentSubmit, setCurrentSubmit] = useState(0)

  const handleSubmit = useCallback(async () => {
    if (currentSubmit === 1) {
      try {
        await signIn(currentEmailValue, currentPasswordValue)
        Router.push('/')
      } catch {
        setCurrentEmailValue('')
        setCurrentPasswordValue('')
        setCurrentSubmit(0)
      }
    } else {
      currentSubmit === 0 ? setCurrentSubmit(1) : setCurrentSubmit(0)
    }
  }, [currentEmailValue, currentPasswordValue, currentSubmit])

  return (
    <Container>
      <Card>
        <div>
          <h3>Welcome back to your</h3>
          <h1>nft BOT</h1>
        </div>
        <div>
          <input
            placeholder={inputProps[currentSubmit].placeholder}
            type={inputProps[currentSubmit].type}
            value={
              currentSubmit === 0 ? currentEmailValue : currentPasswordValue
            }
            onChange={e =>
              currentSubmit === 0
                ? setCurrentEmailValue(e.target.value)
                : setCurrentPasswordValue(e.target.value)
            }
            onKeyPress={event => event.key === 'Enter' && handleSubmit()}
          />
        </div>
      </Card>
    </Container>
  )
}

export default Login
