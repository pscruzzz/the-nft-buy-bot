import { NextApiRequest, NextApiResponse } from 'next'
import { sign, verify } from 'jsonwebtoken'
import authConfig from '../../config/auth'

interface IRequestBody {
  email: string
  accessKey: string
}

interface IRequestCookies {
  [key: string]: string
}

export default async function auth(
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> {
  const requestBody: IRequestBody = request.body
  const requestCookies: IRequestCookies = request.cookies

  // console.log(requestCookies.authToken)

  try {
    verify(requestCookies.authToken, authConfig.jwt.secret)

    return response.status(201).send({
      authToken: requestCookies.authToken,
      message: 'token is still valid'
    })
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

    const authToken = sign({}, secret, {
      subject: process.env.LOGIN_EMAIL,
      expiresIn
    })

    const now = new Date()
    const time = now.getTime()
    const expireTime = time + 60 * 36000
    now.setTime(expireTime)

    response.setHeader(
      'Set-Cookie',
      `authToken=${authToken}; expires=${now.toUTCString()} ; path=/ ; secure ; HttpOnly`
    )

    return response
      .status(201)
      .send({ authToken, message: 'new token generated' })
  }
}
