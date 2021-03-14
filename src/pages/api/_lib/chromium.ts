/* eslint-disable indent */
import puppeteer, { Page } from 'puppeteer-core'
import { getOptions } from './chromiumOptions'
import { verify } from 'jsonwebtoken'
import authConfig from '../../../config/auth'

export async function getPage(isDev: string, authToken: string): Promise<any> {
  try {
    verify(authToken, authConfig.jwt.secret)
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

    console.log(checkoutLink)

    return checkoutLink
  } catch {
    return 'Forbidden'
  }
}
