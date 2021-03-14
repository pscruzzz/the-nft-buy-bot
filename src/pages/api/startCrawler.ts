import { NextApiRequest, NextApiResponse } from 'next'
import { verify } from 'jsonwebtoken'
import authConfig from '../../config/auth'

import { getPage } from './_lib/chromium'

interface IRequestCookies {
  [key: string]: string
}

export default async function startCrawler(
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> {
  const requestCookies: IRequestCookies = request.cookies
  try {
    verify(requestCookies.authToken, authConfig.jwt.secret)

    const checkoutLink = await getPage(process.env.IS_DEV)

    return response.status(201).send(checkoutLink)
  } catch {
    return response.status(401).send({ message: 'not authenticated' })
  }
}
