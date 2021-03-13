import React, { useCallback, useRef, useState } from 'react'
import { Container, Card } from '../styles/pages/Login'
import { useAuth } from '../hooks/auth'

const Login: React.FC = () => {
  const { signIn } = useAuth()

  const inputProps = [
    { type: 'text', placeholder: 'Enter email' },
    { type: 'password', placeholder: 'Enter access key' }
  ]

  const [currentEmailValue, setCurrentEmailValue] = useState('')
  const [currentPasswordValue, setCurrentPasswordValue] = useState('')
  const [currentSubmit, setCurrentSubmit] = useState(0)

  console.log(currentSubmit)

  function setCookie(name, value) {
    document.cookie = name + '=' + (value || '') + '; path=/'
  }

  const handleSubmit = useCallback(async () => {
    if (currentSubmit === 1) {
      try {
        const token = await signIn(currentEmailValue, currentPasswordValue)
        console.log(token)
        setCookie('authCookie', token)
      } catch {
        setCurrentSubmit(0)
      }
    } else {
      currentSubmit === 0 ? setCurrentSubmit(1) : setCurrentSubmit(0)
    }

    console.log(currentPasswordValue)
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
