import { NextApiRequest, NextApiResponse } from 'next'
import { sign, verify } from 'jsonwebtoken'
import authConfig from '../../config/auth'

interface IRequestBody {
  email: string
  accessKey: string
  token?: string
}

export default async function auth(
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> {
  const requestBody: IRequestBody = request.body

  try {
    verify(requestBody.token, authConfig.jwt.secret)

    return response
      .status(201)
      .send({ token: requestBody.token, message: 'token is still valid' })
  } catch {
    if (!requestBody.accessKey || !requestBody.email) {
      return response
        .status(404)
        .send({ message: 'accessKey or email property was not sent' })
    }

    if (
      !(requestBody.accessKey === process.env.ACCESS_KEY) ||
      !(requestBody.email === process.env.LOGIN_EMAIL)
    ) {
      return response
        .status(401)
        .send({ message: 'Wrong accessKey or email was sent' })
    }

    const { secret, expiresIn } = authConfig.jwt

    const token = sign({}, secret, {
      subject: process.env.LOGIN_EMAIL,
      expiresIn
    })

    return response.status(201).send({ token, message: 'new token generated' })
  }
}
