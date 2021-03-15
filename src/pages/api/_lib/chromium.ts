/* eslint-disable indent */
import puppeteer, { Page } from 'puppeteer-core'
import { getOptions } from './chromiumOptions'
import { verify } from 'jsonwebtoken'
import authConfig from '../../../config/auth'
import axios from 'axios'

function dateMaker() {
  const dataOf = new Date().toLocaleString('en-US', {
    hour12: false,
    timeZone: 'America/New_York'
  })

  return dataOf
}

async function persistLogs(
  timestamp: string,
  artName: string,
  log: string,
  data: string,
  authToken: string
): Promise<void> {
  const response = await axios.post(
    process.env.BASE_URL + '/api/logRegister',
    {
      timestamp,
      artName,
      log,
      data
    },
    {
      headers: { authToken }
    }
  )

  const responseData = await response.data

  return responseData
}

export async function getPage(isDev: string, authToken: string): Promise<any> {
  try {
    verify(authToken, authConfig.jwt.secret)

    const options = await getOptions(isDev === 'true')
    const browser = await puppeteer.launch(options)

    const page: Page = await browser.newPage()

    await page.goto(process.env.PDP_URL, { waitUntil: 'domcontentloaded' })

    /* await page.$eval('.MuiGrid-root p', e => {
      e.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'end' })
    }) */

    await page.waitForSelector('.MuiGrid-root p')
    const artName = await page.$eval(
      '.MuiGrid-root p',
      (el: HTMLElement) => el.textContent
    )

    // const artName = 'floater'

    await persistLogs(dateMaker(), artName, 'Crawler Started', null, authToken)

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

    await persistLogs(
      dateMaker(),
      artName,
      'Checkout Link Acquired',
      checkoutLink,
      authToken
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
    await persistLogs(dateMaker(), artName, 'Crawler Logged', null, authToken)

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

    await persistLogs(
      dateMaker(),
      artName,
      'Buy Button pressed',
      null,
      authToken
    )

    // const currentURL = await page.url()

    const productType = await page.evaluate(() => {
      const el = document.querySelector(
        '.MuiGrid-root .MuiTypography-root.MuiTypography-body1'
      )

      return el?.innerText === 'You’ve successfully entered the drawing! 🎉'
        ? el.innerText
        : ''
    })

    const isCheckoutDone =
      productType === ''
        ? null
        : await persistLogs(
            dateMaker(),
            artName,
            'Drawing was bought',
            productType,
            authToken
          )

    page.on('response', async response => {
      // console.log(response.url())
      if (response.url() === process.env.REQUEST_URL) {
        // console.log(response.status())
        await persistLogs(
          dateMaker(),
          artName,
          `Response Status for BuyButtonRequest was ${response.status()}`,
          null,
          authToken
        )
        return response.url()
      }
    })
    const lastCall = await persistLogs(
      dateMaker(),
      artName,
      'Process Finalized',
      null,
      authToken
    )

    return lastCall
  } catch {
    return 'Forbidden'
  }
}
