import { NextApiRequest, NextApiResponse } from 'next'
import { Page } from 'puppeteer-core'

import { getPage } from './_lib/chromium'

export default async function startCrawler(
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> {
  const checkoutLink = await getPage(process.env.IS_DEV)
  console.log(checkoutLink)

  return response.status(201).send(checkoutLink)
}
