import { NextApiRequest, NextApiResponse } from 'next'
import { verify } from 'jsonwebtoken'
import authConfig from '../../config/auth'

interface IRequestBody {
  authToken: string
}

interface IRequestCookies {
  [key: string]: string
}

export default async function auth(
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> {
  const requestBody: IRequestBody = request.body

  try {
    verify(requestBody.authToken, authConfig.jwt.secret)

    return response.status(201).send({
      authToken: requestBody.authToken,
      message: 'token is still valid'
    })
  } catch {
    return response.status(401).send({
      message: 'invalid or inexistent token'
    })
  }
}
