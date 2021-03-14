/* eslint-disable indent */
import puppeteer, { Page } from 'puppeteer-core'
import { getOptions } from './chromiumOptions'
import { verify } from 'jsonwebtoken'
import authConfig from '../../../config/auth'

function dateMaker() {
  const dt = new Date()
  // console.log(dt) // Gives Tue Mar 22 2016 09:30:00 GMT+0530 (IST)

  dt.setTime(dt.getTime() + dt.getTimezoneOffset() * 60 * 1000)
  // console.log(dt) // Gives Tue Mar 22 2016 04:00:00 GMT+0530 (IST)

  const offset = -240 // Timezone offset for EST in minutes.
  const estDate = new Date(dt.getTime() + offset * 60 * 1000)
  // console.log(estDate) // Gives Mon Mar 21 2016 23:00:00 GMT+0530 (IST)

  return estDate
}

export async function getPage(isDev: string, authToken: string): Promise<any> {
  try {
    verify(authToken, authConfig.jwt.secret)

    const logs = []

    logs.push({ timestamp: dateMaker(), log: 'Crawler Started', data: null })

    const options = await getOptions(isDev === 'true')
    const browser = await puppeteer.launch(options)

    const page: Page = await browser.newPage()

    await page.goto(process.env.PDP_URL, { waitUntil: 'domcontentloaded' })

    await page.waitForSelector('a.MuiButtonBase-root', {
      visible: true
    })

    const checkoutLink = await page.evaluate(
      async () => {
        const buyButton = document.querySelectorAll(
          'a.MuiButtonBase-root'
        )[0] as HTMLElement

        console.log(buyButton)
        return buyButton.href
      },
      { waitUntil: 'domcontentloaded' }
    )

    logs.push({
      timestamp: dateMaker(),
      log: 'Checkout Link Acquired',
      data: checkoutLink
    })

    await page.goto(checkoutLink, { waitUntil: 'domcontentloaded' })

    await page.waitForSelector('#email', {
      visible: true
    })

    await page.waitForSelector('#password', {
      visible: true
    })

    const email: string = process.env.LOGIN_EMAIL
    const pass: string = process.env.LOGIN_PASSWORD

    /* await page.$eval('#email', (el: HTMLElement) => (el.value = email))
  await page.$eval('#password', (el: HTMLElement) => (el.value = pass)) */

    await page.focus('#email')
    await page.keyboard.type(email)
    await page.focus('#password')
    await page.keyboard.type(pass)
    await page.$eval('.MuiButton-contained', (el: HTMLElement) => el.click())

    logs.push({
      timestamp: dateMaker(),
      log: 'Crawler Logged',
      data: null
    })

    await page.waitForSelector('.BuilderBodySemiBold', {
      visible: true
    })

    await page.goto(checkoutLink)

    /* await page.waitForSelector('.hoverLightBoxShadow img', {
      visible: true
    }) */

    await page.waitForSelector('[class^=jss2] div', {
      visible: true
    })

    await page.evaluate(
      async () => {
        document.querySelector('[class^=jss2] div').click()
      },
      { waitUntil: 'domcontentloaded' }
    )

    logs.push({
      timestamp: dateMaker(),
      log: 'Buy Button pressed',
      data: null
    })

    return logs
  } catch {
    return 'Forbidden'
  }
}
