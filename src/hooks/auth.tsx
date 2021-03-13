import React, { createContext, useContext } from 'react'
import axios, { AxiosResponse } from 'axios'

interface AuthContextData {
  signIn(email: string, accessKey: string): Promise<AxiosResponse<any>>
  tokenVerify(authToken: string): Promise<AxiosResponse<any>>
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AuthContextProvider: React.FC = ({ children }) => {
  async function signIn(email: string, accessKey: string) {
    const response = await axios.post('/api/auth', {
      email,
      accessKey
    })

    if (response.status === 201) {
      return response.data.token
    } else {
      return response.data.message
    }
  }

  async function tokenVerify(authToken: string) {
    const response = await axios.post('/api/verifyAuth', {
      authToken
    })

    if (response.status === 201) {
      return response.data.authToken
    } else {
      return response.data.message
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, tokenVerify }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext)

  return context
}

export { AuthContextProvider, useAuth }
