import React, { useCallback, useState } from 'react'
import { Container, Card } from '../styles/pages/Login'
import { useAuth } from '../hooks/auth'
import Router from 'next/router'

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
        <h1>Hello, sir</h1>
        <h3>welcome back to your crypto bot</h3>
        <input
          placeholder={inputProps[currentSubmit].placeholder}
          type={inputProps[currentSubmit].type}
          value={currentSubmit === 0 ? currentEmailValue : currentPasswordValue}
          onChange={e =>
            currentSubmit === 0
              ? setCurrentEmailValue(e.target.value)
              : setCurrentPasswordValue(e.target.value)
          }
          onKeyPress={event => event.key === 'Enter' && handleSubmit()}
        />
      </Card>
    </Container>
  )
}

export default Login
