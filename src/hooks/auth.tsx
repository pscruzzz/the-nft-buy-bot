import React, { createContext, useContext } from 'react'
import axios, { AxiosResponse } from 'axios'

interface AuthContextData {
  signIn(email: string, accessKey: string): Promise<AxiosResponse<any>>
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AuthContextProvider: React.FC = ({ children }) => {
  async function signIn(email: string, accessKey: string) {
    const response = await axios.post('/api/auth', {
      email,
      accessKey
    })

    return response.data.token
  }

  return (
    <AuthContext.Provider value={{ signIn }}>{children}</AuthContext.Provider>
  )
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext)

  return context
}

export { AuthContextProvider, useAuth }
